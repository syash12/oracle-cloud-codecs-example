import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    let recorder;
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
          recorder.start();
          recorder.addEventListener('dataavailable', event => {
            setAudioChunks(audioChunks => [...audioChunks, event.data]);
          });
        })
        .catch(error => console.error(error));
    }
  
    // add stop event listener outside the else block
    if (mediaRecorder !== null) {
      mediaRecorder.addEventListener('stop', () => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          setMediaRecorder(null);
          const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
        }
      });
    }
  }, [isRecording, mediaRecorder, audioChunks]);

  const handlePlayClick = () => {
    setIsRecording(true);
  };

  const handleStopClick = () => {
    setIsRecording(false);
  };


  return (
    <div className="App">
      <header className="App-header">
        <span style={{fontSize:"4em"}} onClick={handlePlayClick}> 
            {isRecording ? null : "▶"} 
        </span>
          {isRecording ? (
              <span style={{fontSize:"4em"}} onClick={handleStopClick}> 
                  ■
              </span>
          ) : null}
        <p> Hit play to start recording audio</p>
        <a className="App-link"
          href="https://github.com/syash12/oracle-cloud-codecs-example"
          target="_blank"
          rel="noopener noreferrer">
          GitHub
        </a>
      </header>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  let recorder;

  useEffect(() => {
    if (isRecording && mediaRecorder === null) {
      console.log("inside play button hit")
      navigator.mediaDevices.getUserMedia({ "audio": true, "video": false })
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
    if (mediaRecorder !== null && !isRecording) {
      console.log("inside stop button hit")
      mediaRecorder.addEventListener('stop', () => {
        const audioCtx = new AudioContext();
        const audio = new Audio();
        audio.setAttribute("controls", "");
        document.querySelector("#sound-clip").appendChild(audio);
        document.querySelector("#sound-clip").insertAdjacentHTML('beforeend', '<br />');

        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
        audio.src = URL.createObjectURL(audioBlob);
        audio.play();

        // send audio to backend
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.mp3');

        // send audio data to service
        fetch('http://localhost:8000/transcribe', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to send audio data');
          }
          console.log('Audio data sent successfully');
        })
        .catch(error => console.error(error));

        setMediaRecorder(null);
        setAudioChunks([]);
        setIsRecording(false);
      });
      mediaRecorder.stop();
    }
  }, [isRecording, mediaRecorder]);

  const handlePlayClick = () => {
    console.log("play button hit")
    setIsRecording(true);
  };

  const handleStopClick = () => {
    console.log("stop button hit");
    setIsRecording(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <span style={{fontSize:"4em"}} onClick={handlePlayClick}> 
            {isRecording ? null : "▶"} 
        </span>
        <span style={{fontSize:"4em"}} onClick={handleStopClick}> 
            {isRecording ? "■" : null} 
        </span>
        <p> Hit play to start recording audio</p>
        <div id="sound-clip"></div>
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

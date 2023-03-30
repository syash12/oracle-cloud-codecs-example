import { useState } from 'react';
import './App.css';

function App() {

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="App">
      <header className="App-header">
        <span style={{fontSize:"4em"}} onClick={handlePlayClick}> 
            {isPlaying ? "■" : "▶"} 
        </span>
        <p> Hit play to start recording audio. </p>
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

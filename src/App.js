import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import './App.css'; // Your main CSS file

function App() {
  const [suggestion, setSuggestion] = useState("");

  const handleDisruptionClick = (disruption) => {
    // Placeholder for where you'd call the API later
    setSuggestion(`Strategy for: ${disruption}`);
  };

  useEffect(() => {
    // Create script element for Ko-Fi (support payment) widget
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Ko-Fi widget after script is loaded
    script.onload = () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('rapfl', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.backgroundColor': '#ff38b8',
          'floating-chat.donateButton.textColor': '#fff'
        });
      }
    };

    // Cleanup script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <h1>ClassCalm</h1>
      <Grid onDisruptionClick={handleDisruptionClick} />
      <footer style={{ marginTop: '30px', textAlign: 'center' }}>
        <div>
          <a href="https://github.com/rapfl/thisvandoesnotexist" target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px'}}>GitHub</a> | 
          <a href="https://example.com/link2" target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>About</a> | 
          <a href="https://example.com/link3" target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>Sign Up for Custom Prompts</a>
        </div>
        <div style={{ marginTop: '15px' }} id="kofi-button-container"></div> {/* Separate container for Ko-fi */}
      </footer>
    </div>
  );
}

export default App;

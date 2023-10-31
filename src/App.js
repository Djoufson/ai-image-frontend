import React, { useState } from 'react';

const Generate = (prompt) => {
  console.log("Generating from prompt: " + prompt);
}

const Analyze = (image_url) => {
  console.log("Analyzing image: " + image_url + " ...");
}

const App = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className='page'>
      <h1>Computer Vision</h1>
      <p>Insert URL or type a prompt</p>
      <input
        placeholder= "Enter URL to analyze or textual prompt to generate an image"
        onChange={ e => setInputValue(e.target.value)}
        type="text" />
      <div className='buttons'>
        <button onClick={ _ => Generate(inputValue) }>Generate</button>
        <button onClick={ _ => Analyze(inputValue) }>Analyze</button>
      </div>
    </div>
  )
}

export default App;

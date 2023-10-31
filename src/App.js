import React, { useState } from 'react';
import analyzeImage from './services/analyzeImage';

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearInput = () => {
    const promptInput = document.getElementById("prompt-input");
    promptInput.value = ""
    setInputValue("")
  }

  const generate = (prompt) => {
    if(
      prompt == null ||
      prompt === undefined ||
      prompt === ""){
      alert("Empty");
      return;
    }

    console.log("Generating from prompt: " + prompt);
    setIsLoading(true);
    clearInput();
    setIsLoading(false);
  }

  const analyze = async (image_url) => {
    if(
      prompt == null ||
      prompt === undefined ||
      prompt === ""){
      alert("Empty");
      return;
    }

    try {
      setImageSrc(image_url);
      setIsLoading(true);
      const description = await analyzeImage(image_url);
      setImageDescription(description);
    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false);
    clearInput();
  }

  return (
    <div className='page'>
      <h1>Computer Vision</h1>
      <p>Insert URL or type a prompt</p>
      <form onSubmit={ e => e.preventDefault() }>
        <input
          id="prompt-input"
          placeholder= "Enter URL to analyze or textual prompt to generate an image"
          onChange={ e => setInputValue(e.target.value)}
          type="text"
          required />
        <div className='buttons'>
          <button onClick={ _ => generate(inputValue) }>Generate</button>
          <button onClick={ async _ => await analyze(inputValue) }>Analyze</button>
        </div>
      </form>
      {isLoading && <div>Loading...</div>}
      <img src={imageSrc} alt={imageDescription} />
      <div className="image-description">{imageDescription}</div>
    </div>
  )
}

export default App;

import React, { useState } from 'react';
// import analyzeImage from './services/analyzeImage';

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearInput = () => {
    setInputValue("")
  }

  const generate = (prompt) => {
    setIsLoading(true);
    console.log("Generating from prompt: " + prompt);
    clearInput();
    setIsLoading(false);
  }

  const analyze = (image_url) => {
    setIsLoading(true);

    try {
      // const response = analyzeImage(image_url);
      setImageSrc(image_url);
      // setImageDescription(response.captionResult.text);
    } catch (error) {
      console.log('error', error);
    }

    clearInput();
    setIsLoading(false);
  }

  return (
    <div className='page'>
      <h1>Computer Vision</h1>
      <p>Insert URL or type a prompt</p>
      <input
        placeholder= "Enter URL to analyze or textual prompt to generate an image"
        onChange={ e => setInputValue(e.target.value)}
        type="text" />
      <div className='buttons'>
        <button onClick={ _ => generate(inputValue) }>Generate</button>
        <button onClick={ _ => analyze(inputValue) }>Analyze</button>
      </div>

      {isLoading && (<div>Loading ...</div>)}

      <img src={imageSrc} alt={imageDescription} />
      <div>{imageDescription}</div>
    </div>
  )
}

export default App;

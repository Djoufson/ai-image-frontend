import { delay } from "q";

const apiKey = "13cf75832eb34904a578622b3765398f";
const apiKeyHeader = "api-key";
const maxAttempts = 8;

/**
 * Generates an image using OpenAI's image generation API.
 * @param {string} prompt - The prompt to generate the image from.
 * @returns {Promise<string>} - A Promise that resolves to the URL of the generated image.
*/
const generateImage = async (prompt) => {
    const requestId = await requestImageGeneration(prompt);
    console.log(requestId);
    const imageUrl = await pollImage(requestId);
    console.log(imageUrl);
    return imageUrl;
}

const requestImageGeneration = async (prompt) => {
    const url = "https://djouf-openai-resource.openai.azure.com/openai/images/generations:submit?api-version=2023-06-01-preview";
    const headers = new Headers();
    headers.append(apiKeyHeader, apiKey);
    headers.append("Content-Type", "application/json");
    const requestBody = {
        prompt: prompt,
        size: "512x512",
        n: 1
    };

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    const response = await fetch(url, requestOptions);
    const content = await response.json();
    return content.id;
}

/**
 * Polls the image generation API for the URL of the generated image.
 * @param {string} requestId - The ID of the generated image.
 * @returns {Promise<string>} - A Promise that resolves to the URL of the generated image.
 */
const pollImage = async (requestId) => {
    const url = `https://djouf-openai-resource.openai.azure.com/openai/operations/images/${requestId}?api-version=2023-06-01-preview`;
    const headers = new Headers();
    headers.append(apiKeyHeader, apiKey);

    const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow"
    };

    let imageUrl = "";
    let attempts = 0;
    do {
        attempts++;
        const response = await fetch(url, requestOptions);
        const content = await response.json();
        console.log(content);
        try {
            imageUrl = content.result.data[0].url
        } catch (error) {
            console.log(error);
            if (attempts >= maxAttempts){
                break;
            }
            await delay(1500);
        }
    } while (imageUrl === "");
    return imageUrl;
}

export default generateImage;

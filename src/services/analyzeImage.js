const endpoint = "ai-image-vision-service.cognitiveservices.azure.com";
const apiKeyHeader = "ocp-apim-subscription-key";
const apiKey = "0d93efd0db7e42e89f40ff8cd98da4a8"
const url = `https://${endpoint}/computervision/imageanalysis:analyze?features=caption&language=en&gender-neutral-caption=false&api-version=2023-04-01-preview`

/*
Sample response
{
    "captionResult": {
        "text": "a person using a laptop",
        "confidence": 0.8266631960868835
    },
    "modelVersion": "2023-02-01-preview",
    "metadata": {
        "width": 1260,
        "height": 473
    }
}
 */

const analyzeImage = (image_url) => {
    var myHeaders = new Headers();
    myHeaders.append(apiKeyHeader, apiKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "url": image_url
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log("Analyze started ...");
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result.captionResult.text;
        });
}

export default analyzeImage;
import { env } from "process";

const endpoint = env.VISION_ENDPOINT;
const apiKeyHeader = "Ocp-Apim-Subscription-Key";
const apiKey = env.VISION_KEY
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

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            return result;
        });
}

export default analyzeImage;
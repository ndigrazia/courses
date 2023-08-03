const axios = require("axios");

module.exports = async function (context, myBlob) {
  context.log(
    "JavaScript blob trigger function processed blob \n Blob:",
    context.bindingData.blobTrigger,
    "\n Blob Size:",
    myBlob.length,
    "Bytes"
  );

  await axios({
    method: "post",
    url: "https://computervisionserviceudemy.cognitiveservices.azure.com/vision/v2.0/analyze?visualFeatures=Tags&language=en",
    data: myBlob,
    headers: {
      "Ocp-Apim-Subscription-Key": "<key>",
      "Content-Type": "application/octet-stream"
    }
  })
    .then(function (response) {
      context.log(response.data);
      context.log(
        "Received successful response from Computer Vision API. \nStoring results in CosmosDB..."
      );
      context.bindings.outputDocument = JSON.stringify(response.data);
    })
    .catch(function (error) {
      context.log(error);
    });
};

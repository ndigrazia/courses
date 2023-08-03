const fs = require("fs");
var zlib = require('zlib');

module.exports = async function (context, myInputBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myInputBlob.length, "Bytes");
    
    let compressed = zlib.gzipSync(myInputBlob);

    context.bindings.myOutputBlob = compressed;
};
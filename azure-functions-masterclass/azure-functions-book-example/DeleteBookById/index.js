const { CosmosClient } = require("@azure/cosmos");

var endpoint = process.env.CosmosDBEndpoint;
var key = process.env.CosmosDBAuthKey;
var databaseName = process.env.DatabaseName;
var collectionName = process.env.ContainerName;

const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req, inputDocument) {
    context.log('DeleteBookById Function Triggered');

    if(inputDocument.length != 0)
    {
        const itemBody = inputDocument[0];
        await client.database(databaseName).container(collectionName).item(itemBody.id, itemBody.author).delete()
        .then((status) => { 
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Item deleted successfully"
            };
        })
        .catch((err) => { 
            console.log(err);
            context.res = {
                status: 500,
                body: err
            };
        });
    }
    else
    {
        context.res = {
            status: 404,
            body: "Item not found"
        };
    }

};
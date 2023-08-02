module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    /*const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";*/
    // Title is required
    if (req.body && req.body.title)
    {
        const itemBody = {
            "id": req.body.id,
            "author": req.body.author,
            "title": req.body.title,
            "date_published": req.body.date_published
        }

        context.log('JSON' + JSON.stringify(itemBody));

        context.bindings.outputDocument = JSON.stringify(itemBody);
        
        context.res = {
            status: 200,
            body: "Item added successfully"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Parameter missing: Title of the book"
        };
    }   
}
module.exports = async function (context, req, inputDocument) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if(inputDocument.length == 0) {
        context.res = {
            status: 404,
            body: "Book with given Id not found"
        };
    }
    else {
        const book = inputDocument[0];
        const author = req.body.author || book.author;
        const title = req.body.title || book.title;
        const date_published = req.body.date_published || book.date_published;
        
        const itemBody = {
            "id": req.query.id,
            "author": author,
            "title": title,
            "date_published": date_published
        }
        
        context.bindings.outputDocument = JSON.stringify(itemBody);
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: itemBody
        };
    }
}
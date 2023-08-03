module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if(req.query.num1 && req.query.num2) {
        context.res = {
            body: req.query.num1 * req.query.num2
        };    
    }
    else {
        context.res = {
            status: 400, 
            body: "empty parameters"
        };
    }
    
}
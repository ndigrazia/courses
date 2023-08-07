module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if ((req.query.num1 && req.query.num2) && (!isNaN(req.query.num1) && !isNaN(req.query.num2))) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "The Result is: " + req.query.num1 * req.query.num2
        }
    } 
    else { 
        context.res = {
            status: 400, /* Defaults to 200 */
            body: "Params passed must be number!."
        }
    }  
}
const httpFunction = require('./index');
const context = require('../testing/defaultContext');

test('Return multiplication of numbers', async () => { 
    const request = { 
        query: { num1: 10, num2: 30 } 
    };

    await httpFunction(context, request);

    expect(context.res.body).toEqual("The Result is: 300");
} );

test('Return multiplication of numbers', async () => { 
    const request = { 
        query: { num1: 10} 
    };

    await httpFunction(context, request);

    expect(context.res.body).toEqual("Params passed must be number!.");
} );
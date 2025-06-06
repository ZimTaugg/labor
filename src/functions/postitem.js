const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'timtestDB',
    containerName: 'timtestContainer',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});

app.http('postItems', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items',
    handler: async (request, context) => {
        const items = context.extraInputs.get(cosmosInput);
        return {
            body: JSON.stringify(items),
            status: 201
        };
    }
});

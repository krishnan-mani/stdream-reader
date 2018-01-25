'use strict';

let AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
    console.log("invoked at " + Date.now());

    let tableName = process.env.TABLE_NAME;
    let dynamodb = new AWS.DynamoDB();
    let params = {
        Item: {
            "id": {
                S: Date.now().toString()
            }
        },
        TableName: tableName
    };

    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.error(err, err.stack);
            callback(err);
        }
        else {
            console.log(data);
            callback(null, data);
        }
    });
}
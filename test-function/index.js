'use strict';

let AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
    console.log("invoked at " + Date.now());
    let tableName = process.env.TABLE_NAME;

    let requests = [];

    var i = 0;
    for (i = 1; i <= 25; i++) {
        requests.push({
            PutRequest: {
                Item: {
                    "id": {
                        S: Date.now().toString()
                    },
                    "offset": {
                        S: "" + i
                    }
                }
            }
        });
    };

    let batchWriteParams = {
        "RequestItems": {
        }
    };
    batchWriteParams["RequestItems"][tableName] = requests;

    let dynamodb = new AWS.DynamoDB();
    dynamodb.batchWriteItem(batchWriteParams, function (err, data) {
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
'use strict';

exports.handler = (event, context, callback) => {
        console.log("DEBUG: first event below");
        console.log(event["Records"][0]);
        callback(null, "Received event successfully");
}
'use strict';

exports.handler = (event, context, callback) => {
        console.log("Received " + event["Records"].length + " events");
        callback(null, "success");
}
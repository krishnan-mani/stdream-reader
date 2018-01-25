'use strict';

exports.handler = (event, context, callback) => {
    console.log("invoked at " + Date.now());
    callback(null, "success");
}
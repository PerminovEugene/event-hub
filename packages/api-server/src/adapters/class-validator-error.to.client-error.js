"use strict";
exports.__esModule = true;
exports.convertClassValidatiorErrorToClient = function (errors) {
    var result = {};
    errors.forEach(function (error) {
        result[error.property] = mergeErrorMessages(error.constraints);
    });
    return result;
};
var mergeErrorMessages = function (constraints) {
    return Object.values(constraints).reduce(function (mergedErrors, currentError) {
        return mergedErrors !== ''
            ? mergedErrors + ". " + currentError
            : currentError + ".";
    }, '');
};

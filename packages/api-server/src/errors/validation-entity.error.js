"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var app_error_1 = require("./app.error");
var class_validator_error_to_client_error_1 = require("../adapters/class-validator-error.to.client-error");
var ValidationEntityError = /** @class */ (function (_super) {
    __extends(ValidationEntityError, _super);
    function ValidationEntityError(sourceError, msg) {
        var _this = _super.call(this, msg, sourceError) || this;
        _this._clientError = new common_1.BadRequestException(class_validator_error_to_client_error_1.convertClassValidatiorErrorToClient(sourceError));
        return _this;
    }
    return ValidationEntityError;
}(app_error_1.AppError));
exports.ValidationEntityError = ValidationEntityError;

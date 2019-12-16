"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var app_error_1 = require("../errors/app.error");
var AllExceptionsFilter = /** @class */ (function () {
    function AllExceptionsFilter() {
        this.isAppError = function (exception) {
            return exception instanceof app_error_1.AppError;
        };
        // protected getHots = (host: ArgumentsHost) => GqlArgumentsHost.create(host);
    }
    AllExceptionsFilter.prototype["catch"] = function (exception, host) {
        if (this.isAppError(exception)) {
            return exception.clientError;
        }
        console.log('unhandled exception: ', exception);
        return new common_1.InternalServerErrorException();
    };
    AllExceptionsFilter = __decorate([
        common_1.Catch()
    ], AllExceptionsFilter);
    return AllExceptionsFilter;
}());
exports.AllExceptionsFilter = AllExceptionsFilter;

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
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(msg, sourceError) {
        var _this = _super.call(this, msg) || this;
        _this._sourceError = sourceError;
        return _this;
    }
    Object.defineProperty(AppError.prototype, "clientError", {
        get: function () {
            return this._clientError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppError.prototype, "sourceError", {
        get: function () {
            return this._sourceError;
        },
        enumerable: true,
        configurable: true
    });
    return AppError;
}(Error));
exports.AppError = AppError;

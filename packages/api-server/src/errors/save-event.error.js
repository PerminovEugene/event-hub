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
var database_errors_1 = require("./database.errors");
var SaveEventError = /** @class */ (function (_super) {
    __extends(SaveEventError, _super);
    function SaveEventError(sourceError, msg) {
        var _this = _super.call(this, sourceError, msg) || this;
        _this._clientError = new common_1.BadRequestException('Invalid event data');
        return _this;
    }
    return SaveEventError;
}(database_errors_1.DatabaseError));
exports.SaveEventError = SaveEventError;

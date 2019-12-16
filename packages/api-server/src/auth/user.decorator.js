"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
exports.CurrentUser = common_1.createParamDecorator(function (data, _a) {
    var root = _a[0], args = _a[1], ctx = _a[2], info = _a[3];
    return ctx.req.user;
});

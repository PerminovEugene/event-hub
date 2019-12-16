"use strict";
exports.__esModule = true;
var path_1 = require("path");
var app_user_module_1 = require("./../../app-user/app-user.module");
var auth_module_1 = require("./../../auth/auth.module");
var event_module_1 = require("./../../event/event.module");
var cors_1 = require("./../cors");
exports.graphqlConfig = {
    context: function (req, res) {
        return req;
    },
    debug: false,
    playground: true,
    typePaths: [__dirname + "/**/*.graphql"],
    definitions: {
        // dist/src/../../shared
        path: path_1.join(__dirname, '../../../../shared/transport/graphql.ts'),
        outputAs: 'class'
    },
    include: [app_user_module_1.AppUserModule, auth_module_1.AuthModule, event_module_1.EventModule],
    cors: cors_1.corsOptions
};

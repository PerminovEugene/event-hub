"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var app_user_module_1 = require("../app-user/app-user.module");
var passport_1 = require("@nestjs/passport");
var local_strategy_1 = require("./local.strategy");
var auth_resolver_1 = require("./auth.resolver");
var session_serializer_1 = require("./session.serializer");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [app_user_module_1.AppUserModule, passport_1.PassportModule],
            providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver, local_strategy_1.LocalStrategy, session_serializer_1.SessionSerializer],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;

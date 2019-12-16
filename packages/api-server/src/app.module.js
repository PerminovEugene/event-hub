"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var app_user_module_1 = require("./app-user/app-user.module");
var auth_module_1 = require("./auth/auth.module");
var event_module_1 = require("./event/event.module");
var service_1 = require("./config/environment/service");
var graphql_config_1 = require("./config/app/graphql.config");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                graphql_1.GraphQLModule.forRoot(graphql_config_1.graphqlConfig),
                app_user_module_1.AppUserModule,
                auth_module_1.AuthModule,
                event_module_1.EventModule,
            ],
            providers: [
                {
                    provide: service_1.ConfigService,
                    useValue: service_1.configService
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

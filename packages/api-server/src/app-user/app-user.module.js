"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var app_user_entity_1 = require("./app-user.entity");
var app_user_service_1 = require("./app-user.service");
var database_module_1 = require("../database/database.module");
var AppUserModule = /** @class */ (function () {
    function AppUserModule() {
    }
    AppUserModule = __decorate([
        common_1.Module({
            imports: [database_module_1.DatabaseModule],
            providers: [
                {
                    provide: 'APP_USER_REPOSITORY',
                    useFactory: function (connection) { return connection.getRepository(app_user_entity_1.AppUser); },
                    inject: ['DATABASE_CONNECTION']
                },
                app_user_service_1.AppUserService,
            ],
            exports: [app_user_service_1.AppUserService]
        })
    ], AppUserModule);
    return AppUserModule;
}());
exports.AppUserModule = AppUserModule;

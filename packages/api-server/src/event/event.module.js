"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var event_entity_1 = require("./event.entity");
var event_service_1 = require("./event.service");
var database_module_1 = require("../database/database.module");
var event_resolver_1 = require("./event.resolver");
var EventModule = /** @class */ (function () {
    function EventModule() {
    }
    EventModule = __decorate([
        common_1.Module({
            imports: [database_module_1.DatabaseModule],
            providers: [
                {
                    provide: 'EVENT_REPOSITORY',
                    useFactory: function (connection) { return connection.getRepository(event_entity_1.Event); },
                    inject: ['DATABASE_CONNECTION']
                },
                event_service_1.EventService,
                event_resolver_1.EventResolver,
            ],
            exports: [event_service_1.EventService]
        })
    ], EventModule);
    return EventModule;
}());
exports.EventModule = EventModule;

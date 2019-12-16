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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../core/base.entity");
var class_validator_1 = require("class-validator");
var Type;
(function (Type) {
    Type["conference"] = "conference";
    Type["meetup"] = "meetup";
    Type["workshop"] = "workshop";
    Type["podcast"] = "podcast";
    Type["video"] = "video";
    Type["article"] = "article";
})(Type = exports.Type || (exports.Type = {}));
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Event.prototype, "id");
    __decorate([
        class_validator_1.IsString(),
        typeorm_1.Column('text')
    ], Event.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        typeorm_1.Column('text')
    ], Event.prototype, "description");
    __decorate([
        typeorm_1.Column('text')
    ], Event.prototype, "type");
    __decorate([
        class_validator_1.IsDate({
            message: 'Invalid date'
        }),
        typeorm_1.Column('date')
    ], Event.prototype, "date");
    Event = __decorate([
        typeorm_1.Entity()
    ], Event);
    return Event;
}(base_entity_1.BaseEntity));
exports.Event = Event;

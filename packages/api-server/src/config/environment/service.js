"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var Joi = require("@hapi/joi");
var fs = require("fs");
var path_1 = require("path");
var EnvField;
(function (EnvField) {
    EnvField["NODE_ENV"] = "NODE_ENV";
    EnvField["PORT"] = "PORT";
    EnvField["FRONT_END_DOMAIN"] = "FRONT_END_DOMAIN";
    EnvField["COOKIE_SECRET"] = "COOKIE_SECRET";
})(EnvField = exports.EnvField || (exports.EnvField = {}));
var ConfigService = /** @class */ (function () {
    function ConfigService(filePath) {
        var config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }
    ConfigService.prototype.get = function (key) {
        return this.envConfig[key];
    };
    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    ConfigService.prototype.validateInput = function (envConfig) {
        var envVarsSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')["default"]('development'),
            PORT: Joi.number()["default"](3000),
            FRONT_END_DOMAIN: Joi.string().required(),
            COOKIE_SECRET: Joi.string().required()
        });
        var _a = envVarsSchema.validate(envConfig), error = _a.error, validatedEnvConfig = _a.value;
        if (error) {
            throw new Error("Config validation error: " + error.message);
        }
        return validatedEnvConfig;
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
console.log(process.cwd());
exports.configService = new ConfigService(path_1.resolve(process.cwd(), "env/.env"));

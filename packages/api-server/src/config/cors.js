"use strict";
exports.__esModule = true;
var service_1 = require("./environment/service");
exports.corsOptions = {
    origin: service_1.configService.get(service_1.EnvField.FRONT_END_DOMAIN),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true
};

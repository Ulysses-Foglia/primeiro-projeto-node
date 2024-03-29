"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var date_fns_1 = require("date-fns");
var CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
var AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
var appointmentsRouter = express_1.Router();
var appointmentRepository = new AppointmentRepository_1.default();
appointmentsRouter.get('/', function (request, response) {
    var appointments = appointmentRepository.All();
    return response.json(appointments);
});
appointmentsRouter.post('/', function (request, response) {
    try {
        var _a = request.body, provider = _a.provider, date = _a.date;
        var parsedDate = date_fns_1.parseISO(date);
        var createAppointment = new CreateAppointmentService_1.default(appointmentRepository);
        var appointment = createAppointment.execute({ provider: provider, date: parsedDate });
        return response.json(appointment);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = appointmentsRouter;

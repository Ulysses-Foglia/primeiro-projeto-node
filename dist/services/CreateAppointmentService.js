"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var CreateAppointmentService = /** @class */ (function () {
    function CreateAppointmentService(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    CreateAppointmentService.prototype.execute = function (_a) {
        var provider = _a.provider, date = _a.date;
        var appointmentDate = date_fns_1.startOfHour(date);
        var findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);
        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }
        var appointment = this.appointmentsRepository.create({ provider: provider, date: appointmentDate });
        return appointment;
    };
    return CreateAppointmentService;
}());
exports.default = CreateAppointmentService;

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
//import appointmentsRouter from '../routes/appointments.routes';
//import { response } from 'express';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
// sairam devido ao uso do typeorm
//   private appointmentsRepository: AppointmentRepository;

// constructor(appointmentsRepository: AppointmentRepository) {
//   this.appointmentsRepository = appointmentsRepository;
// }

  public async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    // ou
    // findAppointmentInSameDate.then(reponse => {
    //  if (response) {
    //    throw Error('This appointment is already booked');
    //  }
    // });

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
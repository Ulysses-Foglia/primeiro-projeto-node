import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();
// saio com o uso do typeorm
// const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try{
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ provider, date: parsedDate });

    return response.json(appointment);
  }
  catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
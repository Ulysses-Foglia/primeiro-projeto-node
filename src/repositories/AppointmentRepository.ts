// import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

// interface CreateAppointmentDTO {
//   provider: string, 
//   date: Date
// };

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // Saio devido a utilização do typeorm
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

// public All(): Appointment[] {
//   return this.appointments;
// }

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment => 
    //   isEqual(date, appointment.date),
    //   );

    const findAppointment = await this.findOne({
      where: { date },
    });

      return findAppointment || null;

      // findByDate(date).then(response => ) retorno se tornou uma promisse, que estará acessível quando
      // o comando terminar de ser executado
  }
  
  // public create({ provider, date}: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });

  //   this.appointments.push(appointment);

  //   return appointment;
  // }
}

export default AppointmentsRepository;
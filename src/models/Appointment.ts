// import { uuid } from 'uuidv4'; // PrimaryGeneratedColumn faz essa função
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// interface AppointmentConstructor { //Omit<Appointment, 'id'> tem a função de receber
//   provider: string,                //os campos descritos na classe indicada, e omitir
//   date: Date                       //os que forem necessários.
// }

// Ao retirar o construtor, gerou erro nos campos, mas o funcionamento está correto
// Ativar no tsconfig o campo strictPropertyInitialization para false

@Entity('appointments')
class Appointment {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // default = varchar
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // Removido após inserir a biblioteca do BD, typeorm
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  //}
}

export default Appointment;

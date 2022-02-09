// import { uuid } from 'uuidv4'; // PrimaryGeneratedColumn faz essa função
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';

import User from './User';

// interface AppointmentConstructor { //Omit<Appointment, 'id'> tem a função de receber
//   provider: string,                //os campos descritos na classe indicada, e omitir
//   date: Date                       //os que forem necessários.
// }

// Ao retirar o construtor, gerou erro nos campos, mas o funcionamento está correto
// Ativar no tsconfig o campo strictPropertyInitialization para false

/**
 * TIPOS DE RELACIONAMENTO:
 * 
 * Um para Um (OneToOne)
 * Um para Muitos (OneToMany)
 * Muitos para Muitos (ManyToMany) Ex.: Muitos colaboradores podendo participar do mesmo evento 
 * (e outros também)
 * 
 * KISS - Keep It Simple & Stupid
 */

@Entity('appointments')
class Appointment {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // default = varchar
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Removido após inserir a biblioteca do BD, typeorm
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  //}
}

export default Appointment;

import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointments';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate){
      throw Error('This appointment already booked');
    }

    const appointment = appointmentRepository.create({
      date,
      provider,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

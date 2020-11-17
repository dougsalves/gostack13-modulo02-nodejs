import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Users from '../models/Users';

import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<Users> {
    const usersRepository = getRepository(Users);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('E-mail address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;

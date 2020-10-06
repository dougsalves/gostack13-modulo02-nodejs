import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const newUser = await createUser.execute({
      name,
      email,
      password,
    });

    delete newUser.password;

    return response.json(newUser);
  } catch (err) {
    return response.status(400).json({ erro: err.message });
  }
});

export default usersRoutes;
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const newUser = await createUser.execute({
      name,
      email,
      password,
    });

    const newUserWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
    };

    return response.json(newUserWithoutPassword);
  } catch (err) {
    return response.status(400).json({ erro: err.message });
  }
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const userAvatar = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const newUserAvatar = {
      id: userAvatar.id,
      name: userAvatar.name,
      email: userAvatar.email,
      created_at: userAvatar.created_at,
      updated_at: userAvatar.updated_at,
      avatar: userAvatar.avatar,
    };

    return response.json(newUserAvatar);
  },
);

export default usersRoutes;

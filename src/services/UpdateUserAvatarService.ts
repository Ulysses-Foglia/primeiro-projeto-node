import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    user_id: string,
    avatarFileName: string
}

interface User2 {
    name: string,
    email: string,
    // para corrigir o delete user.password no users.route.ts
    password?: string
}

class UpdateUserAvatarService {
    public async execute ({ user_id, avatarFileName }: Request) : Promise<User2> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id?.toString());

        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);            
        }

        if(user?.avatar){
            // deletar avatar antigo

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }            
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

// Não será criado o arquivo Repository, pois não haverá necessidade de criar um método 
// específico. Iremos utilizar os métodos padrões do typeorm

interface Request {
    name: string,
    email: string,
    password: string
}

interface User2 {
    name: string,
    email: string,
    // para corrigir o delete user.password no users.route.ts
    password?: string
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User2>{
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email }
        });

        if (checkUserExists)
        throw new AppError('Email address already used.');

        const hashedPassword = await hash(password, 8);

        // sem o await pois o método create gera apenas a instância no BD
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    email: string,
    password: string
}

interface User2 {
    name: string,
    email: string,
    // para corrigir o delete user.password no sessions.route.ts
    password?: string
}

interface Response {
    user: User2,
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user)
        throw new AppError('Incorrect email/passwword combination.', 401);

        // user.password - senha criptografada
        // password - senha não criptografada

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched)
        throw new AppError('Incorrect email/passwword combination.', 401);

        // Usuário autenticado

        // para reduzir a sintaxe
        const { secret, expiresIn } = authConfig.jwt;

                        //payload   //secret = boa pratica gerar pelo md5 (online)
        const token = sign({  }, secret, {
            subject: user.id,
            expiresIn,            
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req,res)=>{
    const {username,email,password} = req.body;

    try {

        const passwordHash = await bcryptjs.hash(password,10); //hash aleatorio

        const newUser = new User({
            username,
            email,
            password:passwordHash,
        })
        //console.log('registrando usuario');
        const userSaved = await newUser.save();

        const token = await createAccessToken({id:userSaved.id});

        res.cookie('token',token);
        res.json({
            id:userSaved.id,
            username:userSaved.username,
            email:userSaved.email,
            createdAt:userSaved.createdAt,
            updatedAt:userSaved.updatedAt,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).json({message:error.message});
    }
    //console.log('usuario registrado');
    //res.send('registro exitoso');

};

export const login = (req,res)=> res.send('login');
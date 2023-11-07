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

export const login = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});

        const isMatch = await bcryptjs.compare(password,userFound.password); //hash aleatorio
        if(!isMatch){
            return res.status(400).json({message:"Contraseña incorrecta"});
        }

        const token = await createAccessToken({id:userFound._id});

        res.cookie('token',token);
        res.json({
            id:userFound._id,
            username:userFound.username,
            email:userFound.email,
            createdAt:userFound.createdAt,
            updatedAt:userFound.updatedAt,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).json({message:error.message});
    }
    //console.log('usuario registrado');
    //res.send('registro exitoso');

};

export const logout = (req,res)=>{
    res.cookie('token',"",{
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = (req,res)=>{
    res.send('profile');
};
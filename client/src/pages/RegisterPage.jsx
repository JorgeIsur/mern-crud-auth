import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const {register, handleSubmit,formState:{errors}} = useForm();

    const { signup,isAuthenticated,errors:RegisterErrors } = useAuth();

    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated) navigate('/tasks');
    },[isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });


    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        {
            RegisterErrors.map((error,i)=>(
                <div className='bg-red-500 p-2 text-white rounded-md text-center my-2' key={i}>
                    {error}
                </div>
            ))
        }
            <form onSubmit={onSubmit}>
                <input type='text'
                    {...register('username', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Nombre de usuario'
                />
                {
                    errors.username &&(
                        <p className='text-red-500'>
                            Usuario requerido
                        </p>
                    )
                }
                <input type='email'
                    {...register('email', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Correo electronico'
                />
                {
                    errors.email &&(
                        <p className='text-red-500'>
                            Correo requerido
                        </p>
                    )
                }
                <input type='password'
                    {...register('password', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Contraseña'
                />
                {
                    errors.password &&(
                        <p className='text-red-500'>
                            Contraseña requerida
                        </p>
                    )
                }
                <button type='submit'>
                    Registrar
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
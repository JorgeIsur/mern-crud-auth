import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost/merndb');
        console.log("Base datos conectada");
    } catch (error) {
        console.log("No se pudo conectar a la base de datos");
        console.log(error);
    }
}
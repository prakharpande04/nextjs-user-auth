import mongoose, { connection } from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.mongo_uri!);
        const connect = mongoose.connection;

        connection.on('connected', () => {
        console.log("Connrcted Successfully");
        });

        connection.on('error', (err) => {
            console.log("Connection Error");
            process.exit();
        });
    } catch(error){
        console.log("Connection Error");
    }
}
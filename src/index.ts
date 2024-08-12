import express from "express"
import dotenv from "dotenv";
//jjj
import { prisma } from "./db";

dotenv.config();
const app = express()

app.use(express.json())

const PORT = 3000

app.get('/ping', (_req,res)=>{
    console.log('someone pinged here!!')
    res.send("pong")
})
// Nueva ruta para obtener todos los usuarios
app.get('/usuarios', async (_req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los usuarios");
    }
});


app.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT}`)
})
import express from "express"
import dotenv from "dotenv";
import morgan from "morgan";
import { prisma } from "./db";
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express()


app.use(express.json())

app.use(morgan('dev'));


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

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT}`)
})
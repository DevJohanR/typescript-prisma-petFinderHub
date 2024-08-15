import express from "express"
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes'; 


dotenv.config();
const app = express()


app.use(express.json())

app.use(morgan('dev'));


const PORT = 3000



app.use('/api/users', userRoutes )

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT}`)
})
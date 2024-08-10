import express from "express"
//jjj
const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req,res)=>{
    console.log('someone pinged here!!')
    res.send("pong")
})

app.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT}`)
})
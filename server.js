const express=require('express')
const mongoose=require('mongoose')

const workoutRoutes=require('./routes/workout')
const userRoutes=require('./routes/user')


// express app
const app=express()

//middleware

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect('mongodb+srv://adhithiyarajcoc2018:adhi2022@mernapp.vbalwgd.mongodb.net/')
    .then( ()=>{
        //listen for requests
        app.listen(4000,()=>{
            console.log('connected to db and listening on port 4000')
        })
    })
    .catch((error) =>{
        console.log(error)
    })



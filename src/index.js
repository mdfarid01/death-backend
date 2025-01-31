// require('dotenv').config({path: '.env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js';

dotenv.config({
    path: '.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`App is listening on port ${process.env.PORT || 8000}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed:", error);
    
}) 














/*
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",() => {
            console.log("Error:",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })


    } catch (error) {
        console.error("ERROR:", error)
        throw err
    }
} ) ()

*/
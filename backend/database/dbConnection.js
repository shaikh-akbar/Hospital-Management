import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGEMENT"
    }).then(()=>{
        console.log('connected to db')
    }).catch((err)=>{
        console.log(`some error occured while connnecting database ${err}`)
    })
}
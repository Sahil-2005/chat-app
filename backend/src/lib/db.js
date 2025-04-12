import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI); // 👈 Check this

        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}
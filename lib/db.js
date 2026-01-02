import mongoose from "mongoose";
const url = process.env.MONGO_URL

let connection

const startDB = async () => {
    if (connection) return connection
    connection = await mongoose.connect(url, {
        dbName: 'blogZs'
    })
    return connection
}
export default startDB
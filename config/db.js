const mongoose = require('mongoose')


require('dotenv').config({path: 'variables.env' });

const conectDB = async () => {

    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
            
        })
    }catch (error){
        console.log(error)
        process.exit(1); //STOPPIAMO APP
    }

}

module.exports = conectDB
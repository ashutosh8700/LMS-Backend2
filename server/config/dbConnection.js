const mongoose = require('mongoose');
// do got post error if some vield ask is not available
mongoose.set('strictQuery',false);

const connectToDB = () =>{
    try{
        const {connection} = mongoose.connect(
            process.env.MONGO_URI  || 'mongodb+srv://<username>:<password>@cluster0.nnwvce1.mongodb.net/'
        );

        if(connection){
            console.log(`Connected to mongo: ${connection.host}`);
        }
    }catch(e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectToDB;
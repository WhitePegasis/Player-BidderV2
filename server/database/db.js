import mongoose from 'mongoose';

// username: souravpradhanfake , password: souravpradhanfake
const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@player-bidder.3inkwan.mongodb.net/?retryWrites=true&w=majority`;
    try {
        // 1 - Current URL string parser is deprecated, and will be removed in a future version. 
        // 2 - Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version.
        mongoose.set('strictQuery', false);
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error in db.js: ', error.message);
    }
}

export default Connection;
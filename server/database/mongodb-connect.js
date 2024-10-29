import mongoose from 'mongoose';

export default function connect(){
    const database = "mongodb+srv://jibbsmamogkat:2T6BwT04fyfgICzr@todocluster.y1ljt.mongodb.net/?retryWrites=true&w=majority&appName=TodoCluster";
    mongoose
        .connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'TodoApp'
        })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB: ', error);
        });
}
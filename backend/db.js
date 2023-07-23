const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://GoFood:Ashu960tomar@cluster0.xeypnwb.mongodb.net/GoFoodmern?retryWrites=true&w=majority';
//const mongoUri = 'mongodb://GoFood:Ashu960tomar@ac-vqfj7jh-shard-00-00.xeypnwb.mongodb.net:27017,ac-vqfj7jh-shard-00-01.xeypnwb.mongodb.net:27017,ac-vqfj7jh-shard-00-02.xeypnwb.mongodb.net:27017/GoFoodmern?ssl=true&replicaSet=atlas-iuwzci-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = () => {
    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect(mongoUri);
        console.log("Connected");
        const fetched_data=mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategory = catData;
        //console.log(global.foodCategory);
    }
}
module.exports = mongoDB();

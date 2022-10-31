const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middleware
app.use(cors());
app.use(express.json());

//User: user1
// password: glHqjM00ps4UhA7R
//user2  , qAeayx9O3Au0s68t


//db configuration:
const uri = "mongodb+srv://user1:glHqjM00ps4UhA7R@cluster0.flmxcne.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const run = async()=> {
    try{
        const userCollection = client.db('nodeMongoCRUD').collection('users');

        app.get('/users/:id',async (req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user);
            
        })

        app.get('/users', async(req,res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req,res)=>{
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

        app.put('/users/edit/:id',async(req,res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
             const user = req.body;
             console.log(user);
             const option = {upsert: true};
             const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
             }
             const result = await userCollection.updateOne(filter, updatedUser,option)
             console.log(result);
        })
        app.get('/users/edit/'),(req,res)=>{
            res.send('ok')
            console.log('ok');
        }

        app.delete('/delete/:id',async (req,res)=>{
            const id = req.params.id;
            console.log('Trying to delete ',id);
            const query = {_id: ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
           
        })

}
catch{

}
}

run().catch(error=> console.log(error));


app.get('/',(req,res)=>{
    res.send('node server running with mongoDB COrs');
    console.log('node server running with mongoDB COrs');
}
)

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})
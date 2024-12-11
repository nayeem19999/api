const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 3000


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})





const uri = "mongodb+srv://f24-1-mid-1:nayeem123@cluster0.guep9xh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const blogCollection = client.db('Mern-f24-1').collection('blogs')
    const ContentCollection = client.db('Mern-f24-1').collection('content')

    app.get('/blogs',async(req,res)=>{
        const query = {};
        const cursor =await blogCollection.find(query).toArray()
        res.send(cursor)
    })
    // app.get('/content',async(req,res)=>{
    //     const query = {};
    //     const result = await ContentCollection.find(query).toArray();
    //     res.send(result)
    // })

    app.get('/content',async(req,res)=>{
        let query = {};
        
        if(req.query.category){
            query = {
                category:req.query.category
            };
        }
        console.log(query)
        const result = await ContentCollection.find(query).toArray();
        res.send(result)
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
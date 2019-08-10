const express = require('express')
const mongoose = require('mongoose')

const {USER, PASS, CLUSTER_NAME, DB_NAME, PORT} = require('./constants')

const MONGO_DB_URL = `mongodb+srv://${USER}:${PASS}@${CLUSTER_NAME}-euytd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const app = express()

app.use(express.json())

app.post('/events',(request, response)=>{
    const { name, date, items, location }= request.body
    response.json({
        name,
        date,
        items,
        location
    })
})

mongoose.connect(
    MONGO_DB_URL,
    {useNewUrlParser: true},
    (error)=>{
        if(error) return console.log('ERROR:', error);
        
        console.log('DB CONNECTED')
        app.listen(PORT, ()=>{
            console.log(`Server running in Port ${PORT}`);
        })
    }
)

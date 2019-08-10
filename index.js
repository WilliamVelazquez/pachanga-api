const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const {USER, PASS, CLUSTER_NAME, DB_NAME, PORT} = require('./constants')
const event = require('./usecases/event')

const MONGO_DB_URL = `mongodb+srv://${USER}:${PASS}@${CLUSTER_NAME}-euytd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const app = express()

app.use(express.json())
app.use(cors())

app.get('/events', async(request, response)=>{
    try{
        const allEvents = await event.getAll(request.query)
        // throw new Error('Halp!')
        response.json({
            success: true,
            message: 'All events',
            data: {
                events: allEvents
            }
        })
    } catch(error){
        //request error
        response.status(400)
        response.json({
            success: false,
            error: error.message,
        })
    }
})

app.get('/events/:id', async(request, response)=>{
    try{
        const { id } = request.params
        const foundEvent = await event.getById(id)
        response.json({
            success: true,
            message: `Event found with ID: ${id}`,
            data: {
                event: foundEvent
            }
        })
    } catch(error){
        //request error
        response.status(400)
        response.json({
            success: false,
            error: error.message,
        })
    }
})

app.post('/events', async(request, response)=>{
    try{
        const { name, date, items, location }= request.body
        const eventData = { name, date, items, location }
        const createdEvent = await event.create(eventData)
        response.json({
            success: true,
            message: `Event ${eventData.name} created`,
            data: {
                event: createdEvent
            }
        })
    } catch(error){
        //request error
        response.status(400)
        response.json({
            success: false,
            error: error.message,
        })
    }
})

app.put('/events/:id/items/:index', async(request, response)=>{
    try{
        const { id, index }= request.params
        const { name } = request.body
        const updatedEvent = await event.assignCarrier(id, index, name)
        response.json({
            success: true,
            message: `Carrier assigned`,
            data: {
                event: updatedEvent
            }
        })
    } catch(error){
        //request error
        response.status(400)
        response.json({
            success: false,
            error: error.message,
        })
    }
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

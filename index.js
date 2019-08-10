const express = require('express')

const PORT = '8080'
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

app.listen(PORT, ()=>{
    console.log(`Server running in Port ${PORT}`);
})
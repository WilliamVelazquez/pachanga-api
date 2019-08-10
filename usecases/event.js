const Event = require('../models/event')

function create({ name, date, items, location }){
    //const newEvent = new Event({ name, location, items, date })
    //newEvent.save()
    return Event.create({ name, location, items, date })
}

function getAll(queries){
    if(Object.keys(queries).length>0 && queries.name)
        return Event.find({name: new RegExp(queries.name, 'i')}).lean()
    else
        return Event.find({}).lean()
}

function getById(id){
    return Event.findById(id).lean()
}

function getByName(input){
    // return Event.find({name: /^kodemia/}).lean()
    return Event.find({name: new RegExp(input, 'i')}).lean()
}

async function assignCarrier(eventId, indexItem, carrierName){
    const event = await Event.findById(eventId)
    event.items[indexItem].carrier = carrierName
    return event.save()
}

module.exports = {
    create,
    getAll,
    getById,
    getByName,
    assignCarrier
}
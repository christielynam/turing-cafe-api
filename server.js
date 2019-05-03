const express = require('express')
const cors = require('cors')
const shortid = require('shortid') 
const app = express()

app.use(express.json())
app.use(cors())

app.set('port', process.env.PORT || 3001)

app.locals.title = 'Turing Cafe Reservations'
app.locals.reservations = [
  {
    id: 1,
    name: 'Christie',
    date: '12/29',
    time: '5:45 pm',
    number: 4
  },
  {
    id: 2,
    name: 'Leta',
    date: '04/05',
    time: '6:30 pm',
    number: 5
  },
  {
    id: 3,
    name: 'Will',
    date: '05/15',
    time: '7:00 pm',
    number: 2
  },
  {
    id: 4,
    name: 'Eric',
    date: '05/30',
    time: '6:00 pm',
    number: 3
  },
  {
    id: 5,
    name: 'Travis',
    date: '08/22',
    time: '6:15 pm',
    number: 6
  },
  {
    id: 6,
    name: 'Pam',
    date: '09/08',
    time: '5:30 pm',
    number: 4
  },
  {
    id: 7,
    name: 'Robbie',
    date: '11/16',
    time: '6:00 pm',
    number: 3
  },
  {
    id: 8,
    name: 'Khalid',
    date: '01/25',
    time: '7:15 pm',
    number: 5
  }
]

const { reservations } = app.locals

app.get('/api/v1/reservations', (request, response) => {
  return response.json(reservations)
});

app.post('/api/v1/reservations', (request, response) => {
  const { name, date, time, number } = request.body
  if(!name || !date || !time || !number) return res.status(422).json('Missing name, date, time, or number')
  const newResy = { id: shortid.generate(), name, date, time, number }
  reservations.push(newResy)
  response.status(201).json(newResy)
})

app.delete('/api/v1/reservations/:id', (request, response) => {
  const { id } = request.params
  let found = false
  const updatedReservations = reservations.filter(resy => {
    if(resy.id == id) {
      found = true
    }
    return resy.id != id
  })
  if(!found) return res.status(404).json('Reservation not found')
  reservations = updatedReservations
  return res.status(204).json(reservations)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
})
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import CardModel from './model/dbCards.js'

// app config
const app = express()
const PORT = process.env.PORT || 3001
const connection_url = 'mongodb+srv://admin:<password>@cluster0.kce9c.mongodb.net/tinderdb?retryWrites=true&w=majority'.replace('<password>', '2StIeuKeajNIfOHy')

// middlewares
app.use(express.json())
app.use(cors())

// db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

// api endpoints
app.get('/', (req, res) => {
  res.status(200).send('hello world')
})

app.post('/card', (req, res) => {
  console.log(req.body)
  const dbcard = req.body
  CardModel.create(dbcard, (err, data) => {
    if (err) res.status(500).send(err)
    else res.status(201).send(data)
  })
})

app.get('/card', (req, res) => {
  CardModel.find((err, data) => {
    if (err) res.status(500).send(err)
    else res.status(200).send(data)
  })
})

// listener
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))
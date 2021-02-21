import mongoose from 'mongoose'

const CardSchema = mongoose.Schema({
  name: String,
  url: String
})

export default mongoose.model('CardModel', CardSchema)

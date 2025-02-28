import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: String,
  active: {
    type: Boolean,
    required: true
  }
})

export default mongoose.model('User', Schema)
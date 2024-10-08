import { Schema, model } from 'mongoose'

const departmentSchema = new Schema({
  name: {
    type: String,
    required: [true, '請輸入部門名稱'],
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('departments', departmentSchema)

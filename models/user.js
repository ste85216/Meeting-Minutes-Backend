import { Schema, model, Error, ObjectId } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole.js'

const schema = new Schema({
  email: {
    type: String,
    required: [true, '請輸入使用者電子郵件'],
    unique: true,
    validate: [validator.isEmail, '使用者電子郵件格式不正確'],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, '請輸入使用者密碼']
  },
  tokens: {
    type: [String]
  },
  name: {
    type: String,
    required: [true, '請輸入使用者姓名']
  },
  role: {
    type: Number,
    default: UserRole.USER
  },
  avatar: {
    type: String,
    default: 'https://gravatar.com/avatar?d=identicon' // ��設使用 Gravatar
  },
  userId: {
    type: String,
    unique: true
  },
  department: {
    type: ObjectId,
    ref: 'departments',
    default: null
  }
}, {
  timestamps: true, // 使用者帳號建立時間、更新時間
  versionKey: false
})

schema.pre('save', function (next) {
  const user = this // this 指向 User model
  if (user.isModified('password')) {
    if (user.password.length < 8) {
      const error = new Error.ValidationError()
      error.addError('password', new Error.ValidatorError({ message: '使用者密碼長度不符' }))
      next(error)
      return
    } else {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  next()
})

export default model('users', schema)

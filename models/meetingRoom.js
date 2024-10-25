import { Schema, model } from 'mongoose'

const meetingRoomSchema = new Schema({
  roomName: {
    type: String,
    required: [true, '請輸入會議室名稱']
  },
  roomId: {
    type: String,
    unique: true
  },
  capacity: {
    type: Number,
    required: [true, '請輸入會議室可容納人數']
  },
  location: {
    type: String,
    required: [true, '請輸入會議室位置']
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('meetingRooms', meetingRoomSchema)

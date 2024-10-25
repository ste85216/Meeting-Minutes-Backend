import MeetingRoom from '../models/meetingRoom.js'
import { StatusCodes } from 'http-status-codes'
import Sequence from '../models/sequence.js'

// 用於生成指定名稱的序列
const getNextSequence = async (name) => {
  const sequence = await Sequence.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  )
  return sequence.value
}

// 新增會議室
export const create = async (req, res) => {
  try {
    const roomSequenceValue = await getNextSequence('meetingRoom') // 使用 'meetingRoom' 序列
    const roomId = `room-${String(roomSequenceValue).padStart(3, '0')}`

    const meetingRoom = await MeetingRoom.create({
      ...req.body,
      roomId
    })

    res.status(StatusCodes.OK).json({
      success: true,
      message: '會議室創建成功',
      result: meetingRoom
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '創建會議室時發生錯誤',
      error: error.message
    })
  }
}

// 編輯會議室
export const edit = async (req, res) => {
  try {
    const { roomName, capacity, location, description } = req.body

    const meetingRoom = await MeetingRoom.findByIdAndUpdate(
      req.params.id,
      { roomName, capacity, location, description },
      { new: true } // 返回更新後的資料
    )

    if (!meetingRoom) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到該會議室'
      })
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: '會議室更新成功',
      result: meetingRoom
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '更新會議室時發生錯誤',
      error: error.message
    })
  }
}

// 獲取所有會議室
export const getAll = async (req, res) => {
  try {
    const meetingRooms = await MeetingRoom.find()

    res.status(StatusCodes.OK).json({
      success: true,
      message: '獲取會議室列表成功',
      result: meetingRooms
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '獲取會議室列表時發生錯誤',
      error: error.message
    })
  }
}

// 刪除會議室
export const remove = async (req, res) => {
  try {
    const meetingRoom = await MeetingRoom.findByIdAndDelete(req.params.id)

    if (!meetingRoom) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到該會議室'
      })
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: '會議室刪除成功'
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '刪除會議室時發生錯誤',
      error: error.message
    })
  }
}

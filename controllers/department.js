import Department from '../models/department.js'
import { StatusCodes } from 'http-status-codes'
import User from '../models/user.js'

export const create = async (req, res) => {
  try {
    const department = await Department.create({ name: req.body.name })
    res.status(StatusCodes.OK).json({
      success: true,
      message: '部門創建成功',
      result: department
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '創建部門時發生錯誤'
    })
  }
}

export const edit = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    res.status(StatusCodes.OK).json({
      success: true,
      message: '部門更新成功',
      result: department
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '更新部門時發生錯誤'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const department = await Department.find() // 查詢所有部門
    res.status(StatusCodes.OK).json({
      success: true,
      message: '獲取部門列表成功',
      result: department
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '獲取部門列表時發生錯誤'
    })
  }
}

export const remove = async (req, res) => {
  try {
    // 刪除部門
    await Department.findByIdAndDelete(req.params.id)

    // 將所有與此部門相關聯的使用者的 department 設置為 null
    await User.updateMany({ department: req.params.id }, { department: null })

    res.status(StatusCodes.OK).json({
      success: true,
      message: '部門刪除成功，所有相關使用者的部門已設為空'
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '刪除部門時發生錯誤'
    })
  }
}

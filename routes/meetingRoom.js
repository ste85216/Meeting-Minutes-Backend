import { Router } from 'express'
import { create, edit, remove, getAll } from '../controllers/meetingRoom.js' // 引入剛寫好的控制器
import admin from '../middlewares/admin.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

// 創建會議室（只有管理員可以創建）
router.post('/', auth.jwt, admin, create)

// 編輯會議室（只有管理員可以編輯）
router.patch('/:id', auth.jwt, admin, edit)

// 獲取所有會議室（管理員可以查看所有會議室）
router.get('/all', auth.jwt, admin, getAll)

// 刪除會議室（只有管理員可以刪除）
router.delete('/:id', auth.jwt, admin, remove)

export default router

import { Router } from 'express'
import { create, edit, remove, getAll } from '../controllers/department.js'
import admin from '../middlewares/admin.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

// 創建部門（只有管理員可以創建）
router.post('/', auth.jwt, admin, create)

// 編輯部門（只有管理員可以編輯）
router.patch('/:id', auth.jwt, admin, edit)

router.get('/all', auth.jwt, admin, getAll)

// 刪除部門（只有管理員可以刪除）
router.delete('/:id', auth.jwt, admin, remove)

export default router

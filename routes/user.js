import { Router } from 'express'
import { create, getAll, edit, login, extend, logout, profile, googleCallback } from '../controllers/user.js'
import admin from '../middlewares/admin.js'
import * as auth from '../middlewares/auth.js'
import passport from 'passport'

const router = Router()

router.post('/login', auth.login, login)
router.post('/', create)
router.patch('/extend', auth.jwt, extend)
router.get('/all', auth.jwt, admin, getAll)
router.get('/profile', auth.jwt, profile)
router.delete('/logout', auth.jwt, logout)

// 新增 Google 登入路由
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', auth.googleLogin, googleCallback) // 引入 googleLogin 和 googleCallback

// router.get('/:id', auth.jwt, getId)
router.patch('/:id', auth.jwt, admin, edit)
// router.delete('/:id', auth.jwt, admin, remove)
export default router

import { Router } from 'express'
import { create, getAll, edit, login, extend, logout, profile } from '../controllers/user.js'
import admin from '../middlewares/admin.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

router.post('/login', auth.login, login)
router.post('/', create)
router.patch('/extend', auth.jwt, extend)
router.get('/all', auth.jwt, admin, getAll)
router.get('/profile', auth.jwt, profile)
router.delete('/logout', auth.jwt, logout)
// router.get('/:id', auth.jwt, getId)
router.patch('/:id', auth.jwt, admin, edit)
// router.delete('/:id', auth.jwt, admin, remove)
export default router

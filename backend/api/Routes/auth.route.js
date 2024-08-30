import express from 'express'
import { LogOut, Register, SignIn } from '../Controllers/auth.controller.js'

const router = express.Router()


router.post('/register', Register)
router.post('/signin', SignIn)
router.post('/logout', LogOut)

export default router
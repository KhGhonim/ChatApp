import express from 'express'
import { Register, SignIn } from '../Controllers/auth.controller.js'

const router = express.Router()


router.post('/register', Register)
router.post('/signin', SignIn)

export default router
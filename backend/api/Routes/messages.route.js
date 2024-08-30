import express from 'express'
import { GetMessages, SendMessage } from '../Controllers/messages.controller.js'
import JWTverifier from '../../utils/JWTverifier.js'

const router = express.Router()


router.post('/sendMessage/:id', JWTverifier, SendMessage )
router.get('/getMessages/:id', JWTverifier, GetMessages)

export default router
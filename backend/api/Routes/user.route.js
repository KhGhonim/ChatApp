import express from 'express'
import JWTverifier from '../../utils/JWTverifier.js'
import { GetUsersForSideBar, SearchUsers } from '../Controllers/user.controller.js'

const router = express.Router()

router.get('/getUsers', JWTverifier, GetUsersForSideBar)
router.get('/search', JWTverifier, SearchUsers)


export default router
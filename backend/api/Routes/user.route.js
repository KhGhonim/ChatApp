import express from 'express'
import JWTverifier from '../../utils/JWTverifier.js'
import { GetUsersForSideBar, SearchUsers, UpdateProfile, uploadMiddleware } from '../Controllers/user.controller.js'

const router = express.Router()

router.get('/getUsers', JWTverifier, GetUsersForSideBar)
router.get('/search', JWTverifier, SearchUsers)
router.put('/updateProfile', JWTverifier, uploadMiddleware, UpdateProfile)


export default router
import express from "express"
import { login, signup } from "../controls/authControl.js"
import uploadImage from "../middleware/uploadimage.js"

const router = express.Router() 

//user register
router.post('/register',uploadImage,  signup)

//user login
router.post('/Login', login)


export default router;
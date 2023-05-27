const express = require('express');
const { RecoverVerifyEmail, RecoverResetPass, RecoverVerifyOTP } = require('../controllers/users/OTPController');
const router = express.Router()


router.get('/RecoverVerifyEmail/:email',RecoverVerifyEmail)
router.get('/RecoverVerifyOTP/:email/:otp',RecoverVerifyOTP)
router.post('/RecoverResetPass',RecoverResetPass)





module.exports = router ;
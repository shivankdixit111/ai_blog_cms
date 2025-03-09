const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { loginSchema, signUpSchema } = require('../validators/auth-validator');
const { validate } = require('../middlewares/validate-middlewar');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/register', validate(signUpSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.get('/', authMiddleware, authController.getCurrentUser)

module.exports = router;
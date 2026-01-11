const router = require('express').Router();
const { registerUser, loginUser } = require('../controller/logics');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
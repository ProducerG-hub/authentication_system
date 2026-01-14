const router = require('express').Router();
const { registerUser, loginUser, update_User } = require('../controller/logics');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update/:id', update_User);

module.exports = router;
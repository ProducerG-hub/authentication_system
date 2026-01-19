const router = require('express').Router();
const { registerUser, loginUser, update_User, delete_User, find_user } = require('../controller/logics');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update/:id', update_User);
router.post('/delete/:id',delete_User)
router.post('/find/:id', find_user);

module.exports = router;
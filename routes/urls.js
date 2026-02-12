const router = require('express').Router();
const { registerUser, loginUser, update_User, delete_User, find_user } = require('../controller/logics');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update/:id', isAuthenticated,isAdmin, update_User);
router.post('/delete/:id', isAuthenticated, isAdmin, delete_User)
router.post('/find/:id', isAuthenticated, find_user);

module.exports = router;
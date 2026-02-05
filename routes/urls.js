const router = require('express').Router();
const { registerUser, loginUser, update_User, delete_User, find_user } = require('../controller/logics');

router.get('/', (req, res) => {
    res.send(` Welcome to User Authentication API which is built using Nodejs, Expressjs, and PostgreSQL
        This API allows you to register, login, update, delete, and find users in the PostgreSQL database.
        Deveoloper: Mlue Technologies`);
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update/:id', update_User);
router.post('/delete/:id',delete_User)
router.post('/find/:id', find_user);

module.exports = router;
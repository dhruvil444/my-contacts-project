const express = require('express');
const { register, getContacts, login, getUsers } = require('../controllers/adminController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();
// router.use(validateToken);
router.get("/get-contacts", validateToken, getContacts);

router.post("/register", register);
router.post('/login', login);
router.get('/get-users', validateToken, getUsers);
router.post('/update-users', validateToken, getUsers);
// router.route('/register').post(register);


module.exports = router;
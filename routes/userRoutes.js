const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();


// const register = (req, res) => {
//     res.status(200).json({ title: "Ok" });
// }

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/current", validateToken, currentUser);


module.exports = router;    
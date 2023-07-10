const Router = require('express');
const router = new Router;
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

router.post("/registration",UserController.registration)
router.post("/login",UserController.authorization)
router.get("/auth",authMiddleware,UserController.check)
router.put("/update",UserController.update)


module.exports = router
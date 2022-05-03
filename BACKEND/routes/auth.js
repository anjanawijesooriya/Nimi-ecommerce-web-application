const router = require("express").Router();

const { register, login, forgotpassword, resetpassword, registerStaff, getData, deleteUser, getUser, editUser } = require("../controllers/auth");

//below routes map the controllers
router.route("/register").post(register); //call the auth in controllers

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/passwordreset/:resetToken").put(resetpassword);

router.route("/registerStaff").post(registerStaff);

router.route("/get").get(getData);

router.route("/delete/:id").delete(deleteUser);

router.route("/get/:id").get(getUser);

router.route("/update/:id").put(editUser);

module.exports = router;
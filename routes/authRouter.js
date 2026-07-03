const { Router } = require("express");
const passport = require("passport");
const usersController = require("../controllers/usersController.js");
const authRouter = Router();

authRouter.get("/", (req, res) => {
    res.render("index", {
        user: req.user,
    });
});

authRouter.get("/login", (req, res) => {
    res.render("log-in");
});

authRouter.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/folders",
        failureRedirect: "/",
    }),
);

authRouter.get("/signup", (req, res) => {
    res.render("sign-up");
});

authRouter.post("/signup", usersController.createUser);

module.exports = authRouter;

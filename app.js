require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("./lib/prisma.js");
const usersController = require("./controllers/usersController.js");
const db = require("./db/queries.js");

const app = express();
// EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// Session details
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(passport.session());
// For serving CSS
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.fetchUser(username);
            console.log("User logged in: ", user);

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(done, user);
        } catch (error) {
            return done(error);
        }
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.fetchUser(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Routes

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/login", (req, res) => {
    res.render("log-in");
});
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
    }),
);
app.get("/signup", (req, res) => {
    res.render("sign-up");
});
app.post("/signup", usersController.createUser);

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
});

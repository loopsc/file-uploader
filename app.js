require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const usersController = require("./controllers/usersController");
const messagesController = require("./controllers/messagesController");
const db = require("./db/queries");

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

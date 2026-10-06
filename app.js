require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("./generated/prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const db = require("./db/queries.js");
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
const app = express();

// EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Controllers
const usersController = require("./controllers/usersController.js");

// Routers
const authRouter = require("./routes/authRouter.js");
const fileRouter = require("./routes/fileRouter.js");

// For serving CSS
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Session details
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    }),
);
app.use(passport.session());
app.use((req, res, next) => {
    if (req.user) {
        res.locals.links = [
            { href: "/folders", title: "View Folders" },
            { href: "/folders/create-folder", title: "New Folder" },
            { href: "/signout", title: "Sign Out" },
        ];
    } else {
        res.locals.links = [
            { href: "/", title: "Home" },
            { href: "/login", title: "Log In" },
            { href: "/signup", title: "Sign Up" },
        ];
    }

    next();
});

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.fetchUserByUsername(username);

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
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
        const user = await db.fetchUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Routes
app.use("/", authRouter);
app.use("/folders", fileRouter);

app.listen(3000, (err) => {
    console.log("Server Live!");
    if (err) {
        console.log(err);
    }
});

// import express from 'express'
// import "dotenv/config";
// import session from "express-session";
// import Hello from "./Hello.js"
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
// import db from "./Kambaz/Database/index.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
// const app = express();
// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
// }));
// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kambaz",
//     resave: false,
//     saveUninitialized: false,
// };
// if (process.env.SERVER_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.SERVER_URL,
//     };
// }
// app.use(session(sessionOptions));
// app.use(express.json());
// UserRoutes(app,db);
// Lab5(app)
// Hello(app)
// app.listen(process.env.PORT || 4000)

// import express from 'express';
// import "dotenv/config";
// import session from "express-session";
// import Hello from "./Hello.js";
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
// import db from "./Kambaz/Database/index.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
//
// const app = express();
//
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
// }));
//
// app.use(express.json());
//
// app.use(session({
//     secret: process.env.SESSION_SECRET || "kambaz",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false,  // must be false on localhost (no https)
//         sameSite: "lax" // lax works for same-domain subports
//     },
// }));
//
// UserRoutes(app, db);
// Lab5(app);
// Hello(app);
//
// app.listen(process.env.PORT || 4000, () => {
//     console.log(`Server running on port ${process.env.PORT || 4000}`);
// });


import express from 'express';
import "dotenv/config";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import CoursesRoutes from "./Kambaz/Courses/routes.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;


app.use(cors({
    credentials: true,
    // Use the client URL environment variable in production, otherwise default to localhost
    origin: isProduction
        ? process.env.CLIENT_URL || "http://localhost:3000"
        : "http://localhost:3000",
}));


app.use(express.json());


const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,proxy: isProduction,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        domain: isProduction ? process.env.SERVER_DOMAIN : undefined,
    },
};

if (!isProduction) {
    sessionOptions.cookie.secure = false;
}

app.use(session(sessionOptions));


UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
CoursesRoutes(app, db);
Lab5(app);
Hello(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode.`);
});
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
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({
    origin: clientUrl,
    credentials: true,
}));

app.use(express.json());

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    proxy: isProduction,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    },
};

app.use(session(sessionOptions));

UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
CoursesRoutes(app, db);
EnrollmentsRoutes(app, db);
AssignmentsRoutes(app, db);
Lab5(app);
Hello(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode.`);
});


// import express from 'express';
// import "dotenv/config";
// import session from "express-session";
// import Hello from "./Hello.js";
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// import db from "./Kambaz/Database/index.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import ModuleRoutes from "./Kambaz/Modules/routes.js";
// import CoursesRoutes from "./Kambaz/Courses/routes.js";
// import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
// import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
//
// const app = express();
//
// const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;
//
//
// app.use(cors({
//     credentials: true,
//     origin: isProduction
//         ? process.env.CLIENT_URL || "http://localhost:3000"
//         : "http://localhost:3000",
// }));
//
//
// app.use(express.json());
//
//
// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kambaz",
//     resave: false,
//     saveUninitialized: false,proxy: isProduction,
//     cookie: {
//         httpOnly: true,
//         secure: isProduction,
//         sameSite: isProduction ? "none" : "lax",
//         domain: isProduction ? process.env.SERVER_DOMAIN : undefined,
//     },
// };
//
// if (!isProduction) {
//     sessionOptions.cookie.secure = false;
// }
//
// app.use(session(sessionOptions));
//
//
// UserRoutes(app, db);
// CourseRoutes(app, db);
// ModuleRoutes(app, db);
// CoursesRoutes(app, db);
// EnrollmentsRoutes(app, db);
// AssignmentsRoutes(app, db);
// Lab5(app);
// Hello(app);
//
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode.`);
// });


// import "dotenv/config";
// import session from "express-session";
// import express from "express";
// import Hello from "./hello.js";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// import ModulesRoutes from "./Kambaz/Modules/routes.js";
// import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
// import db from "./Kambaz/Database/index.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import cors from "cors";
// import Lab5 from "./Lab5/index.js";
//
// const app = express();
//
// app.use(
//     cors({
//         credentials: true,
//         origin: process.env.CLIENT_URL || "http://localhost:3000",
//     })
// );
//
// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kambaz",
//     resave: false,
//     saveUninitialized: false,
// };
//
// if (process.env.SERVER_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.SERVER_URL,
//     };
// }
//
// app.use(session(sessionOptions));
// app.use(express.json());
// UserRoutes(app, db);
// CourseRoutes(app, db);
// ModulesRoutes(app, db);
// AssignmentsRoutes(app, db);
//
// Lab5(app);
// Hello(app);
//
// app.listen(process.env.PORT||4000);


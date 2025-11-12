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


const rawClientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const clientUrl = rawClientUrl.trim();

const allowedOrigin = clientUrl; // Use the trimmed value

app.use(cors({
    origin: allowedOrigin,
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
        domain: isProduction ? undefined : undefined,
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



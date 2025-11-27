import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    app.post("/api/users/:userId/courses/:courseId/enroll", async (req, res) => {
        const { userId, courseId } = req.params;
        const enrollment = await dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
    });

    app.delete("/api/users/:userId/courses/:courseId/unenroll", async (req, res) => {
        const { userId, courseId } = req.params;
        const result = await dao.unenrollUserFromCourse(userId, courseId);
        res.json(result);
    });

    app.get("/api/users/:userId/enrollments", async (req, res) => {
        const { userId } = req.params;
        const enrollments = await dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    });
    app.get("/api/users/enrollments/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const results = await dao.findEnrollmentsForCourse(courseId);
        res.json(results);
    });
}

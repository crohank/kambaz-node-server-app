import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
        res.json(assignments);
    });

    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const assignment = await dao.findAssignmentById(req.params.assignmentId);
        if (!assignment) return res.sendStatus(404);
        res.json(assignment);
    });

    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const assignment = await dao.createAssignmentForCourse(req.params.courseId, req.body);
        res.json(assignment);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const status = await dao.updateAssignment(req.params.assignmentId, req.body);
        res.json(status);
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const status = await dao.deleteAssignment(req.params.assignmentId);
        res.json(status);
    });
}

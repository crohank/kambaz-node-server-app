import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
    const dao = AssignmentsDao(db);

    const findAssignmentsForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const findAssignmentById = (req, res) => {
        const { assignmentId } = req.params;
        const assignment = dao.findAssignmentById(assignmentId);
        if (!assignment) return res.status(404).send({ error: "Not found" });
        res.json(assignment);
    };

    const createAssignmentForCourse = (req, res) => {
        const { courseId } = req.params;
        const newAssignment = dao.createAssignmentForCourse({
            ...req.body,
            course: courseId,
        });
        res.json(newAssignment);
    };

    const deleteAssignment = (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        res.json(status);
    };

    const updateAssignment = (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.updateAssignment(assignmentId, req.body);
        res.json(status);
    };

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
}

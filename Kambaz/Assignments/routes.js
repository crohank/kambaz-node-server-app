import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    const findAssignmentsForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const findAssignmentById = async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        if (!assignment) return res.status(404).send({ error: "Not found" });
        res.json(assignment);
    };

    const createAssignmentForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignment = await dao.createAssignmentForCourse(courseId, req.body);
        res.json(assignment);
    };

    const deleteAssignment = async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.json(status);
    };

    const updateAssignment = async (req, res) => {
        const { assignmentId } = req.params;
        const updatedAssignment = await dao.updateAssignment(assignmentId, req.body);
        if (!updatedAssignment) return res.status(404).send({ error: "Not found" });
        res.json(updatedAssignment);
    };

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
}

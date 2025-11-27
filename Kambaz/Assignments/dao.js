import AssignmentModel from "./model.js";

export default function AssignmentsDao() {

    const findAssignmentsForCourse = (courseId) => {
        return AssignmentModel.find({ course: courseId });
    };

    const findAssignmentById = (assignmentId) => {
        return AssignmentModel.findById(assignmentId);
    };

    const createAssignmentForCourse = (courseId, assignment) => {
        return AssignmentModel.create({
            ...assignment,
            course: courseId,
        });
    };

    const deleteAssignment = (assignmentId) => {
        return AssignmentModel.deleteOne({ _id: assignmentId });
    };

    const updateAssignment = (assignmentId, updates) => {
        return AssignmentModel.updateOne(
            { _id: assignmentId },
            { $set: updates }
        );
    };

    return {
        findAssignmentsForCourse,
        findAssignmentById,
        createAssignmentForCourse,
        deleteAssignment,
        updateAssignment,
    };
}

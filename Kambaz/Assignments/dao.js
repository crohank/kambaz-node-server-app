import AssignmentModel from "./model.js";

export default function AssignmentsDao() {

    const normalize = (doc) => {
        const obj = doc.toObject();
        obj._id = obj._id.toString();
        return obj;
    };

    const findAssignmentsForCourse = async (courseId) => {
        const docs = await AssignmentModel.find({ course: courseId });
        return docs.map(normalize);
    };

    const findAssignmentById = async (assignmentId) => {
        const doc = await AssignmentModel.findById(assignmentId);
        return doc ? normalize(doc) : null;
    };

    const createAssignmentForCourse = async (courseId, assignment) => {
        const doc = await AssignmentModel.create({
            ...assignment,
            course: courseId
        });
        return normalize(doc);
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

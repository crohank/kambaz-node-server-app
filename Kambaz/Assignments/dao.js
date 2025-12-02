import AssignmentModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao() {

    const findAssignmentsForCourse = (courseId) => {
        return AssignmentModel.find({ course: courseId });
    };

    const findAssignmentById = (assignmentId) => {
        return AssignmentModel.findById(assignmentId);
    };

    const createAssignmentForCourse = (courseId, assignment) => {
        const newAssignment = {
            ...assignment,
            _id: assignment._id || uuidv4(),
            course: courseId,
        };
        return AssignmentModel.create(newAssignment);
    };

    const deleteAssignment = (assignmentId) => {
        return AssignmentModel.deleteOne({ _id: assignmentId });
    };

    const updateAssignment = async (assignmentId, updates) => {

        const { _id, ...updateFields } = updates;
        await AssignmentModel.updateOne(
            { _id: assignmentId },
            { $set: updateFields }
        );

        return AssignmentModel.findById(assignmentId);
    };

    return {
        findAssignmentsForCourse,
        findAssignmentById,
        createAssignmentForCourse,
        deleteAssignment,
        updateAssignment,
    };
}

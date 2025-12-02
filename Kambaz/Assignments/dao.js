// import AssignmentModel from "./model.js";
//
// export default function AssignmentsDao() {
//
//     const findAssignmentsForCourse = (courseId) => {
//         return AssignmentModel.find({ course: courseId });
//     };
//
//     const findAssignmentById = (assignmentId) => {
//         return AssignmentModel.findById(assignmentId);
//     };
//
//     const createAssignmentForCourse = (courseId, assignment) => {
//         return AssignmentModel.create({
//             ...assignment,
//             course: courseId,
//         });
//     };
//
//     const deleteAssignment = (assignmentId) => {
//         return AssignmentModel.deleteOne({ _id: assignmentId });
//     };
//
//     const updateAssignment = (assignmentId, updates) => {
//         return AssignmentModel.updateOne(
//             { _id: assignmentId },
//             { $set: updates }
//         );
//     };
//
//     return {
//         findAssignmentsForCourse,
//         findAssignmentById,
//         createAssignmentForCourse,
//         deleteAssignment,
//         updateAssignment,
//     };
// }

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
        // Remove _id from updates to prevent conflicts
        const { _id, ...updateFields } = updates;
        await AssignmentModel.updateOne(
            { _id: assignmentId },
            { $set: updateFields }
        );
        // Return the updated document
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

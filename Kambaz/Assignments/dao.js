import { v4 as uuidv4 } from "uuid";
import dbAssignments from "../Database/assignments.js";

export default function AssignmentsDao(db) {
    let assignments = [...dbAssignments];

    const findAssignmentsForCourse = (courseId) => {
        return assignments.filter((a) => a.course === courseId);
    };

    const createAssignmentForCourse = (assignment) => {
        const newAssignment = { ...assignment, _id: uuidv4() };
        assignments = [...assignments, newAssignment];
        return newAssignment;
    };

    const deleteAssignment = (assignmentId) => {
        const before = assignments.length;
        assignments = assignments.filter((a) => a._id !== assignmentId);
        return { deletedCount: before - assignments.length };
    };

    const updateAssignment = (assignmentId, updates) => {
        assignments = assignments.map((a) =>
            a._id === assignmentId ? { ...a, ...updates } : a
        );
        return { updated: true };
    };

    const findAssignmentById = (assignmentId) =>
        assignments.find((a) => a._id === assignmentId);

    return {
        findAssignmentsForCourse,
        createAssignmentForCourse,
        deleteAssignment,
        updateAssignment,
        findAssignmentById,
    };
}

import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
    const { enrollments } = db;

    function enrollUserInCourse(userId, courseId) {
        const exists = enrollments.find(
            (e) => e.user === userId && e.course === courseId
        );
        if (exists) return exists;
        const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
        enrollments.push(newEnrollment);
        return newEnrollment;
    }

    function unenrollUserFromCourse(userId, courseId) {
        const index = enrollments.findIndex(
            (e) => e.user === userId && e.course === courseId
        );
        if (index !== -1) enrollments.splice(index, 1);
        return { status: "unenrolled" };
    }

    function findEnrollmentsForUser(userId) {
        return enrollments.filter((e) => e.user === userId);
    }

    return { enrollUserInCourse, unenrollUserFromCourse, findEnrollmentsForUser };
}

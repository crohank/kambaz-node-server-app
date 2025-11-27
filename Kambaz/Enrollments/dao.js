import model from "./model.js";

export default function EnrollmentsDao(db) {
    async function findEnrollmentsForUser(userId) {
        const results = await model.find({ user: userId });
        return results.map(e => ({
            _id: e._id.toString(),
            user: e.user.toString(),
            course: e.course.toString()
        }));
    }

    function enrollUserInCourse(userId, courseId) {
        return model.create({
            _id: `${userId}-${courseId}`,
            user: userId,
            course: courseId
        });
    }

    function unenrollUserFromCourse(user, course) {
        return model.deleteOne({ user, course });
    }

    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }
    function findEnrollmentsForCourse(courseId) {
        return model.find({ course: courseId });
    }


    return {
        findEnrollmentsForUser,
        enrollUserInCourse,
        unenrollUserFromCourse,
        unenrollAllUsersFromCourse,
        findEnrollmentsForCourse,
    };
}

import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";

export default function ModulesDao(db) {
    async function findModulesForCourse(courseId) {
        const course = await model.findById(courseId);
        return course.modules;
    }

    async function createModule(courseId, module) {
        const newModule = { ...module, _id: uuidv4() };
        await model.updateOne(
            { _id: courseId },
            { $push: { modules: newModule } }
        );
        return newModule;
    }

    async function deleteModule(courseId, moduleId) {
        const status = await model.updateOne(
            { _id: courseId },
            { $pull: { modules: { _id: moduleId } } }
        );
        return status;
    }

    async function updateModule(courseId, moduleId, moduleUpdates) {
        const status = await model.updateOne(
            { _id: courseId, "modules._id": moduleId },
            { $set: { "modules.$": { ...moduleUpdates, _id: moduleId } } }
        );
        return status;
    }

    return {
        findModulesForCourse,
        createModule,
        deleteModule,
        updateModule,
    };
}

const moduleData = {
    id: "M101",
    name: "React Module",
    description: "Learning React Basics",
    course: "CS5610 Web Dev",
};

export default function WorkingWithModule(app) {
    const getModule = (req, res) => {
        res.json(moduleData);
    };

    const getModuleName = (req, res) => {
        res.json(moduleData.name);
    };

    const setModuleName = (req, res) => {
        const { newName } = req.params;
        moduleData.name = newName;
        res.json(moduleData);
    };

    const setModuleDescription = (req, res) => {
        const { newDesc } = req.params;
        moduleData.description = newDesc;
        res.json(moduleData);
    };

    app.get("/lab5/module", getModule);
    app.get("/lab5/module/name", getModuleName);
    app.get("/lab5/module/name/:newName", setModuleName);
    app.get("/lab5/module/description/:newDesc", setModuleDescription);
}

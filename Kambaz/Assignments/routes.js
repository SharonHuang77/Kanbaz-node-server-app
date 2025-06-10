import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  
  app.get("/api/assignments", (req, res) => {
    const assignments = assignmentsDao.findAllAssignments();
    res.send(assignments);
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(cid);
    res.send(assignments);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignmentData = {
      ...req.body,
      course: cid,
    };
    const newAssignment = assignmentsDao.createAssignment(assignmentData);
    res.send(newAssignment);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = assignmentsDao.updateAssignment(aid, assignmentUpdates);
    
    if (updatedAssignment) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Assignment not found" });
    }
  });


  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const result = assignmentsDao.deleteAssignment(aid);
    res.sendStatus(200);
  });
}
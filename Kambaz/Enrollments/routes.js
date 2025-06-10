import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  
  app.get("/api/users/:userId/enrollments", (req, res) => {
    res.json(enrollmentsDao.findEnrollmentsByUser(req.params.userId));
  });

  app.post("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    
    // Check if already enrolled
    const existingEnrollment = enrollmentsDao.findEnrollment(userId, courseId);
    if (existingEnrollment) {
      // Return success instead of error if already enrolled
      return res.status(200).json({ 
        message: "Already enrolled", 
        enrollment: existingEnrollment 
      });
    }
    
    // Enroll user
    const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.status(201).json({ 
      message: "Enrolled successfully", 
      enrollment: newEnrollment 
    });
  });
  
  app.delete("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    enrollmentsDao.deleteEnrollment(userId, courseId);
    res.sendStatus(200);
  });
}
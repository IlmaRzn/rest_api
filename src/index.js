import  express  from "express";
import {z} from "zod"
import dotenv from "dotenv"
import database from "./db.js";


dotenv.config();
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];

const courseSchema = z.object({
  name: z.string().min(3),
});
app.get("/", (req, res) => {
  res.send("hello world!!!");
});

app.get("/api/courses", (req, res) => {
 const sql_query = `select * from courses.test`;
 database.query(sql_query, (err, result) => {
   if (err) throw err;
   res.send(result);
 });

});

app.post("/api/courses", (req, res) => {
  try{
    const  courseData = courseSchema.parse(req.body)
    const sql_query = 'INSERT INTO courses.test (name) VALUES (?)'
    database.query(sql_query,[courseData.name],(err, result)=>{
      if (err) throw err;
      const insertedCourse ={
        id: result.insertId,
        name:courseData.name,
      };
      res.send(insertedCourse)
    })
  } catch (error){
    res.status(400).send(error.errors)
  }
});


app.put("/api/courses/:id", (req, res) => {
try{
  const courseId = parseInt(req.params.id)
  const corseData = courseSchema.parse(req.body)
  const query = 'UPDATE courses.test Set name = ? WHERE idTest = ?';
  database.query(query,[corseData.name,courseId],(err,result)=>{
    if (err) {throw err}
    if (result.affectedRows === 0){
      res.status(404).send('the course with the given id was not found')

    return     
    }
    const updateCourse ={
    id: courseId,
    name:corseData.name,
  }
    res.send(updateCourse)
  })
  
}catch (error){
  res.status(400).send(error.errors)
}
});

app.delete("/api/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id)
  const query = 'DELETE FROM courses.test WHERE idTest =?'
  database.query(query,[courseId],(err,result)=>{
    if(err){
      throw err
    }
    if(result.affectedRows === 0){
      res.status(404).send("the course with the given id was not found");
      return
    }
    const deletedCourse={
      id: courseId,
    }
    res.send(deletedCourse)
  })
});

app.get("/api/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const query = "SELECT * FROM courses.test WHERE idTest = ?";

  database.query(query, [courseId], (err, results) => {
    if (err) {
      
      throw err;
    }

    if (results.length === 0) {
      res.status(404).send("The course with the given id was not found");
      return;
    }
    const course = results[0]; 
    res.send(course);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

export default app;

const express = require ('express');
const { z } = require ('zod')
require('dotenv').config();
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
})
app.get('/', (req,res)=>{
    res.send('hello world!!!');
});

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res) =>{
try{
  const courseData = courseSchema.parse(req.body)
  const course ={
    id: courses.length + 1,
    name: courseData.name,
  }
  courses.push(course)
  res.send(course)
}catch(error){
  res.status(400).send(error.errors)
}

})
app.put('/api/courses/:id', (req,res)=>{
  try{
    const course= courses.find((c) => c.id === parseInt
    (req.params.id))
    if(!course) res.status(404).send('the course eith the given id was not found')
    const courseData = courseSchema.parse(req.body)
  course.name = courseData.name
  res.send(course)
  }catch (error){
    res.status(400).send(error.errors)
  }
})

app.delete('/api/courses/:id', (req,res)=>{
     const course = courses.find((c) => c.id === parseInt(req.params.id));
     if (!course)
       res.status(404).send("the course with the given id was not found");

       const index = courses.indexOf(course);
       courses.splice(index, 1)
       res.send(course);
})

app.get('/api/courses/:id', (req,res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('the course with the given id was not found');
res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));


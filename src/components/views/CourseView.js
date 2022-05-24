import { Link } from "react-router-dom";

const CourseView = (props) => {
  const { course, handleChange, handleSubmit, removeCourse } = props;
  return (
    <div>
      <h1>{course.title}</h1>
      {course.instructor ? <Link to={`/instructor/${course.instructor.id}`}>{course.instructor.firstname + " " + course.instructor.lastname}</Link>: <h3>staff</h3>}
      <h2>{course.timeslot}</h2>
      <h2>{course.location}</h2>
      <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
          <label style= {{color:'#11153e', fontWeight: 'bold'}}>Title: </label>
          <input type="text" name="title" onChange ={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Timeslot: </label>
          <input type="text" name="timeslot" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Location: </label>
          <input type="text" name="location" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <button type="submit">
            Change
          </button>
          <br/>
          <br/>
        </form>
        <button onClick={()=> removeCourse()}>Delete</button>
    </div>
  );

};

export default CourseView;
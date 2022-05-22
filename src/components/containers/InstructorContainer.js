import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { instructor } from "../../store/reducers";
import { 
  fetchInstructorThunk,
  fetchAllCoursesThunk,
  editCourseThunk,
  deleteInstructorThunk,
  editInstructorThunk
} from "../../store/thunks";

import { InstructorView } from "../views";

class InstructorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      firstname: this.props.instructor.firstname,
      lastname: this.props.instructor.lastname,
      imageUrl: this.props.instructor.imageurl,
      department: this.props.instructor.department,
    };
  }
  
  componentDidMount() {
    //getting instructor ID from url
    this.props.fetchInstructor(this.props.match.params.id);
    this.props.fetchCourses();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    let instructor = {
        id: this.props.match.params.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        imageUrl: this.state.imageurl,
        department: this.state.department
    };
    
    await this.props.editInstructor(instructor);
    
    this.setState({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        department: this.state.department,
    });
    this.props.fetchInstructor(this.props.match.params.id);
}
  

  removeInstructor = async () =>  {
    await this.props.deleteInstructor(this.props.match.params.id);
    this.setState({redirect: true});
  }

  componentWillUnmount() {
    this.setState({redirect: false});
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/instructors`}/>)
    }
    return (
      <InstructorView 
        instructor={this.props.instructor}
        editCourse={this.props.editCourse}
        allCourses={this.props.allCourses}
        removeInstructor={this.removeInstructor}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    instructor: state.instructor,
    allCourses: state.allCourses,

  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchInstructor: (id) => dispatch(fetchInstructorThunk(id)),
    editCourse: (course) => dispatch(editCourseThunk(course)),
    fetchCourses: () => dispatch(fetchAllCoursesThunk()),
    deleteInstructor: (id) => dispatch(deleteInstructorThunk(id)),
    editInstructor: (instructor) => dispatch(editInstructorThunk(instructor)),
  };
};

export default connect(mapState, mapDispatch)(InstructorContainer);
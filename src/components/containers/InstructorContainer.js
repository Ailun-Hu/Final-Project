import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { 
  fetchInstructorThunk,
  fetchAllCoursesThunk,
  editCourseThunk,
  deleteInstructorThunk,
} from "../../store/thunks";

import { InstructorView } from "../views";

class InstructorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    //getting instructor ID from url
    this.props.fetchInstructor(this.props.match.params.id);
    this.props.fetchCourses();
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

  };
};

export default connect(mapState, mapDispatch)(InstructorContainer);
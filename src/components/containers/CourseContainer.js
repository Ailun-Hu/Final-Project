import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchCourseThunk, editCourseThunk, deleteCourseThunk } from "../../store/thunks";
import { CourseView } from "../views";


class CourseContainer extends Component {
  componentDidMount() {
    //getting course ID from url
    this.props.fetchCourse(this.props.match.params.id);
  }

  constructor(props){
    super(props);
    this.state = {
      title: this.props.course.title, 
      timeslot: this.props.course.timeslot,
      location: this.props.course.location, 
      redirect: false, 
    };
}

componentWillUnmount() {
  this.setState({redirect: false});
}

removeCourse = async () =>  {
  await this.props.deleteCourse(this.props.match.params.id);
  this.setState({redirect: true});
}

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  });
}

handleSubmit = async event => {
    event.preventDefault();

    let course = {
        id: this.props.course.id,
        title: this.state.title,
        timeslot: this.state.timeslot,
        location: this.state.location,
    };
    
    await this.props.editCourse(course);
    this.props.fetchCourse(this.props.match.params.id);
}

  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/courses`}/>)
    }
    return (
      <CourseView 
        course={this.props.course}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        removeCourse={this.removeCourse}
        
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    course: state.course,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchCourse: (id) => dispatch(fetchCourseThunk(id)),
    editCourse: (course) => dispatch(editCourseThunk(course)),
    deleteCourse: (id) => dispatch(deleteCourseThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(CourseContainer);
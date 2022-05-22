import * as at from "../actions/actionTypes";
import instructor from "./instructor";

// REDUCER;
const allInstructors = (state = [], action) => {
  switch (action.type) {
    case at.FETCH_ALL_INSTRUCTORS:
      return action.payload;
    case at.ADD_INSTRUCTOR:
      return [...state, action.payload]
    case at.DELETE_INSTRUCTOR:
      return state.filter(instructor => instructor.id!==action.payload);
    case at.EDIT_INSTRUCTOR:
      return state.map(instructor => { 
        return (
          instructor.id===action.payload.id ? action.payload : instructor
        );
      });
    default:
      return state;
  }
};

export default allInstructors;
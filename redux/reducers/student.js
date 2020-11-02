import actionTypes from '../actionTypes';


export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.LIST_STUDENT: {
            const setStudent = action.payload;
            state = setStudent;
            return state;
        }
        case actionTypes.ADD_STUDENT: {
            const newState = state;
            newState.push(action.payload);
            return newState;
        }
        case actionTypes.DELETE_STUDENT: {
            const removeStudentId = action.payload;
            const newState = state.filter(student => student.id !== removeStudentId.id);
            return newState;
        }
        case actionTypes.EDIT_STUDENT: {
            const editedStudent = action.payload;
            const newState = state.map(product => (
                product.id === editedStudent.id ? editedStudent : product
            ));
            return newState;
        }
        default:
            return state;
    }
}

import actionTypes from '../actionTypes';

export const listStudent = (record) => (
    {
        type: actionTypes.LIST_STUDENT,
        payload: record
    }
)

export const addStudent = (record) => (
    {
        type: actionTypes.ADD_STUDENT,
        payload: record
    }
)

export const editStudent = (record) => (
    {
        type: actionTypes.EDIT_STUDENT,
        payload: record
    }
)

export const deleteStudent = (record) => (
    {
        type: actionTypes.DELETE_STUDENT,
        payload: record
    }
)
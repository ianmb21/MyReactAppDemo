import EmployeeService from "../services/employeeService";
import { ACTION_TYPES_EMPLOYEE } from "./types";

const formatData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAll = () => dispatch => {
    EmployeeService.employee().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES_EMPLOYEE.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data)
    EmployeeService.employee().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES_EMPLOYEE.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data)
    EmployeeService.employee().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES_EMPLOYEE.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    EmployeeService.employee().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES_EMPLOYEE.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
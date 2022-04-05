import axios from "axios";
import authHeader from "./auth-header"

const baseUrl = "http://localhost:5110/api/"

export default {

    employee(url = baseUrl + 'Employee/') {
        return {
            fetchAll: () => axios.get(url, {headers: authHeader()}),
            fetchById: id => axios.get(url + id, {headers: authHeader()}),
            create: newRecord => axios.post(url, newRecord, {headers: authHeader()}),
            update: (id, updateRecord) => axios.put(url + id, updateRecord, {headers: authHeader()}),
            delete: id => axios.delete(url + id, {headers: authHeader()})
        }
    }
}
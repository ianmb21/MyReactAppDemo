import axios from "axios";

const baseUrl = "http://localhost:5110/api/Auth/"

class loginService {
    login(username, password) {
      return axios
        .post(baseUrl + "login/" + username + '/' + password)
        .then((response) => {
          if (response.data.jwtToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      return axios
        .post(baseUrl + "logout")
        .then(() => {
          localStorage.removeItem("user");
        });
    }
  }
  
  export default new loginService();

/* export default {

    userLogin(url = baseUrl + 'Auth/') {
        return {
            login: (username, password) => axios.post(url + "login", {username, password})
                .then((response) => {
                    if (response.data.jwtToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    }
            
                    return response.data;
                }),
            logout: () => axios.post(url + "logout")
                .then(() => {
                localStorage.removeItem("user");
                })
        }
    }
} */
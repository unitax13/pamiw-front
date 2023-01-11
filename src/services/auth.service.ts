import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  login(username: string, password: string) {
    return axios({
      method: "post",
      url: API_URL + "/login",
      withCredentials: false,
      data: {
        username,
        password,
      },
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  register(username: string, email: string, password: string) {
    return axios({
      method: "post",
      url: API_URL + "/register",
      withCredentials: false,
      data: {
        username,
        email,
        password,
      },
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }
}

export default new AuthService();

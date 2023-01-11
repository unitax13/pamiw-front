import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

class UserService {
  getAllMemos() {
    return axios.get(API_URL + "/memos", { headers: authHeader() });
  }

  getMe() {
    return axios.get(API_URL + "/users/me", { headers: authHeader() });
  }
}

export default new UserService();

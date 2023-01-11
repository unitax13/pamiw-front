import axios from "axios";
import qs from "qs";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/memos";

class MemoService {
  paramsSerializer = (params) => {
    console.log("Params serializer" + params);
    return qs.stringify(params, { arrayFormat: "repeat" });
  };

  edit(content: string, memoId: string) {
    return axios({
      method: "put",
      url: API_URL + "?" + this.paramsSerializer({ content, memoId }),
      withCredentials: false,
    }).then((response) => {
      return response.data;
    });
  }

  addNewMemo(content: string) {
    return axios({
      method: "post",
      url: API_URL,
      withCredentials: false,
      params: { content: content },
      headers: authHeader(),
    }).then((response) => {
      // console.log("headers: ", JSON.stringify(headers))
      return response.data;
    });
  }

  async put(content: string, memoId: string) {
    const response = await axios({
      method: "put",
      url: API_URL,
      withCredentials: false,
      params: { content: content, memoId: memoId },
      headers: authHeader(),
    });
    // console.log(response);
    return response.data;
  }

  async delete(memoId: string) {
    const response = await axios({
      method: "delete",
      url: API_URL,
      withCredentials: false,
      params: { memoId: memoId },
      headers: authHeader(),
    });
    // console.log(response);
    return response.data;
  }
}

export default new MemoService();

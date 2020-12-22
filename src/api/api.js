import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "d734b2e9-499a-4520-8779-b3c38f7c5878" }, // пароль к api
});

// Группируем методы в объект
export const userAPI = {
  getUser(pageSize = 10, currentPage = 1) {
    return instance
      .get(`users?count=${pageSize}&page=${currentPage}`)
      .then((response) => response.data);
  },
  follow(id) {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
  unfollow(id) {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },
};

export const profileAPI = {
  setUserProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getUserStatus(userId) {
    return instance.get(`profile/status/${userId}`).then((response) => response.data);
  },
  updateUserStatus(status) {
    return instance.put("/profile/status", { status: status }).then((response) => response.data);
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  login(email, password, rememberMe = false) {
    return instance
      .post(`auth/login`, { email, password, rememberMe })
      .then((response) => response);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response);
  },
};

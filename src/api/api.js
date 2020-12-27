import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "d734b2e9-499a-4520-8779-b3c38f7c5878" },
});

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
    return instance.put("profile/status", { status: status }).then((response) => response.data);
  },
  setUserAvatar(avatarFile) {
    let formData = new FormData();
    formData.append("image", avatarFile);
    return instance
      .put("profile/photo", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => response);
  },
  editBasicInfo(profile) {
    return instance.put("profile", profile).then((response) => response);
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  login(email, password, rememberMe = false, captcha) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => response);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response);
  },
};

export const securityAPI = {
  getCaptcha() {
    return instance.get("security/get-captcha-url");
  },
};

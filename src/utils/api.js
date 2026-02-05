// import axios from "axios";

// // 🔗 Base URL
// const API = axios.create({
//   baseURL: "http://localhost/youtube-clone-backend/api",
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// /* =========================
//    VIDEO APIs
// ========================= */

// // Upload Video
// export const uploadVideo = async (videoData) => {
//   const res = await API.post("/video/upload.php", videoData);
//   return res.data;
// };

// // Get All Videos
// export const getAllVideos = async () => {
//   const res = await API.get("/video/getAll.php");
//   return res.data;
// };

// // Get Trending Videos
// export const getTrendingVideos = async () => {
//   const res = await API.get("/video/trending.php");
//   return res.data;
// };

// // Get Video By ID
// export const getVideoById = async (id) => {
//   const res = await API.get(`/video/getById.php?id=${id}`);
//   return res.data;
// };

// // Get Videos By User
// export const getVideosByUser = async (userId) => {
//   const res = await API.get(`/video/getByUser.php?userId=${userId}`);
//   return res.data;
// };

// // Search Videos
// export const searchVideos = async (query) => {
//   const res = await API.get(`/video/search.php?q=${query}`);
//   return res.data;
// };

// // Like Video
// export const likeVideo = async (videoId, user) => {
//   const res = await API.post("/video/like.php", { videoId, user });
//   return res.data;
// };

// // Dislike Video
// export const dislikeVideo = async (videoId, user) => {
//   const res = await API.post("/video/dislike.php", { videoId, user });
//   return res.data;
// };

// // Add View
// export const addView = async (videoId) => {
//   const res = await API.post("/video/addView.php", { videoId });
//   return res.data;
// };

// /* =========================
//    USER APIs
// ========================= */

// // Signup
// export const signupUser = async (userData) => {
//   const res = await API.post("/auth/signup.php", userData);
//   return res.data;
// };

// // Login
// export const loginUser = async (loginData) => {
//   const res = await API.post("/auth/login.php", loginData);
//   return res.data;
// };

// // Get User Profile
// export const getUserProfile = async (userId) => {
//   const res = await API.get(`/user/getProfile.php?userId=${userId}`);
//   return res.data;
// };

// // Subscribe / Unsubscribe (toggle)
// export const toggleSubscribe = async (channelUserId, subscriber) => {
//   const res = await API.post("/user/subscribe.php", {
//     channelUserId,
//     subscriber
//   });
//   return res.data;
// };


import axios from "axios";
import { toast } from "react-hot-toast";

/* ===============================
   AXIOS INSTANCE
================================ */
const API = axios.create({
  baseURL: "http://localhost/video_app", // apna backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   UPLOAD VIDEO
================================ */
export const uploadVideo = async (data) => {
  try {
    const res = await API.post("/upload-video.php", data);
    toast.success(res.data.message || "Video uploaded successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Video upload failed");
    throw err;
  }
};

/* ===============================
   GET ALL VIDEOS
================================ */
export const getAllVideos = async () => {
  try {
    const res = await API.get("/get-all-videos.php");
    return res.data;
  } catch (err) {
    toast.error("Failed to fetch videos");
    throw err;
  }
};

/* ===============================
   GET TRENDING VIDEOS (by views)
================================ */
export const getTrendingVideos = async () => {
  try {
    const res = await API.get("/get-trending-videos.php");
    return res.data;
  } catch (err) {
    toast.error("Failed to load trending videos");
    throw err;
  }
};

/* ===============================
   GET VIDEO BY ID
================================ */
export const getVideoById = async (videoId) => {
  try {
    const res = await API.get(`/get-video-by-id.php?id=${videoId}`);
    return res.data;
  } catch (err) {
    toast.error("Video not found");
    throw err;
  }
};

/* ===============================
   GET USER VIDEOS
================================ */
export const getUserVideos = async (userId) => {
  try {
    const res = await API.get(`/get-user-videos.php?userId=${userId}`);
    return res.data;
  } catch (err) {
    toast.error("Failed to load user videos");
    throw err;
  }
};

/* ===============================
   SEARCH VIDEO
================================ */
export const searchVideos = async (query) => {
  try {
    const res = await API.get(`/search-video.php?q=${query}`);
    return res.data;
  } catch (err) {
    toast.error("Search failed");
    throw err;
  }
};

/* ===============================
   LIKE / DISLIKE VIDEO
================================ */
export const likeDislikeVideo = async (data) => {
  try {
    const res = await API.post("/like-dislike.php", data);
    toast.success(res.data.message);
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Action failed");
    throw err;
  }
};

/* ===============================
   ADD VIEW
================================ */
export const addView = async (videoId) => {
  try {
    const res = await API.post("/add-view.php", { videoId });
    return res.data;
  } catch (err) {
    console.log("View not added");
  }
};

/* ===============================
   SUBSCRIBE / UNSUBSCRIBE
================================ */
export const subscribeUser = async (data) => {
  try {
    const res = await API.post("/subscribe.php", data);
    toast.success(res.data.message);
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Subscribe failed");
    throw err;
  }
};

/* ===============================
   GET USER PROFILE
================================ */
export const getUserProfile = async (userId) => {
  try {
    const res = await API.get(`/get-user-profile.php?id=${userId}`);
    return res.data;
  } catch (err) {
    toast.error("Failed to load profile");
    throw err;
  }
};

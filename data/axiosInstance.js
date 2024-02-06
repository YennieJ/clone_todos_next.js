import axios from "axios";
import { auth } from "@/firebase/client";

const BASE_URL = process.env.NEXTAUTH_URL;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    // Firebase 인증 사용 토큰을 가져오는 로직
    const token = await auth.currentUser?.getIdToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 요청 헤더에 인증 토큰 추가
      config.headers["Cache-Control"] = "no-store";
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 직접 반환하여 사용할 수 있게 함
    return response;
  },
  (error) => {
    if (error.response?.status === 500) {
      console.log("axios error");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

import http from "@/utils/http";

export const getBannerAPI = async () => {
  return http({
    url: "/home/banner",
  });
};

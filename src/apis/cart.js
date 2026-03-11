import http from "@/utils/http";

export const getCartAPI = () => {
  return http({
    url: "/member/cart",
  });
};

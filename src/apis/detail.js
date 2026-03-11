import http from "@/utils/http";

/**
 * @description:获取商品详情
 * @param {string} id 分类id
 * @return {*}
 */
export const getDetailAPI = (id) => {
  return http({
    url: "/goods",
    params: {
      id,
    },
  });
};

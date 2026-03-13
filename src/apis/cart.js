import http from "@/utils/http";
import "element-plus/theme-chalk/el-message.css";

export const getCartAPI = () => {
  return http({
    url: "/member/cart",
  });
};

export const addCartAPI = ({ skuId, count }) => {
  return http({
    url: "/member/cart",
    method: "post",
    data: {
      skuId,
      count,
    },
  });
};

export const changeCartAPI = ({ id, selected, count }) => {
  return http({
    url: `/member/cart/${id}`,
    method: "PUT",
    data: {
      selected,
      count,
    },
  });
};

export const deleteCartAPI = (ids) => {
  return http({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};

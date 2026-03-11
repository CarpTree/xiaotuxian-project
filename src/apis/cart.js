import http from "@/utils/http";

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

export const checkAllCartAPI = ({ selected, ids }) => {
  return http({
    url: "/member/cart/selected",
    method: "PUT",
    data: {
      selected,
      ids,
    },
  });
};

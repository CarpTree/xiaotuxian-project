import http from "@/utils/http";
/**
 * 生成订单
 */
export const getCheckoutInfoAPI = () => {
  return http({
    url: "/member/order/pre",
  });
};
/**
 * 提交订单
 */
export const submitOrderAPI = (data) => {
  return http({
    url: "/member/order",
    method: "POST",
    data,
  });
};

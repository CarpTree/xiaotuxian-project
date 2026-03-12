import http from "@/utils/http";
/**
 * 生成订单
 */
export const getCheckoutInfoAPI = () => {
  return http({
    url: "/member/order/pre",
  });
};

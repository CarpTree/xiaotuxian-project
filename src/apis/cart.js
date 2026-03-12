import http from "@/utils/http";
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

export const getCartAPI = () => {
  return http({
    url: "/member/cart",
  });
};

export const addCartAPI = ({ skuId, count }) => {
  const userStore = useUserStore();
  const isLogin = ref(userStore.userInfo.token);
  if (!isLogin.value) {
    ElMessage.error("您尚未登录，请先登录");
    return;
  }
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

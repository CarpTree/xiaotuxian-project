//分类数据业务相关代码
import { getCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategory(route.params.id));
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id);
  });

  return {
    categoryData,
  };
}

// 轮播图相关代码
import { getBannerAPI } from "@/apis/home";
import { ref, onMounted } from "vue";

export function useBanner() {
  const bannerData = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: "2" });
    bannerData.value = res.result;
  };
  onMounted(() => {
    getBanner();
  });
  return {
    bannerData,
  };
}

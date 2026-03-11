import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const getCart = async () => {
      const res = await getCartAPI();
      cartList.value = res.result;
    };
    const sumNumber = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count * item.price, 0);
    });
    return { cartList, getCart, sumNumber };
  },
  {
    persist: true,
  },
);

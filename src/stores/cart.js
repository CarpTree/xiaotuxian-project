import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCartAPI, addCartAPI, changeCartAPI, deleteCartAPI, checkAllCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    //state
    const cartList = ref([]);
    //action
    const getCart = async () => {
      const res = await getCartAPI();
      cartList.value = res.result;
    };
    const addCart = async ({ skuId, count }) => {
      await addCartAPI({ skuId, count });
      getCart();
    };
    const changeCart = async ({ id, selected, count }) => {
      await changeCartAPI({ id, selected, count });
      getCart();
    };
    const deleteCart = async (ids) => {
      await deleteCartAPI(ids);
      getCart();
    };
    const checkAllCart = async ({ selected, ids }) => {
      await checkAllCartAPI({ selected, ids });
      getCart();
    };
    //computed
    const sumNumber = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count * item.price, 0);
    });

    return {
      cartList,
      getCart,
      addCart,
      changeCart,
      deleteCart,
      checkAllCart,
      sumNumber,
    };
  },
  {
    persist: true,
  },
);

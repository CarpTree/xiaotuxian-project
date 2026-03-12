import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCartAPI, addCartAPI, changeCartAPI, deleteCartAPI } from "@/apis/cart";

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
      await getCart();
    };
    const deleteCart = async (ids) => {
      await deleteCartAPI(ids);
      await getCart();
    };
    const changeCart = async ({ id, selected, count }) => {
      if (count <= 0) {
        await deleteCart([id]);
        return;
      }
      await changeCartAPI({ id, selected, count });
      await getCart();
    };

    const clearCart = () => {
      cartList.value = [];
    };

    //computed
    //总数
    const sumNumber = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count, 0);
    });
    const sumPrice = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count * item.price, 0);
    });
    //选中
    const selectedNumber = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.count, 0);
    });
    const selectedPrice = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.count * item.price, 0);
    });
    const isCheckAll = computed({
      // get：推导当前是否全选
      get() {
        if (sumNumber.value === 0) return false;
        return cartList.value.every((item) => item.selected === true);
      },
      set(newValue) {
        cartList.value.forEach(async (item) => {
          await changeCart({
            id: item.skuId,
            selected: newValue,
            count: item.count,
          });
          await getCart();
        });
      },
    });
    return {
      cartList,
      getCart,
      addCart,
      changeCart,
      deleteCart,
      clearCart,
      sumNumber,
      sumPrice,
      selectedNumber,
      selectedPrice,
      isCheckAll,
    };
  },
  {
    persist: true,
  },
);

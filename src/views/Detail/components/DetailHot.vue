<script setup>
import { fetchHotGoodsAPI } from "@/apis/detail";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  type: {
    type: Number,
    default: 1,
  },
});

const route = useRoute();

const hotGoods = ref([]);
const params = {
  id: route.params.id,
  type: props.type,
  limit: 3,
};
const getHotGoods = async () => {
  const res = await fetchHotGoodsAPI(params);
  hotGoods.value = res.result;
};
onMounted(() => getHotGoods());

const TITLEMAP = {
  1: "24小时热销榜",
  2: "周热销榜",
  3: "总热销榜",
};
const title = computed(() => TITLEMAP[props.type]);
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotGoods" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;
    transition: all 0.1s;
    &:hover {
      border: 3px solid rgb(0 0 0 / 20%);
    }

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>

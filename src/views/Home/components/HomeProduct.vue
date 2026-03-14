<script setup>
import HomePanel from "./HomePanel.vue";
import { getGoodAPI } from "@/apis/home";
import { onMounted, ref } from "vue";
import GoodsItem from "./GoodsItem.vue";
const goodsProduct = ref([]);
const getGood = async () => {
  const res = await getGoodAPI();
  goodsProduct.value = res.result;
};
onMounted(() => getGood());
</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" :to="`/category/${cate.id}`">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}区</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="good in cate.goods" :key="good.id">
            <RouterLink :to="`/detail/$good.id}`" class="goods-item">
              <GoodsItem :good="good"></GoodsItem>
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      overflow: hidden;

      img {
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 240px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all 0.5s;

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
}
</style>

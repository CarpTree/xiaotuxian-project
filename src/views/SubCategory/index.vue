<script setup>
import { getCategoryFilterAPI, getSubCategoryGoodsAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";

const route = useRoute();
// 获取当前二级分类信息并渲染面包屑导航
const subCategoryData = ref({});
const getCategoryFilter = async () => {
  const res = await getCategoryFilterAPI(route.params.id);
  subCategoryData.value = res.result;
};
onMounted(() => getCategoryFilter());

// 获取并渲染当前二级分类下的商品列表
const goodsList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});
const getSubCategoryGoods = async () => {
  const res = await getSubCategoryGoodsAPI(reqData.value);
  goodsList.value = res.result.items;
};
onMounted(() => getSubCategoryGoods());

// tab切换回调
const tabChange = () => {
  reqData.value.page = 1;
  getSubCategoryGoods();
};

//
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryData.parentId}` }"
          >{{ subCategoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-click="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodsList" :good="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

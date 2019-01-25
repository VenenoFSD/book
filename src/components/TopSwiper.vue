<template>
  <div class="top-swiper">
    <swiper indicator-dots="true" indicator-color="#eee" indicator-active-color="#63B8FF" autoplay="true" duration="1000" circular="true">
      <swiper-item v-for="(item, ind) in list" :key="ind">
        <image v-for="imgItem in item" :key="imgItem.id" :src="imgItem.image" mode="aspectFit" @click="toBookDetail(imgItem.id)"></image>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: "TopSwiper",
    props: {
      topList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      toBookDetail (id) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${id}`
        });
      }
    },
    computed: {
      list () {
        let list = this.topList;
        return [list.slice(0, 3), list.slice(3, 6), list.slice(6)];
      }
    }
  };
</script>

<style scoped lang="scss">
  .top-swiper {
    margin-top: 10px;
    image {
      width: 33%;
      height: 80%;
    }
  }
</style>

<template>
  <div class="year-progress">
    <img src="../../static/img/time.png" alt="">
    <progress :percent="percent" border-radius="2" activeColor="#63B8FF" show-info="true" font-size="12px"></progress>
    <p>{{year}}年已经过去{{days}}天了，继续加油！！</p>
  </div>
</template>

<script>
  export default {
    name: "YearProgress",
    methods: {
      isLeapYear () {
        let year = new Date().getFullYear();
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
      }
    },
    computed: {
      year () {
        return new Date().getFullYear();
      },
      days () {
        let start = new Date();
        start.setDate(1);
        start.setMonth(0);
        let offset = new Date().getTime() - start.getTime();
        return Math.floor(offset / 1000 / 3600 / 24) + 1;
      },
      percent () {
        return (this.days / (this.isLeapYear() ? 366 : 365) * 100).toFixed(1);
      }
    }
  };
</script>

<style scoped lang="scss">
  .year-progress {
    padding: 0 20px;
    margin-bottom: 200rpx;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
      transform: rotate(180deg);
      animation: imgRotate 1s cubic-bezier(.17,.67,.64,1.69) 0.5s;
      animation-fill-mode: forwards;
    }
    p {
      margin: 10px 0;
      font-size: 16px;
    }
  }
  @keyframes imgRotate {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

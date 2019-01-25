<template>
  <div class="detail">detail:{{bookId}}</div>
</template>

<script>
  import {get} from "../../util";

  export default {
    name: "Detail",
    data () {
      return {
        bookId: ''
      }
    },
    methods: {
      async getDetail () {
        const info = await get('/weapp/bookDetail', {id: this.bookId});
      }
    },
    mounted () {
      this.bookId = this.$root.$mp.query.id;
      this.getDetail();
    }
  };
</script>

<style scoped lang="scss">

</style>

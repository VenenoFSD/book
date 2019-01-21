<script>
  import {get} from './util'
  export default {
    name: "App",
    async created () {
      const res = await get('/weapp/test');
      console.log(res);
    }
  };
</script>

<style scoped>
</style>

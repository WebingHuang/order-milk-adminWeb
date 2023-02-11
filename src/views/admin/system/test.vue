<template>
   <div class="">
      <div v-for="(item,index) in city" :key="index" @click="cli(children)">
         {{item.test}}
         <div></div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         city: [
            {
               test: 'aa',
               id:1,
               children:[
                  {
                     test:'aa-aa',
                     id:3,
                     pid:1
                  },
                  {
                     test:'aa-bb',
                     id:4,
                     pid:1
                  }
               ]
            },
            {
               test: 'bb',
               pid:0,
               id:2,
               children:[
                  {
                     test:'bb-aa',
                     id:5,
                     pid:2
                  },
                  {
                     test:'bb-bb',
                     id:6,
                     pid:2
                  }
               ]
            },
         ],
      }
   },
   mounted() {},
   methods: {
      cli(children){
         
      }
   },
}
</script>

<style lang='scss' scoped>
</style>
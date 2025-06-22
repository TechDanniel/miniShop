<template>
  <div>
    <!--全局的三级菜单-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'

export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Floor,
    Like,
    Brand
  },
  mounted(){
    this.$store.dispatch('FloorList')
  },
  computed:{
    ...mapState({
      floorList:(state)=>{
        return state.home.floorList
      }
    })
  }
}
</script>

<style>
</style>
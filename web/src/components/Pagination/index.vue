<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }">
      1
    </button>
    <button v-if="startNumAndEndNum.start>2">···</button>
    <button v-for="(page,index) in startNumAndEndNum.range" :key="index" @click="$emit('getPageNo', page)" :class="{ active: pageNo === page }">
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" :class="{ active: pageNo === totalPage }">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
    name:'',
    props:['pageNo','pageSize','total','continues'],
    computed:{
        //总共多少页
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        //计算连续页码的开始和结束数字
        startNumAndEndNum(){
            const {continues,pageNo,totalPage}=this
            let start=0,end=0
            if(continues>totalPage){
                start=1
                end=totalPage
            }else{
                start=pageNo-(continues-1)/2
                end=pageNo+(continues-1)/2
                if(start<1){
                    start=1
                    end=continues
                } 
                if(end>totalPage){
                    start=totalPage-continues+1
                    end=totalPage
                } 
            }
            //为了便于遍历continues部分按钮
            let range=[]
            for(let i=start;i<=end;i++){
                range.push(i)
            }
            return {start,end,range}
        }
    }
}
</script>

<style scoped>
.pagination {
    text-align: center;
}
.pagination button{
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
}
.pagination button[disabled]{
    color: #c0c4cc;
    cursor: not-allowed;
}
.pagination .active{
    cursor: not-allowed;
    background-color: #409eff;
    color: #fff;
}
.active{
  background: skyblue;
}
</style>
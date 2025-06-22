<template>
    <div class="container">
        <div @mouseleave="leaveShow" @mouseenter="enterShow">
            <h2 class="all">全部商品分类</h2>
             <!-- 过渡动画 -->
             <transition name="sort">
                <div class="sort" v-show="show" @click="goSearch">
                    <div class="all-sort-list2" >
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                            <h3 :class="{cur:currentIndex===index}" @mouseenter="changeIndex(index)">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                                    {{ c1.categoryName }}
                                </a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                                <div class="subitem">
                                <dl clas="fore" v-for="(c2) in c1.childCategory" :key="c2.categoryId">
                                    <dt>
                                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                                            {{ c2.categoryName }}
                                        </a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.childCategory" :key="c3.categoryId">
                                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                                                {{ c3.categoryName }}
                                            </a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                            </div>
                        </div> 
                    </div>
                </div>
             </transition>
        </div>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle  from 'lodash/throttle';

export default {
    name:'TypeNav',
    data(){
        return{
            currentIndex:-1,
            show:true
        }
    },
    mounted(){
        if(this.$route.path!=='/home'){
            this.show=false
        }
    },
    computed:{
        ...mapState({
            categoryList:(state)=>{
                return state.home.categoryList
            }
        })
    },
    methods:{
        // 节流
        changeIndex:throttle(function(index){
            this.currentIndex=index
        },50),
        goSearch(event){
            let element=event.target
            let {categoryname,category1id,category2id,category3id}=element.dataset
            if(categoryname){
                let location={name:"search"}
                let query={categoryName:categoryname}
                if(category1id){
                    query.category1Id=category1id
                }
                else if(category2id){
                    query.category2Id=category2id
                }
                else if(category3id){
                    query.category3Id=category3id
                }
                location.query=query
                location.params=this.$route.params
                this.$router.push(location)
            }
        },
        enterShow(){
            this.show=true
        },
        leaveShow(){
            this.currentIndex=-1
            if(this.$route.path!=='/home'){
                this.show=false
            }
        },
    }
}
</script>

<style scoped>
.container {
    background: #f6fff8;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(34, 139, 34, 0.08);
    margin:0 auto;
    position: relative;
}

.all {
    background: linear-gradient(90deg, #a8e063 0%, #56ab2f 100%);
    color: #fff;
    font-size: 18px;
    border-radius: 8px 8px 0 0;
    font-weight: 600;
    letter-spacing: 1px;
    width: 200px;
    height: 45px;
    text-align: center;
    line-height: 45px;
}

.sort {
    background: #e9fbe5;
    border: 1px solid #b2e5b2;
    border-top: none;
    border-radius: 0 0 8px 8px;
    position: absolute;
    left:0;
    top: 45px;
    width: 200px;
    z-index: 9999;
}

.all-sort-list2 {
    padding: 0;
}

.item {
    margin-bottom: 6px;
}

.item h3 {
    width: 160px;
    margin: 0;
    padding: 10px 0 10px 18px;
    font-size: 16px;
    color: #388e3c;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.item h3.cur,
.item h3:hover {
    background: #b2e5b2;
    color: #256029;
}

.item-list {
    background: #f6fff8;
    border-radius: 4px;
    margin-left: 10px;
    padding: 10px 0 10px 10px;
    box-shadow: 0 1px 4px rgba(34, 139, 34, 0.04);
    display: none;
    position: absolute;
    left: 185px;
    top: 0;
    width: 734px;
    min-height: 460px;
    z-index: 9999;
}

.subitem dl {
    margin: 0 0 8px 0;
}

.subitem dt {
    font-weight: 500;
    color: #388e3c;
    background-color: #a8e063;
    margin-bottom: 4px;
    text-align: center;
}

.subitem dd {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.subitem em {
    font-style: normal;
}

.subitem a {
    color: #388e3c;
    border-radius: 3px;
    padding: 2px 8px;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    font-size: 14px;
}

.subitem a:hover {
    background: #a8e063;
    color: #fff;
}

.nav {
    display: flex;
    gap: 18px;
    margin-top: 10px;
    padding-left: 5px;
}

.nav a {
    color: #388e3c;
    font-size: 15px;
    text-decoration: none;
    padding: 6px 14px;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s;
}

.nav a:hover {
    background: #b2e5b2;
    color: #256029;
}

.sort-enter-active, .sort-leave-active {
    transition: opacity 0.2s;
}
.sort-enter, .sort-leave-to {
    opacity: 0;
}
</style>
<template>
    <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="list in lists" :key="list.id">
            <img :src="list.imgUrl">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css'      
export default {
    name:'Casousel',
    props:['lists'],
    watch:{
        lists:{
            immediate:true,
            handler(newValue,oldValue){
                this.$nextTick(()=>{
                    var mySwiper = new Swiper (this.$refs.swiper, {
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    //点击小球的时候也切换图片
                    clickable: true,
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                    
                    // 如果需要滚动条
                    scrollbar: {
                    el: '.swiper-scrollbar',
                    },
                })        
                })
            }
        }
    }
}
</script>

<style>
.swiper-container {
    width: 100%;
    margin: 30px auto;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(60, 180, 120, 0.08);
    background: #f6fff8;
    overflow: hidden;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e6f9ee;
}

.swiper-slide img {
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(60, 180, 120, 0.10);
    transition: transform 0.3s;
}

.swiper-slide img:hover {
    transform: scale(1.03);
}

.swiper-pagination-bullet {
    background: #7be495;
    opacity: 0.7;
    transition: background 0.3s, opacity 0.3s;
}

.swiper-pagination-bullet-active {
    background: #43d18d;
    opacity: 1;
}

.swiper-button-next,
.swiper-button-prev {
    color: #43d18d;
    background: rgba(123, 228, 149, 0.12);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 2px 8px rgba(60, 180, 120, 0.10);
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
    background: #43d18d;
    color: #fff;
}

.swiper-scrollbar {
    background: #e6f9ee;
    border-radius: 4px;
    height: 6px;
}

.swiper-scrollbar-drag {
    background: #7be495;
    border-radius: 4px;
}
</style>
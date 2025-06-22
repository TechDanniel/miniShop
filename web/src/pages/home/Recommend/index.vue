<template>
  <div class="today-recommend">
    <div class="py-container">
        <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="./images/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner">
          <img src="./images/today01.png" />
        </li>
        <li class="banner">
          <img src="./images/today02.png" />
        </li>
        <li class="banner">
          <img src="./images/today03.png" />
        </li>
        <li class="banner">
          <img src="./images/today04.png" />
        </li>
      </ul>  
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.today-recommend {
  background: #e8f5e9;
  padding: 30px 0;
}

.py-container {
  max-width: 1200px;
  margin: 0 auto;
}

.recommend {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommend .clock {
  margin-right: 30px;
  display: flex;
  align-items: center;
}

.recommend .time {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recommend .time img {
  width: 40px;
  height: 40px;
}

.recommend .time h3 {
  color: #388e3c;
  font-size: 20px;
  margin: 8px 0 0 0;
  font-weight: bold;
}

.recommend .banner {
  margin-right: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(56, 142, 60, 0.08);
  transition: transform 0.2s;
}

.recommend .banner:last-child {
  margin-right: 0;
}

.recommend .banner img {
  width: 180px;
  height: 100px;
  object-fit: cover;
  display: block;
  border: 2px solid #a5d6a7;
  background: #fff;
  transition: border-color 0.2s;
}

.recommend .banner:hover img {
  border-color: #388e3c;
  transform: scale(1.03);
}
</style>
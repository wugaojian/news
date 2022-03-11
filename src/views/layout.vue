<template>
    <div class="layout">
        <!-- 子路由出口 -->
        <router-view></router-view>
        
        <!-- 底部导航栏 -->
        <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search">问答</van-tabbar-item>
            <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
            <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
   </div>
</template>

<script>
export default {
    data() {
        return{
            active: 0
        }
    }
}
</script>

<style lang='scss' scoped>
.van-tabbar{
    background: #e7e7e7;
    .van-tabbar-item{
        background: none;
    }
}
</style>
<template>
  <el-container style="background-color: #fdf6ec8f;">
    <el-header style="height: 60px;padding: 0px;position: fixed;width: 100%;z-index: 999;">
      <head-er></head-er>
    </el-header>

    <el-main class="home-main">
      <el-carousel :interval="6000" :type="getType()" class="carousel">
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/星空_small.jpg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/稻田中的乌鸦.jpg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/罗纳河上的星空.jpg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/黄房子.jpeg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/梵高的卧室.jpeg"></img></div>
        </el-carousel-item>
      </el-carousel>

      <el-timeline v-loading="loading" class="card-list">
        <el-timeline-item v-for="article in articleList" :key="article.id" :timestamp="article.publishDate" placement="top">
          <el-card shadow="hover">
            <div class="card-header">
              <div class="article-title">
                <router-link :to="{ path: '/article', query: { title: article.title }}">
                  <b style="color:black">{{ article.title }}</b>
                </router-link>
              </div>
              <el-tag size="mini">{{ article.categories }}</el-tag>
            </div>

            <p style="color: #999;">{{ article.summary }}</p>

            <div style="color: #999;">
              <i class="el-icon-view"></i><span style="margin-left:5px;margin-right:10px">{{ article.readings }}</span>
              <i class="el-icon-chat-square"></i><span style="margin-left:5px">{{ article.comments }}</span>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-main>
  </el-container>
</template>

<script>
import headEr from '@/components/header';
import { article_listByPage } from '@/api/article';

export default {
  components: {
    headEr
  },
  data() {
    return {
      loading: false,
      articleList: []
    }
  },
  methods: {
    // 获取文章列表
    getArticleList() {
      this.loading = true;
      article_listByPage(1, 50).then((resp) => {
        this.articleList = JSON.parse(resp.data.data); // JSON解析后端返回数据(resp.data)中的data字段
        console.log(this.articleList);
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      })
    },
    // 查看文章
    viewArticel(article) {
      console.log(article);
      this.$router.push({ path: '/article', query: { title: article.title }})
    },
    // 根据屏幕大小返回走马灯样式
    getType() {
      console.log('window.screen.width:', window.screen.width);
      return window.screen.width > 900 ? 'card' : '';
    }
  },
  created() {
    this.getArticleList();
  }
}
</script>

<style>
.img-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width:100%;
}

.img-container img {
  height: auto;
  width: auto;
  max-width:100%;
  max-height:100%;
}

.card-list {
  padding: 0;
  margin-top: 10px;
}

@media (min-width: 900px) {
  .home-main {
    margin-top: 60px;
    padding: 20px 20%;
    width: 100%;
  }

  .carousel {
    height: 400px;
  }

  .card-header {
    display: flex;
    align-items: center;
  }

  .card-header .article-title {
    display: inline;
    font-size: 25px;
    margin-right: 10px;
    font-family: "Microsoft Yahei";
  }
}

@media (max-width: 980px) {
  .home-main{
    margin-top: 60px;
    padding: 0 15%;
  }

  .carousel {
    height: 300px;
  }

  .card-header {
    display: flex;
    align-items: center;
  }

  .card-header .article-title {
    display: inline;
    font-size: 15px;
    margin-right: 3px;
    font-family: "Microsoft Yahei";
  }
}
</style>

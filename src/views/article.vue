<template>
  <el-container class="article-container">
    <el-header style="padding:0;">
      <head-er></head-er>
    </el-header>

    <el-main v-loading="loading">
      <div class="article-wrapper">
        <page-title :title="article.title"/>

        <div id="article">
          <div class="article-header">
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-meta">
              <span><i class="el-icon-date"></i> published on {{ article.publishDate }} | </span>
              <span><i class="el-icon-edit-outline"></i> modified on {{ article.updateDate }} | </span>
              <span><i class="el-icon-folder-opened"></i> In {{ article.categories }} | </span>
              <span><i class="el-icon-view"></i> Visitors {{ article.readings }} </span>
            </div>
          </div>
          <!-- article header -->

          <md-view :content="compiledMd()"/>
          <!-- markdown view -->

          <div class="footnote">© 著作权归作者所有</div>
          <!-- article footnote -->
        </div>
        <!-- article -->

        <div style="margin:0 20px;">
          <comment-area
            :articleId="article.id"/>
        </div>
        <!-- comment area -->
      </div>
      <!-- article wrapper -->
    </el-main>
  </el-container>
</template>

<script>
import headEr from '@/components/header';
import pageTitle from '@/components/pageTitle';
import mdView from '@/components/mdView';
import commentArea from '@/components/commentArea';
import marked from 'marked';
import { article_findByTitle } from '@/api/article';

export default {
  components: {
    headEr,
    pageTitle,
    mdView,
    commentArea
  },
  data() {
    return {
      article: {},
      defaultArtical: {
        title: 'default',
        content: '啥也没有'
      },
      loading: false
    }
  },
  methods: {
    // 字符串转换markdown
    compiledMd() {
      let article = this.article;
      if (this.article.title == undefined) article = this.defaultArtical;
      let md = marked(article.content, { sanitize: true });
      return md;
    },
    // 通过文章标题获取文章
    getArticle(title) {
      console.log('=====getArticle()======');
      this.loading = true;
      article_findByTitle(title)
      .then(resp => {
        console.log(resp);
        this.article = JSON.parse(resp.data.data);  // JSON解析后端返回数据(resp.data)中的 data 字段
        console.log('article --->', this.article);
        this.loading = false;
      })
      // 请求响应异常
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
    }
  },
  created() {
    let title = this.$router.currentRoute.query.title;
    console.log(title);
    if (title != undefined) {
      this.getArticle(title);
    }
  }
}
</script>

<style>
.article-container {
  background-color: #fdf6ec8f;
  position: absolute;
  height: 100%;
  width: 100%
}

.footnote {
  display: block;
  padding-right: 20px;
  margin-bottom: 80px;
  font-size: 16px;
  font-family: 'Microsoft Yahei';
  color: grey;
  text-align: right;
}

@media (min-width: 980px) {
  .article-wrapper {
    width: 1000px;
    margin: 0 auto;
    padding-bottom: 100px;
  }

  .article-header {
    text-align: center;
  }

  .article-title {
    font-size: 35px;
    font-weight: 500;
  }

  .article-meta {
    margin: 0 0 30px 0;
    color: #999;
    font-family: 'Microsoft Yahei', "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 12px;
  }
}

@media (max-width: 980px) {
  .article-wrapper {
    padding-bottom: 100px;
  }

  .article-header {
    text-align: center;
  }

  .article-title {
    font-size: 26px;
    font-weight: 400;
  }

  .article-meta {
    margin: 0 0 20px 0;
    color: #999;
    font-family: 'Microsoft Yahei', "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 12px;
  }
}
</style>

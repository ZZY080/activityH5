<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'App',
  }
</script>
<style>
  /* 定义css变量 */
  :root{
    --pointer-events:none;
    --user-select:none;
  }
  * {
    padding: 0;
    margin: 0;
  }

  body {
    background-color: #f1f1f1;
    font-family: 'Arial', sans-serif;
    /* 根据需要选择字体 */
    -webkit-touch-callout: none;
    /*系统默认菜单被禁用*/
    -webkit-user-select:var(--user-select);
    /*webkit浏览器*/
    -khtml-user-select: var(--user-select);
    /*早起浏览器*/
    -moz-user-select: var(--user-select);
    /*火狐浏览器*/
    -ms-user-select: var(--user-select);
    /*IE浏览器*/
    user-select: var(--user-select);
    /*点击高亮*/
    -webkit-tap-highlight-color:rgba(0,0,0,0); 
  }
  [v-cloak] {
    display: none;
  }
</style>
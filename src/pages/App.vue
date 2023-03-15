<template>
<div class="container">
  <router-view />
</div>
</template>
<style>
html,body{
  background-color:whitesmoke;
}
#lou,#area,#root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
  padding:0;margin:0;
  background-color:whitesmoke;
}
.area,.container,.page{
  background-color:whitesmoke;
  font-size:16px;
  height:100%;
}
.area{height:auto;padding:10px 0;}
.content{
  background-color:whitesmoke;
}
h1,h2,h3,h4,h5,h6{padding:0;margin:0;}
ul,li{
  list-style: none;
}
.loading{
  position:fixed;z-index:999;
  top:50%;left:50%;
  transform:translate(-50%,-50%);
}
</style>

<template>
  <div id="app">
    <ButtonThree 
      width="300px"
      round='0px'
    >Hover me I'm awesome</ButtonThree>
    <ButtonThree 
      type="threeBtn" 
      bgColor="#0ba9f7"
    >Hover me I'm awesome</ButtonThree>
    <ButtonThree 
      type="haloBtn" 
      height="50px" 
      bgColor='rgb(171, 2, 185)'
      :autofocus='true'
    >Hover me I'm awesome</ButtonThree>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

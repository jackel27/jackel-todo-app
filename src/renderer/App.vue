<style>
body {
  padding: 20px;
}
body, html {
  background-color: rgba(0, 0, 0, .2);
}
</style>
<template>
  <div id="#app">
    <!-- <h1 class="title">Position = {{ position }}</h1>
    <h1>screen = {{ screen }}</h1> -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        position: '',
        open: true,
        screen: '',
        screenw: ''
      }
    },
    mounted () {
      this.$electron.remote.globalShortcut.register('CommandOrControl+Shift+Alt+A', () => {
        this.open = !this.open
        if (this.open) {
          this.$electron.remote.getCurrentWindow().restore()
          this.$electron.remote.getCurrentWindow().show()
        } else {
          this.$electron.remote.getCurrentWindow().minimize()
        }
      })
      this.screen = this.$electron.remote.screen.getPrimaryDisplay()
      this.position = this.$electron.remote.getCurrentWindow().getPosition()
      this.$electron.remote.getCurrentWindow().on('move', () => {
        this.position = this.$electron.remote.getCurrentWindow().getPosition()
      })
      let posX = this.screen.workAreaSize.width - 900
      let posY = 0
      this.$electron.remote.getCurrentWindow().setPosition(posX, posY)
    }
  }
</script>

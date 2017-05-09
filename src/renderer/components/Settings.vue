<style scoped>
</style>
<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
        <button class="delete" @click="this.$parent.openSettings"></button>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <div class="field">
          <label class="label">Hotkey</label>
          <h3><strong>Current: </strong>{{ this.$parent.hotkey }}</h3>
          <p class="control">
            <span class="select">
              <select v-model="dropdown">
                <!-- CommandOrControl+Shift+Alt+F -->
                <option value="" selected>Please Select...</option>
                <option value="CommandOrControl+Shift+Alt+">CommandOrControl+Shift+Alt</option>
                <option value="CommandOrControl+Shift+">CommandOrControl+Shift</option>
                <option value="CommandOrControl+Alt+">CommandOrControl+Alt</option>
                <option value="Shift+Alt+">Shift+Alt</option>
              </select>
            </span>
            <input class="input" placeholder="Add a Character" v-model="char" v-on:keyup="charInput" type="text" name="" value="character">
          </p>
        </div>
        <div class="field">
          <label class="label">Background Image URL</label>
          <p class="control">
            <input class="input" type="text" v-model="$parent.imagePath" placeholder="Paste URL Here...">
          </p>
        </div>

      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="saveSettings">Save changes</a>
        <a class="button" @click="this.$parent.openSettings">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {
      char: '',
      dropdown: ''
    }
  },
  methods: {
    charInput () {
      let lastChar = this.char[this.char.length - 1]
      this.char = lastChar.toUpperCase()
    },
    saveSettings () {
      if ((this.char && !this.dropdown) || (!this.char && this.dropdown)) {
        console.log('Could not save, missing hotkey values')
        window.alert('Could not save, please complete Hotkey fields or leave them blank')
      } else {
        if (this.char && this.dropdown) {
          let newHotKey = this.dropdown + this.char
          console.log(newHotKey)
          this.$parent.hotkey = newHotKey
        }
        this.$parent.openSettings()
      }
    }
  }
}
</script>

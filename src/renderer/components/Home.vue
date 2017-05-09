<style scoped>
img {
  margin-top: -25px;
  width: 450px;
}
#user-input {
  height: 36px;
  width: 300px;
  font-size: x-large;
}
.is-8, #input-container {
  margin: 0 auto;
  text-align: center;
  justify-content: center;
}
.fa-check:before {
  position: absolute;
  color: #0087ff!important;
  content: "\F00C";
  top: -12px;
  right: -14px;
}
.toggle {
  display: flex;
  margin: 0 auto;
}
.title, .subtitle {
  color: white;
}
.settings-col {
  text-align: center;
}
.settings-button {
  position: absolute;
  top: 1px;
  left: calc(100vw - 60px);
}
.fa-cog {
  color: black;
}
.fa-cog:hover {
  color: white;
}
.toggle-btn {
  text-align: center!important;
  color: blue!important;
  display: block;
}
/* card colors */
.card-content {
  background-color: #5c5f5a;
}
.complete-btn {
  background-color: #d3d9e2;
}
.complete-btn:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}
.remove-btn {
  background-color: #c19c9c;
}
.remove-btn:hover {
  cursor: pointer;
  background-color: #c17c7c;
}
.card-title {
  color: white;
}
.background-image {
  background-color: red;
  width: 100vw;
  top: 0;
  left: 0;
  position: absolute;
  z-index: -2;
  height: 100vh;
  background-size: cover;
  /*animation-fill-mode: none;*/
  animation: hue 10s infinite;
  /*background-image: url(assets/default.jpg);*/
}

@keyframes hue {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
/*
.home {
  background-image: url(./components/assets/default.jpg);
  background-size: cover;
  /*background-position-x: calc(100vw - 50%);*/
  /*background-position-y: 0;
  background-blend-mode: normal;
  animation: hue 30s infinite;
  /*filter: hue-rotate(395deg);
  }
  */
</style>

<template>
  <div class="home">
    <div class="background-image" :style="{ 'background-image' : 'url(' + imagePath + ')' }">

    </div>
    <!-- modals -->
    <settings v-if="settingsModal"></settings>

    <div class="columns">
      <div class="column is-2">
      <!-- Nothing Goes Here Bitch -->
      </div>
      <div class="column is-8">
        <!-- Put Shit Here -->
        <h1 class="title">{{ heading }}</h1>
        <!-- <h1 class="title">{{ posX }}</h1> -->
        <br>
        <h2 class="subtitle">Press {{ hotkey }} to toggle list</h2>
        <br>
        <div class="field has-addons" id="input-container">
          <p class="control">
            <input type="text" id="user-input" v-model="userinput" ref="todoinput" @keyup.enter="addTodo" placeholder="Todo here...">
          </p>
          <p class="control">
            <a class="button is-info" @click="addTodo">
              Add
            </a>
          </p>

        </div>
      </div>
    </div>
    <div class="container settings-button">
      <!-- <a class="button is-primary" @click="openSettings()">
        Settings
      </a> -->
      <i class="fa fa-cog fa-3x" @click="openSettings()" aria-hidden="true"></i>
    </div>
    <div class="columns is-multiline" v-if="sortedTodos.length > 0">
      <div class="column toggle is-12">
        <div class="column is-4">

        </div>
        <div class="column is-4">
          <i @click="list" class="fa fa-2x toggle-btn" :class="{ 'fa-toggle-on': !listdir, 'fa-toggle-off': listdir }" aria-hidden="true"></i>
        </div>
        <div class="column is-4">

        </div>
      </div>
      <div class="column card-column" :class="{ 'is-3': !listdir, 'is-12': listdir }" v-for="(item, index) in sortedTodos">
        <div class="card">
          <div class="card-content">
            <p class="title card-title">
              <i class="fa fa-check fa-6" v-if="item.completed" aria-hidden="true"></i>
              {{ item.todo }}
            </p>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item complete-btn" @click="completeTodo(item, item.completed)">
              <span v-if="!item.completed">
                Mark as Complete
              </span>
              <span v-if="item.completed">
                Undo
              </span>
            </p>
            <p class="card-footer-item remove-btn" @click="removeTodo(item)">
              <span>
                Remove
              </span>
            </p>
          </footer>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="title is-lg"> You currently have no TODOS.. </h1>
    </div>
  </div>
</template>

<script>
  import Settings from './Settings'
  export default {
    name: 'home',
    components: {
      Settings
    },
    watch: {
      todoList (val) {
        window.localStorage.setItem('todos', JSON.stringify(val))
      },
      hotkey (val) {
        window.localStorage.setItem('hotkey', JSON.stringify(val))
        console.log('registering new hotkey ', val)
        this.registerHotkey()
      }
    },
    created () {
    },
    mounted () {
      this.screenwidth = this.$electron.screen.getPrimaryDisplay().workAreaSize.width
      this.screenheight = this.$electron.screen.getPrimaryDisplay().workAreaSize.height
      console.log('electron screen = ', this.$electron.screen.getPrimaryDisplay().workAreaSize)
      this.list()
      this.$refs.todoinput.focus()
      this.todoList = JSON.parse(window.localStorage.getItem('todos')) || []
      this.hotkey = JSON.parse(window.localStorage.getItem('hotkey'))
      // console.log('Todosettings on mount = ', this.todoSettings)
      this.focus()
    },
    computed: {
      sortedTodos () {
        let arr = this.todoList
        arr.sort((a, b) => {
          return a.completed - b.completed
        })
        return arr
      }
    },
    data () {
      return {
        heading: 'Jack\'s Todos',
        userinput: '',
        todoList: [],
        listdir: false,
        posX: 0,
        posY: 0,
        hotkey: 'CommandOrControl+Shift+Alt+F',
        settingsModal: false,
        screenwidth: 0,
        screenheight: 0,
        open: true,
        imagePath: 'https://images.unsplash.com/photo-1484199408980-5918a796a53f?dpr=0.6666666865348816&auto=compress,format&fit=crop&w=1199&h=776&q=80&cs=tinysrgb&crop=&bg='
      }
    },
    methods: {
      registerHotkey () {
        this.$electron.remote.globalShortcut.unregisterAll()
        this.$electron.remote.globalShortcut.register(this.hotkey, () => {
          this.open = !this.open
          if (this.open) {
            this.$electron.remote.getCurrentWindow().restore()
            this.$electron.remote.getCurrentWindow().show()
          } else {
            this.$electron.remote.getCurrentWindow().minimize()
          }
        })
      },
      focus () {
        this.$electron.remote.getCurrentWindow().on('show', () => {
          this.$refs.todoinput.focus()
        })
      },
      addTodo () {
        this.todoList.push({
          completed: false,
          todo: this.userinput
        })
        this.userinput = ''
      },
      openSettings () {
        this.settingsModal = !this.settingsModal
        console.log('open settings.')
      },
      list () {
        this.listdir = !this.listdir
        if (this.listdir) {
          this.posX = (this.screenwidth - 500)
          this.$electron.remote.getCurrentWindow().setSize(500, this.screenheight)
          this.posY = 0
          this.$electron.remote.getCurrentWindow().setPosition(this.posX, this.posY)
          this.focus()
        } else {
          this.posX = (this.screenwidth - 900)
          this.$electron.remote.getCurrentWindow().setSize(900, this.screenheight)
          this.posY = 0
          this.$electron.remote.getCurrentWindow().setPosition(this.posX, this.posY)
          this.focus()
        }
      },
      removeTodo (index) {
        this.todoList.splice(this.todoList.indexOf(index), 1)
      },
      completeTodo (index, completed) {
        this.todoList[this.todoList.indexOf(index)].completed = !completed
      }
    }
  }
</script>

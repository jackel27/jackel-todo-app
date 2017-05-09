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
.complete-btn {
  background-color: cornflowerblue;
}
.complete-btn:hover {
  cursor: pointer;
  background-color: #1057d6;
}
.remove-btn {
  background-color: red;
}
.remove-btn:hover {
  cursor: pointer;
  background-color: #af0000;
}
.card-content {
  background-color: darkslategrey;
}
.card-title {
  color: white;
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
</style>

<template>
  <div class="home">

    <div class="columns">
      <div class="column is-2">
      <!-- Nothing Goes Here Bitch -->
      </div>
      <div class="column is-8">
        <!-- Put Shit Here -->
        <h1 class="title">{{ heading }}</h1>
        <div class="field has-addons" id="input-container">
          <p class="control">
            <input type="text" id="user-input" v-model="userinput" @keyup.enter="addTodo" placeholder="Todo here...">
          </p>
          <p class="control">
            <a class="button is-info" @click="addTodo">
              Go
            </a>
          </p>

        </div>
      </div>
      <div class="column is-2">
        <!-- Sidebar ftw -->

      </div>
    </div>
    <div class="columns is-multiline" v-if="sortedTodos.length > 0">
      <div class="column toggle is-12">
        <p class="control toggle">
          <a class="button is-warning" @click="list">
            Toggle Layout
          </a>
        </p>
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
      <h1 class="title is-lg"> You have no Todos, Please add one now... </h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {
    },
    watch: {
      todoList (val) {
        window.localStorage.setItem('todos', JSON.stringify(val))
      }
    },
    mounted () {
      this.todoList = JSON.parse(window.localStorage.getItem('todos')) || []
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
        heading: 'Start of the "TODO" App! (in Electron)',
        userinput: '',
        todoList: [],
        listdir: false
      }
    },
    methods: {
      addTodo () {
        this.todoList.push({
          completed: false,
          todo: this.userinput
        })
        this.userinput = ''
      },
      list () {
        this.listdir = !this.listdir
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

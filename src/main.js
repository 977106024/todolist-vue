import 'todomvc-app-css/index.css'

import Vue from 'vue'

var filters = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter((todo) => {
      return !todo.completed //只返回true 选中的是true 取反！
    })
  },
  completed (todos) {
    return todos.filter((todo) => {
      return todo.completed
    })
  }
}

new Vue({
  el: '.todoapp',
  data: {
    msg: 'hello world',
    title: 'todoxxx',
    newTodo: 'vuedemo',
    todoTrue: null,
    todos: [
    {
      content: 'vue',
      completed: false
    },
    {
      content: 'vuex',
      completed: false
    }]
  },
  computed: {
    remain () {
      return filters.active(this.todos).length
    },
    isAll: {
      get () {
        return this.remain === 0
      },
      set (value) {
        this.todos.forEach((todo) => {
          todo.completed = value // 把复选框的true与false传进来 赋值给每一个选项
        })
      }
    }
  },
  methods: {
    addTodo (e) {
      if(!this.newTodo){
        return
      }
      this.todos.push({
        content: this.newTodo,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo (index) {
      this.todos.splice(index,1)
    },
    editTodo (todo) {
      this.todoTrue = todo // 两者相等为true
      this.editCache = todo.content //双击编辑时 缓存content
    },
    doneEdit (todo,index) {
      this.todoTrue = null   //让样式消失
      if(!todo.content) {
        this.removeTodo(index)
      }
    },
    cancleEdit (todo) {
      this.todoTrue = null
      todo.content = this.editCache
    },
    clear () {
      this.todos = filters.active(this.todos) //把返回的true重新赋给todos
    }
  },
  directives: {
    focus (el,value) { // 传进来布尔值
      if(value) {
        el.focus()  //获取焦点
      }
    }
  }
})

// new Vue({
//   el: '.info'
// })

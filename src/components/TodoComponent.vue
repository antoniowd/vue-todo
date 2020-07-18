<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 ml-auto mr-auto">
        <h1 class="text-center">
          TODOS
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 ml-auto mr-auto">
        <todo-add
          @add-task="addTask"
        />
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-12 col-md-6 ml-auto mr-auto">
        <todo-filter
          @filter="filterTask"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 ml-auto mr-auto">
        <todo-task-item
          v-for="(task, index) in filteredTask"
          :key="task.id"
          :item="task"
          :index="index"
          :next-item="filteredTask[index + 1] ? filteredTask[index + 1] : Object.assign({})"
          :can-swap="(filteredTask.length > index + 1)
            && (task.completed == filteredTask[index + 1].completed) ? true : false"
          @toggle-complete="toggleComplete"
          @delete-task="deleteTask"
          @swap-task="swapTask"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 ml-auto mr-auto">
        <small class="text-dark">
          {{ pendingTasks }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../lib/apiRequest';
import TodoAdd from './TodoAddComponent.vue';
import TodoFilter from './TodoFilterComponent.vue';
import TodoTaskItem from './TodoTaskItemComponent.vue';

export default {
  name: 'Todo',
  components: {
    TodoAdd, TodoFilter, TodoTaskItem,
  },
  data() {
    return {
      tasks: [],
      filterSelected: '',
      nextId: 0,
      swapLoading: false,
    };
  },
  computed: {
    pendingTasks() {
      const pending = this.tasks.filter(
        item => item.completed === false,
      ).length;
      if (pending === 0) {
        return 'Você não tem tarefas para fazer';
      }
      return `${pending} tarefa${pending > 1 ? 's' : ''} restante`;
    },
    filteredTask() {
      if (this.filterSelected === 'todos') {
        return this.tasks;
      }
      if (this.filterSelected === 'fazer') {
        return this.tasks.filter(item => item.completed === false);
      }
      if (this.filterSelected === 'completados') {
        return this.tasks.filter(item => item.completed === true);
      }

      return [];
    },
  },
  mounted() {
    return this.getList();
  },
  methods: {
    getList() {
      return new Promise((resolve, reject) => {
        http.get(
          `todos?_sort=completed,order&_order=asc,asc&timestamp=${new Date().getTime()}`,
        )
          .then((response) => {
            this.tasks = response.data;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addTask(task) {
      this.tasks.unshift(task);
    },
    filterTask(value) {
      this.filterSelected = value;
    },
    toggleComplete() {
      return this.getList();
    },
    deleteTask(id) {
      const index = this.tasks.findIndex(elem => elem.id === id);
      this.tasks.splice(index, 1);
    },
    swapTask() {
      return this.getList();
    },
  },
};
</script>

<template>
  <div>
    <b-form-input
      v-model="task"
      type="text"
      size="lg"
      placeholder="O que precisa ser feito?"
      @keyup.enter="add"
    />
    <div class="text-right">
      <small
        class="text-muted"
      >
        Pressione enter para adicionar uma tarefa
      </small>
    </div>
  </div>
</template>

<script>
import http from '../lib/apiRequest';

export default {
  data() {
    return {
      task: '',
    };
  },
  methods: {
    add() {
      return new Promise((resolve, reject) => {
        if (this.task !== '') {
          http.get('todos?_sort=order&_order=asc&_limit=1').then((res) => {
            let order = 1;
            if (res.data[0]) {
              order = res.data[0].order - 1;
            }

            const newTask = {
              order,
              completed: false,
              description: this.task,
            };

            this.task = '';
            http.post('todos', newTask).then((response) => {
              this.$emit('add-task', response.data);
              resolve(response.data);
            })
              .catch((err) => {
                reject(err);
              });
          })
            .catch((err) => {
              reject(err);
            });
        }
      });
    },
  },
};
</script>

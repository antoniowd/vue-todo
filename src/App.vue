<template>
  <div class="container-fluid pt-5">
    <todo-component />
  </div>
</template>

<script>
import TodoComponent from './components/TodoComponent.vue';

export default {
  name: 'FrontendExam',
  components: {
    TodoComponent,
  },
};
</script>

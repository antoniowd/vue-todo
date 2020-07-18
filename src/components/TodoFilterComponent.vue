<template>
  <div>
    <b-form-group class="text-center">
      <b-form-radio-group
        v-model="filterSelected"
        :options="options"
        name="filter-radio"
        @input="filter"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return [
          { text: 'Todos', value: 'todos' },
          { text: 'A fazer', value: 'fazer' },
          { text: 'Completados', value: 'completados' },
        ];
      },
    },
  },
  data() {
    return {
      filterSelected: 'todos',
    };
  },
  mounted() {
    this.$emit('filter', this.filterSelected);
  },
  methods: {
    filter() {
      this.$emit('filter', this.filterSelected);
    },
  },
};
</script>

<style>
  .custom-radio {
    margin-right: 2rem !important;
  }
</style>

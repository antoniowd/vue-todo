import Vue from 'vue';
import { mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import http from '../lib/apiRequest';
import TodoAdd from '../components/TodoAddComponent.vue';

Vue.use(BootstrapVue);

describe('TodoAddComponent.vue', () => {
  const wrapper = mount(TodoAdd, { Vue });

  it('has the add input', () => {
    expect(wrapper.contains('input[type="text"]')).toBe(true);
  });

  it('Check that property task is linked', () => {
    const input = wrapper.find('input');
    input.setValue('Nueva Tarefa');
    expect(wrapper.vm.task).toBe('Nueva Tarefa');
  });

  it('Save a task', (done) => {
    const input = wrapper.find('input');
    const newTask = `testtask${new Date().getTime()}`;
    input.setValue(newTask);

    // trigger the enter event to add a task
    input.trigger('keyup.enter');

    // wait for the async call to the server to check the expects
    setTimeout(() => {
      expect(wrapper.emitted('add-task')).toBeTruthy();
      http.get(`todos?description=${newTask}&_limit=1`).then((response) => {
        expect(response.data[0].description).toBe(newTask);
        http.delete(`todos/${response.data[0].id}`).then(() => {
          done();
        });
      });
    }, 2000);
  });
});

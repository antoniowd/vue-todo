import Vue from 'vue';
import { mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import http from '../lib/apiRequest';
import TodoTaskItem from '../components/TodoTaskItemComponent.vue';

Vue.use(BootstrapVue);

Vue.config.ignoredElements = [
  'sort-icon',
];

describe('TodoTaskItemComponent.vue', () => {
  const staticProps = {
    item: {
      id: 1,
      order: 1,
      completed: false,
      description: 'Tarefa 1',
    },
    index: 0,
    nextItem: {
      id: 2,
      order: 2,
      completed: false,
      description: 'Tarefa 2',
    },
    canSwap: true,
  };

  it('has the checkbox to toggle a complete a task', () => {
    const wrapper = mount(TodoTaskItem,
      {
        Vue,
        propsData: staticProps,
      });
    expect(wrapper.contains('input[type="checkbox"]')).toBe(true);
  });

  it('has the link to delete a task', () => {
    const wrapper = mount(TodoTaskItem,
      {
        Vue,
        propsData: staticProps,
      });
    expect(wrapper.contains('a.text-danger')).toBe(true);
  });

  it('has a link to swap', () => {
    const wrapper = mount(TodoTaskItem,
      {
        Vue,
        propsData: staticProps,
      });
    expect(wrapper.contains('a div.sort-icon')).toBe(true);
  });

  it('check the toggleComplete and deleteTask method', async (done) => {
    const item = await http.post('todos', {
      order: 5000,
      completed: false,
      description: 'Tarefa 1',
    });

    const nextItem = await http.post('todos', {
      order: 5001,
      completed: false,
      description: 'Tarefa 2',
    });

    const wrapper = mount(TodoTaskItem,
      {
        Vue,
        propsData: {
          item: item.data,
          index: 0,
          nextItem: nextItem.data,
          canSwap: true,
        },
      });

    const oldComplete = wrapper.vm.item.completed;

    wrapper.find('input[type="checkbox"]').trigger('click');

    setTimeout(() => {
      expect(wrapper.emitted('toggle-complete')).toBeTruthy();
      http.get(`todos/${wrapper.vm.item.id}`).then((response) => {
        expect(response.data.completed).toBe(!oldComplete);

        wrapper.find('a.text-danger').trigger('click');
        setTimeout(() => {
          expect(wrapper.emitted('delete-task')).toBeTruthy();
          http.delete(`todos/${wrapper.vm.nextItem.id}`).then(() => {
            done();
          });
        }, 2000);
      });
    }, 2000);
  });
});

it('check swap task', async (done) => {
  const item = await http.post('todos', {
    order: 5000,
    completed: false,
    description: 'Tarefa 1',
  });

  const nextItem = await http.post('todos', {
    order: 5001,
    completed: false,
    description: 'Tarefa 2',
  });

  const wrapper = mount(TodoTaskItem,
    {
      Vue,
      propsData: {
        item: item.data,
        index: 0,
        nextItem: nextItem.data,
        canSwap: true,
      },
    });

  wrapper.find('a div.sort-icon').trigger('click');

  setTimeout(async () => {
    expect(wrapper.emitted('swap-task')).toBeTruthy();
    const item1 = await http.get(`todos/${wrapper.vm.item.id}`);
    const nextItem1 = await http.get(`todos/${wrapper.vm.nextItem.id}`);

    expect(wrapper.vm.item.order).toBe(nextItem1.data.order);
    expect(wrapper.vm.nextItem.order).toBe(item1.data.order);

    await http.delete(`todos/${wrapper.vm.item.id}`);
    await http.delete(`todos/${wrapper.vm.nextItem.id}`);
    done();
  }, 3000);
});

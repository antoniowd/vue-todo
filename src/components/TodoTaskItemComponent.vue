<template>
  <div style="position: relative;">
    <b-list-group>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        <b-form-checkbox
          v-b-tooltip.hover=""
          :checked="item.completed"
          state="valid"
          title="Tarefa Concluída"
          value="true"
          unchecked-value="false"
          @change="toggleComplete"
        />
        <div>
          {{ item.description }}
        </div>
        <b-link
          v-b-tooltip.hover=""
          href="#"
          class="text-danger"
          title="Excluir tarefa"
          @click="deleteTask"
        >
          &times;
        </b-link>
      </b-list-group-item>
    </b-list-group>
    <div
      v-if="canSwap"
      class="swap-block"
    >
      <b-link
        v-show="!swapLoading"
        v-b-tooltip.hover=""
        title="Trocar ordem"
        @click.prevent="swap()"
      >
        <div class="sort-icon">
          <sort-icon />
        </div>
      </b-link>
      <b-spinner
        v-show="swapLoading"
        class="swap-spinner"
        small
        type="grow"
        variant="primary"
        label="Spinning"
      />
    </div>
  </div>
</template>

<script>
import http from '../lib/apiRequest';
import sortIcon from '../assets/sort-solid.svg';

export default {
  components: {
    sortIcon,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    nextItem: {
      type: Object,
      required: true,
    },
    canSwap: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      swapLoading: false,
    };
  },
  methods: {
    toggleComplete() {
      return new Promise((resolve, reject) => {
        http.patch(`todos/${this.item.id}`,
          { completed: this.item.completed !== true })
          .then((response) => {
            this.$emit('toggle-complete');
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteTask() {
      return new Promise((resolve, reject) => {
        http.delete(`todos/${this.item.id}`).then(() => {
          this.$emit('delete-task', this.item.id);
          resolve();
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
    swap() {
      return new Promise((resolve, reject) => {
        this.swapLoading = true;
        let counter = 2;
        const done = (c) => {
          if (c === 0) {
            // I added a timeout because the json-server does not support successive requests
            setTimeout(() => {
              this.$emit('swap-task');
              this.swapLoading = false;
            }, 1000);
          }
        };

        http.patch(`todos/${this.item.id}`,
          { order: this.nextItem.order }).then(() => {
          counter -= 1;
          done(counter);
        }).catch((err1) => {
          reject(err1);
        });

        http.patch(`todos/${this.nextItem.id}`,
          { order: this.item.order }).then(() => {
          counter -= 1;
          done(counter);
        }).catch((err2) => {
          reject(err2);
        });
      });
    },
  },
};
</script>

<style>
  .text-danger{
    font-size: 1.5rem;
  }

  .text-danger:hover {
    text-decoration: none;
  }

  .swap-block {
    position: absolute;
    bottom: -4px;
    left: 10%;
    z-index: 10;
  }

  .swap-spinner {
    position: absolute;
    bottom: -4px;
  }

  .sort-icon {
    width: 20px;
    height: 20px;
  }
</style>

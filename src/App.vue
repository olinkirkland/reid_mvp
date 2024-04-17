<template>
  <!-- modal overlay for a selected result -->
  <div class="modal-overlay" v-if="selectedResult">
    <panel class="modal">
      <button type="button" @click="selectedResult = null">X</button>
      <h2>{{ selectedResult.title }}</h2>
      <pre>{{ JSON.stringify(selectedResult, null, 2) }}</pre>
    </panel>
  </div>

  <!-- search container -->
  <div class="container">
    <panel>
      <div class="row">
        <input type="text" v-model="searchTerm" placeholder="Search term" />
        <button type="button" @click="search">Submit</button>
      </div>
    </panel>
    <panel class="results" v-if="results.length">
      <div class="grid">
        <panel
          v-for="result in results"
          :key="result.index"
          @click="selectedResult = result"
        >
          <!-- <h2>{{ result.title }}</h2> -->
          <!-- <pre>{{ JSON.stringify(result, null, 2) }}</pre> -->
          <img :src="result.image.full" :alt="result.image.alt" />
          <p>{{ result.created_published_date }}</p>
        </panel>
      </div>
    </panel>
    <panel class="results" v-else>
      <p>No results found</p>
    </panel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ItemCatalog from './item-catalog';

const searchTerm = ref('');
const results = ref<ItemCatalog[]>([]);
const selectedResult = ref<ItemCatalog | null>(null);

function search() {
  const url = `https://loc.gov/pictures/search/?q=${searchTerm.value}&fo=json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      results.value = data.results;
    });
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;

  :deep(.row) {
    width: 100%;
    > input {
      flex: 1;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 1rem;

  > * {
    cursor: pointer;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  > .modal > button {
    margin-left: auto;
  }

  > .panel {
    max-width: 80vw;
    max-height: 80vh;

    :deep(h2) {
      max-width: 100%;
    }

    :deep(pre) {
      max-height: 50vh;
      overflow-y: auto;
    }
  }
}
</style>

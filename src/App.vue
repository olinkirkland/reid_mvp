<template>
  <div class="container">
    <panel>
      <div class="row">
        <input type="text" v-model="searchTerm" placeholder="Search term" />
        <button type="button" @click="search">Submit</button>
      </div>
    </panel>
    <panel class="results" v-if="results.length">
      <div class="grid">
        <panel v-for="result in results" :key="result.index">
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
}
</style>

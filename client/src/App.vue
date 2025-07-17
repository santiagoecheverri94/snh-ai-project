<template>
  <div>
    <h1>Tree API Tester</h1>
    <button @click="fetchTree">Fetch Tree</button>
    <pre class="tree-json">{{ formattedTree }}</pre>

    <h2>Add Node</h2>
    <form @submit.prevent="addNode">
      <input v-model="label" placeholder="Label" required />
      <input v-model.number="parentId" type="number" placeholder="Parent ID (optional)" />
      <button type="submit">Add Node</button>
    </form>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tree = ref([]);
const label = ref('');
const parentId = ref('');
const message = ref('');
const formattedTree = computed(() => JSON.stringify(tree.value, null, 2));

async function fetchTree() {
  const res = await fetch('/api/tree');
  tree.value = await res.json();
}

async function addNode() {
  message.value = '';
  const res = await fetch('/api/tree', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label: label.value,
      parentId: parentId.value === '' ? null : parentId.value
    })
  });
  if (res.ok) {
    message.value = 'Node added!';
    label.value = '';
    parentId.value = '';
    fetchTree();
  } else {
    const err = await res.json();
    message.value = err.error || 'Failed to add node';
  }
}
</script>

<style>
.tree-json {
  text-align: left;
  margin: 1em auto;
  padding: 1em;
  background: #f9f9f9;
  border-radius: 4px;
  font-family: 'Consolas';
  white-space: pre;
  display: block;
  width: 90%;
  max-width: 600px;
  max-height: 350px;
  overflow: auto;
  box-sizing: border-box;
}
</style>

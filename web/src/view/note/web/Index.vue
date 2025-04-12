<script setup>
import { ref } from 'vue';

const notes = ref([]);
const newNote = ref('');

function addNote() {
    if (newNote.value) {
        notes.value.push(newNote.value);
        newNote.value = '';
    }
}
</script>

<template>
  <div>
    <h1>WEB笔记管理</h1>
    <input v-model="newNote" placeholder="输入新笔记" />
    <button @click="addNote">添加笔记</button>
    <ul>
      <li v-for="(note, index) in notes" :key="index">{{ note }}</li>
    </ul>
  </div>
</template>

<style scoped>
/* 添加一些基本样式 */
input {
    margin-right: 10px;
}
</style>
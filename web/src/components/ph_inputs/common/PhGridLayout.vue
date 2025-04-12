<script setup>

</script>

<template>
  <div class="ph_grid_layout">
    <slot></slot>
  </div>
</template>

<style scoped>
  .ph_grid_layout{
    display: grid;
    grid-gap: 10px;
    grid-column: span 2;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
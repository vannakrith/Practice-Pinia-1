<template>
  <div class="container">

    <div class="add-task-form-container">
      <AddTaskForm/>
    </div>

    <div class="display-task">
      <DisplayTask/>
    </div>
    

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddTaskForm from './components/AddTaskForm.vue';
import DisplayTask from './components/DisplayTask.vue';
import { useTaskStore } from './stores/TaskStore';
import { storeToRefs } from 'pinia';


</script>

<style scoped>


</style>
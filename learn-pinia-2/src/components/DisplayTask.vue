<template>

    <div class="top-container">
        <div class="filter-task">
        <button 
            @click="showAllTasks"
            :class="{'active-button':filterTask === 'All'}"
        >All tasks
        </button>

        <button 
            @click="showOnlyCompletedTasks"
            :class="{'active-button' : filterTask === 'Completed'}"
        >Completed tasks
        </button>
    </div>

    <!--Display all tasks-->
    <div 
      v-if="filterTask === 'All'"
      class="display-tasks-container">
        <p v-if="tasks.length <= 1">There is {{ countAllTasks }} task</p>
        <p v-else>There are {{ countAllTasks }} tasks</p>
        <li 
            v-for="task in tasks"
            class="display-tasks"
            :key="task.id"
        >
        <input 
            type="checkbox"
            v-model="task.isComplete"
        >
        <span :class="{'completed' : task.isComplete}">{{ task.text }}</span>
        <button @click="deleteTask(task.id)">x</button>
        </li>
    </div>
    <div>  
    </div>

    <!--Display only completed tasks-->
    <div 
      v-if="filterTask === 'Completed'"
      class="display-tasks-container">
      <p v-if="completedTasks.length <= 1">You completed {{ countCompletedTasks }} task</p>
      <p v-else>You completed {{ countCompletedTasks }} tasks</p>

      <li 
            v-for="task in completedTasks"
            class="display-tasks"
            :key="task.id"
        >
        <input 
            type="checkbox"
            v-model="task.isComplete"
        >
        <span :class="{'completed' : task.isComplete}">{{ task.text }}</span>
        <button @click="deleteTask(task.id)">x</button>
        </li>
    </div>
    </div>



</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/TaskStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const taskStore = useTaskStore();
const {deleteTask} = taskStore;

const {tasks, countAllTasks, completedTasks, countCompletedTasks} = storeToRefs(taskStore);
//Store refs from store to reactive

const filterTask = ref<string>('All');
const showAllTasks = () => {
  filterTask.value = 'All'
}
const showOnlyCompletedTasks = () => {
  filterTask.value = 'Completed'
}

onMounted(() => {
    // getAllTasks();
    console.log('from child, onMounted');
})


</script>

<style scoped>

button {
    cursor: pointer;
}

li {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px; 
    margin-bottom: 4px;
}

[type="checkbox"] {
    cursor: pointer;
}

.completed {
    text-decoration: line-through;
}

.filter-task {
  display: flex;
  justify-content: space-between;
}

.active-button {
    background-color: blue;
    color: white;
    border: 1px solid rgb(78, 141, 222);
}

</style>
<template>
    <div class="form">
        <form
            @submit.prevent="addTask"
        >
            <input v-model="todoInput" type="text">
            <button class="add-task-btn">Add Task</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/TaskStore';
import { storeToRefs } from 'pinia';
import type { ITask } from '@/interface/ITask';

const taskStore = useTaskStore();
//Make stores to ref, so we don't need to mention taskStore.value in store anymore
const {
    //State
    todoInput,

    //Getters
} = storeToRefs(taskStore);

//Make the actions destruring form
const {addTask} = taskStore;


</script>

<style scoped>

button {
    cursor: pointer;
}

.add-task-btn {
    margin-left: 8px;
}

.form {
    margin-bottom: 8px;
}

</style>
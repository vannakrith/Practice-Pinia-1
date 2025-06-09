<template>
    <div class="form">
        <form
            @submit.prevent="handleAddTask"
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
import { ref } from 'vue';

const todoInput = ref<string>('');

const taskStore = useTaskStore();
//Make stores to ref, so we don't need to mention taskStore.value in store anymore
const {
    //State

    //Getters
} = storeToRefs(taskStore);

//Make the actions destruring form
const {addTask} = taskStore;

const handleAddTask = () => {
    if(todoInput.value !== '') {
        addTask(todoInput.value)
    }
    todoInput.value = '';
}

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
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ITask } from '@/interface/ITask'


const LOCAL_STORAGE_KEY = 'tasks';

export const useTaskStore = defineStore('taskStore', () => {

  //State

  const tasks = ref<ITask[]>(
      // Load tasks from localStorage or start with empty array
   JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
  )
  

  //Getters

  //Save to localStorage whenever tasks change

  watch(tasks, (newTasks) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }, {deep: true}) //Detect changes inside the array and obj, like changes when add new item, delete item, changing obj property (Like toggle to complete task), whole arr replaced

  const countAllTasks = computed(() => {
    console.log('all tasks amount: ', tasks.value.length );
    return tasks.value.length
  })

  const countCompletedTasks = computed(() => 
    tasks.value.reduce((accumulator:number, currentValue:ITask) => currentValue.isComplete ? accumulator + 1 : accumulator,0)
  )

  const completedTasks = computed(() => {
   return tasks.value.filter(task => task.isComplete)
  })

   

  //Actions


  const addTask = (taskText: string) =>  {
    const newTask : ITask = {
      id: Math.floor(Math.random() * 10000000),
      text: taskText,
      isComplete: false
    }
      if(taskText.trim() !== '') {
          tasks.value.push(newTask)
          console.log('task added:', tasks.value);
      } 
  }

  const deleteTask = (taskId: number) => {
      tasks.value = tasks.value.filter(task => task.id !== taskId)
  }


  //Return values
  return { 
    //State
    tasks,
    
    //Getters
    countAllTasks,
    completedTasks,
    countCompletedTasks,

    //Actions
    addTask,
    deleteTask,
  }
})

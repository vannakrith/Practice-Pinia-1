import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ITask } from '@/interface/ITask'


export const useTaskStore = defineStore('taskStore', () => {

  //State

  const todoInput = ref<string>('');
  const tasks = ref<ITask[]>([
    // {
    //   id: 1,
    //   text: 'default value in tasks',
    //   isComplete: false
    // }
  ])
  

  //Getters
  const countAllTasks = computed(() => {
    console.log('all tasks amount: ', tasks.value.length );
    return tasks.value.length
  })

  const countCompletedTasks = computed(() => 
    tasks.value.reduce((accumulator, currentValue) => currentValue.isComplete ? accumulator + 1 : accumulator,0)
  )

  const completedTasks = computed(() => {
   return tasks.value.filter(task => task.isComplete)
  })

   

  //Actions
  
  const getAllTasks = async () => {
    try {
      const res = await fetch('http://localhost:3000/tasks/')
      const data = await res.json()
      tasks.value = data
      if(!res.ok) throw new Error('error cannot fetch api get all tasks')
    } catch (error) {
      console.error('fail fetch api get all tasks', error)
    }
  }

  const addTask = async () =>  {
    const newTask : ITask = {
      id: Math.floor(Math.random() * 10000000),
      text: todoInput.value,
      isComplete: false
    }

    try {
      const res = await fetch ('http://localhost:3000/tasks/', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {'Content-Type': 'application/json'}
      })

      if(!res.ok) throw new Error('cannot add task, fail api call')
      if(todoInput.value.trim() !== '') {
          tasks.value.push(newTask)
          todoInput.value = '';
          console.log('task added:', tasks.value);
      }
      
    } catch (error) {
      console.error('error add task', error)
    }

  }

  const deleteTask = async (taskId: number) => {

    try {
      const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
      })
      if(!res.ok) throw new Error('fail api cannot delete')
      tasks.value = tasks.value.filter(task => task.id !== taskId)
      getAllTasks();
      
    } catch (error) {
      console.error('fail cannot delete task', error)
    }

  }


  //Return values
  return { 
    //State
    todoInput,
    tasks,
    
    //Getters
    countAllTasks,
    completedTasks,
    countCompletedTasks,

    //Actions
    addTask,
    deleteTask,
    getAllTasks,
   
  }
})

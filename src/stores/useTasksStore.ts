import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { Task } from '../types/tasks';

interface TasksStore {
  tasks: Task[] | null;
  completedTasks: string[];
  setTasks: (tasks: Task[]) => void;
  setCompletedTasks: (newCompletedTask: string[]) => void;
  addCompletedTask: (completedTaskId: string) => void;
}

export const useTasksStore = create(
  subscribeWithSelector<TasksStore>(set => ({
    tasks: null,
    completedTasks: [],

    setTasks: tasks => set({ tasks }),
    setCompletedTasks: tasks => set({ completedTasks: tasks }),
    addCompletedTask: completedTaskId => set(store => ({ completedTasks: [...store.completedTasks, completedTaskId] })),
  })),
);

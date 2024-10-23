import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { Task } from '../types/tasks';

interface TasksStore {
  tasks: Task[] | null;
  setTasks: (tasks: Task[]) => void;
}

export const useTasksStore = create(
  subscribeWithSelector<TasksStore>(set => ({
    tasks: null,

    setTasks: newTasks => set({ tasks: newTasks }),
  })),
);

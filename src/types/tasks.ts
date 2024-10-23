export interface Task {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  href: string;
  reward: number;
  completed: boolean;
}

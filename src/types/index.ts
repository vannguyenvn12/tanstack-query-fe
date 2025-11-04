export interface User {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  ownerId: number | null;
  taskCount?: number; // Optional, included when fetching with includeTaskCount
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  assigneeId: number | null;
}


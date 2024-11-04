export interface Todo {
    partitionKey: string;
    rowKey: string;
    title: string;
    isCompleted: boolean;
    createdAt: string;
  }
  
  export interface CreateTodoInput {
    title: string;
  }
  
  export interface UpdateTodoInput {
    title?: string;
    isCompleted?: boolean;
  }
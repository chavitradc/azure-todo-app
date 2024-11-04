import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';
const API_URL = process.env.NEXT_PUBLIC_API_URL
const DELETE_KEY = process.env.NEXT_PUBLIC_DELETE_KEY
const UPDATE_KEY = process.env.NEXT_PUBLIC_PUT_KEY
const POST_KEY = process.env.NEXT_PUBLIC_POST_KEY
const GET_KEY = process.env.NEXT_PUBLIC_GET_KEY
export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/api/todos?code=${GET_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const response = await fetch(`${API_URL}/api/todos?code=${POST_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  async updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
    
    const response = await fetch(`${API_URL}/api/todos/${id}?code=${UPDATE_KEY}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/todos/${id}?code=${DELETE_KEY}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};
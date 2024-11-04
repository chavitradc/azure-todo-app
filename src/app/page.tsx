/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react';
import { TodoItem } from './components/todoItem';
import { TodoForm } from './components/todoForm';
import { todoService } from './services/todoService';
import { Todo } from './types/todo';
import { Loader2 } from 'lucide-react';
import { SiAzurefunctions, SiMicrosoftazure } from "react-icons/si";
import Image from 'next/image';
type Filter = 'all' | 'completed' | 'incomplete';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async (title: string) => {
    if (todos.length >= 15) {
      setError('You cannot add more than 15 tasks. Please delete an existing task before adding a new one.');
      return;
    }

    try {
      const newTodo = await todoService.createTodo({ title });
      setTodos((prev) => [...prev, newTodo]);
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { isCompleted: completed });
      setTodos((prev) =>
        prev.map((todo) => (todo.rowKey === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.rowKey !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.isCompleted;
    if (filter === 'incomplete') return !todo.isCompleted;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>

          <TodoForm onSubmit={handleCreateTodo} />

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`px-4 py-2 rounded ${filter === 'incomplete' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter('incomplete')}
            >
              Incomplete
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No todos yet. Add one above!</p>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.rowKey}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Created By Section */}
        <footer className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-5">
            <p className="text-gray-600">Created by</p>
            <div>
              <SiAzurefunctions className="text-blue-500 w-10 h-10" title="Azure Functions" />
            </div>
            <div>
              <SiMicrosoftazure className="text-blue-500 w-10 h-10" title="Microsoft Azure" />
            </div>
            <div>
              <Image
                src="./Table.svg"
                alt="Azure Table Storage"
                width={40}
                height={40}
                className="object-contain"
                title='Azure Table Storage'
              />
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}

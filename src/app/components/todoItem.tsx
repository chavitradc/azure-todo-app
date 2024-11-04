import React from 'react';
import { Todo } from '../types/todo';
import { Trash2, Check, X } from 'lucide-react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => onToggle(todo.rowKey, !todo.isCompleted)}
                    className={`p-2 rounded-full ${todo.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    {todo.isCompleted ? <Check size={20} /> : <X size={20} />}
                </button>
                <span className={`text-gray-800 ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.rowKey)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};
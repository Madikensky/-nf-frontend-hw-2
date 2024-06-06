'use client';
import Image from 'next/image';
import { useState } from 'react';
import TaskItem from './components/TaskItem';
import TaskList from './components/TaskList';

const task = { id: 1, text: 'Todo Test', completed: false };
let idx = task.id + 1;

export default function Home() {
  const [allTasks, setAllTasks] = useState([task]); // rewrite using states
  const [newTask, setNewTask] = useState({});
  const [filter, setFilter] = useState('all'); // rewrite using states

  const handleChange = ({ target }) => {
    setNewTask((prev) => ({
      ...prev,
      id: idx,
      text: target.value,
      completed: false,
    }));
  };

  const handleAddTask = () => {
    // Implement add task logic here
    idx++;
    setAllTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTask({});
  };

  const handleToggleTask = (e) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === e.id ? { ...task, completed: !task.completed } : task
      )
    );
    console.log(e);
  };

  const handleDeleteTask = (handleTask) => {
    // Implement delete task logic here
    setAllTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== handleTask.id)
    );
  };

  const showAll = () => {
    setFilter('all');
  };

  const showActive = () => {
    setFilter('active');
  };

  const showCompleted = () => {
    setFilter('completed');
  };

  const filteredArr = allTasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'active') {
      return !task.completed;
    }
    return true;
  });

  const clearCompleted = () => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          onChange={handleChange}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <TaskList
          filteredArr={filteredArr}
          handleDeleteTask={handleDeleteTask}
          handleToggleTask={handleToggleTask}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {filteredArr.length} items left</span>{' '}
          {/* show how many uncompleted items left */}
          <div>
            <button
              onClick={showAll}
              className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}
            >
              All
            </button>
            <button
              onClick={showActive}
              className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}
            >
              Active
            </button>
            <button
              onClick={showCompleted}
              className={`${filter === 'completed' ? 'text-white' : ''}`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}

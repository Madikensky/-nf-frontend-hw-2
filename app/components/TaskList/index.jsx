import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({ filteredArr, handleDeleteTask, handleToggleTask }) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  return (
    <ul>
      {filteredArr.map((task, id) => (
        <TaskItem
          task={task}
          id={id}
          key={id}
          handleDeleteTask={handleDeleteTask}
          handleToggleTask={handleToggleTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;

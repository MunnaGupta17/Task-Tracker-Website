import React from 'react';
import './TasksList.css';
import { useState, useEffect } from 'react';

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null); // Task being edited
  const [deleteTaskId, setDeleteTaskId] = useState(null); // Task to be deleted

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://task-tracker-rest-api-production.up.railway.app/tasks');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleEditClick = (task) => {
    setEditTask(task);
  };

  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      const response = await fetch(`https://task-tracker-rest-api-production.up.railway.app/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Update the task in the local state
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );

      setTasks(updatedTasks);
      setEditTask(null); // Close the edit dialog
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTaskId) {
      try {
        const response = await fetch(`https://task-tracker-rest-api-production.up.railway.app/tasks/${deleteTaskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        // Remove the deleted task from the local state
        const updatedTasks = tasks.filter((task) => task.id !== deleteTaskId);
        setTasks(updatedTasks);
        setDeleteTaskId(null); // Close the delete confirmation
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className='tasksListContainer'>
      <h2>Tasks List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleEditClick(task)}>Edit</button>
            <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <label>Title:</label>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            />
            <label>Description:</label>
            <input
              type="text"
              value={editTask.description}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            />
            <label>Status:</label>
            <input
              type="text"
              value={editTask.status}
              onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
            />
            <button onClick={() => handleSaveEdit(editTask)}>Save</button>
            <button onClick={() => setEditTask(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Task Confirmation */}
      {deleteTaskId && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this task?</p>
            <button onClick={handleDeleteConfirm}>Yes</button>
            <button onClick={() => setDeleteTaskId(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );

}

export default TasksList;
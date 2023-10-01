import React from 'react';
import './AddTask.css';
import { useState} from 'react';

const AddTask = ({ onAddTask }) => {
    
    const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "IN_PROGRESS",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty fields before adding the task
    if (!task.title.trim() || !task.description.trim()) {
        alert("Please fill in all fields.");
        return;
      }
    onAddTask(task);
    setTask({
      title: "",
      description: "",
      status: "IN_PROGRESS",
    });
    setShowForm(false);
  };

  return (
    <div>
      <button className='addTaskButton' onClick={toggleForm}>Add Task</button>
      {showForm && (
        <form className='AddTaskFrom' onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
          />

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleInputChange}
          >
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );

}

export default AddTask;
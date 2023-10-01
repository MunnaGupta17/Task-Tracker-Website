import './App.css';
import Header from './Components/Header';
import TasksList from './Components/TasksList';
import AddTask from './Components/AddTask';
import { useState} from 'react';


function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    // Send a POST request to your API to add the task to the database
    fetch("https://task-tracker-rest-api-production.up.railway.app/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task added successfully:", data);

        // Update the local state with the newly added task
        setTasks([...tasks, data]);

        // Clear the form fields (if needed)
        // setTask({
        //   title: "",
        //   description: "",
        //   status: "IN_PROGRESS",
        // });
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div className="App">
      <Header />
      <AddTask  onAddTask={addTask}/>
      <TasksList />
    </div>
  );
}

export default App;

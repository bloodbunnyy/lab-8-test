import { useState, useEffect } from "react";


function Task(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(props.task.extraText || "");
  

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleCheckboxChange = () => {
    const updatedTask = {
      ...props.task,
      completed: !props.task.completed,
    };

  };

  const saveExtraText = () => {
    const updatedTask = {
      ...props.task,
      extraText: text,
    };

    fetch(`http://localhost/api/tasks/${props.task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .then(() => {
        props.setTasks((tasks) =>
          tasks.map((task) => {
            if (task.id === props.task.id) {
              return { ...task, extraText: text };
            } else {
              return task;
            }
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost/api/tasks/${props.task.id}`, {
      method: "DELETE",
    })
      .then(() => {
        props.setTasks((tasks) => tasks.filter((task) => task.id !== props.task.id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <li className="listtask">
      <button type="button" onClick={handleDelete}>
        X
      </button>
      <div className="task-content" onClick={toggleAccordion}>
        <span className="desc">{props.task.description}</span>
        <input type="checkbox" checked={props.task.completed} onChange={handleCheckboxChange} />
      </div>
      {isOpen && (
        <div className="task-text">
          <textarea
            type="text"
            placeholder="Additional content" name ={`extra-${props.id}`}
            value={ props.task.extraText }
            onChange={handleTextChange}
          />
          <button onClick={saveExtraText}>Submit</button>
        </div>
      )}
    </li>
  );
}

function List(props) {
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost/api/tasks")
      .then(response => response.json())
      .then(data => {
        props.setTasks(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const addNewTask = () => {
    fetch("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask, completed: false }),
    })
      .then(response => response.json())
      .then(data => {
        props.setTasks((prevTasks) => [...prevTasks, data]);
        setNewTask("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>{props.heading}</h1>
      <input type="text" placeholder="Add a new task" value={newTask} onChange={handleNewTaskChange} />
      <button type="button" onClick={addNewTask}>
        Add
      </button>
      <ul>
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            setTasks={props.setTasks}
            task={task}
          />
        ))}
      </ul>
    </div>
  );
}

export default List;
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function CreateTask() {
  const [todo, setTodo] = useState({
    task: "",
  });

  const handleInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this task?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, submit the form
        submitForm();
      }
    });
  }

  function submitForm() {
    axios
      .post("http://localhost:4000/todo", todo)
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Success!",
          text: "Task added successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        // Clear the input field after successful submission
        setTodo({
          task: "",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add task. Please try again.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  }

  return (
    <>
      <div className="flex items-center justify-center mt-1 mb-1">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a new Task"
            onChange={handleInput}
            name="task"
            value={todo.task}
            className="px-4 py-2 border rounded-l focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateTask;

/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Tasks() {

  // get all tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/todo");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  // delete a task
  const DeleteTask = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this task!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:4000/todo/${taskId}`);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // update a task
  const UpdateTask = async (taskId) => {
    try {
      const { value: updatedTask } = await Swal.fire({
        title: 'Update Task',
        input: 'text',
        inputValue: tasks.find(task => task._id === taskId).task, 
        inputPlaceholder: 'Enter the updated task',
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a task';
          }
        }
      });

      if (updatedTask) {
        await axios.patch(`http://localhost:4000/todo/${taskId}`, { task: updatedTask });
        Swal.fire('Success', 'Task updated successfully.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Task
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((item) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{item.task}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => UpdateTask(item._id)}>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    Update
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => DeleteTask(item._id)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tasks;

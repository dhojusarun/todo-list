import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../store/ToDoProvider";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

function ToDo() {
  const [text, setText] = useState("");
  // Get today's date for the input
  const today = new Date().toISOString().split("T")[0];
  const [targetDate, setTargetDate] = useState(today);

  const { state, dispatch } = useContext(TodoContext); 
  const Navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-200 via-green-100 to-red-300 p-5 md:p-30 min-h-screen">
      {/* ADAPTABILITY: Changed w-[800px] to max-w-[800px] w-full to prevent mobile overflow */}
      <div className="bg-amber-700 p-5 max-w-[800px] w-full m-auto mt-10 text-white space-y-5 ">
        <div className="space-y-3">
          <h1 className="text-3xl">Todo List</h1>
          <p>A Simple React Todo list app</p>
          <hr />
        </div>
        <div>
          <label className="space-y-4" htmlFor="todo">
            New Todo
            <br />
            <input
              className="outline-none border p-4 w-full md:w-96 text-black"
              type="text"
              placeholder="New todo"
              required 
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <br />
            {/* Target Date Input */}
            <div className="mt-4">
               <p className="mb-1">Target Completion Date</p>
               <input 
                type="date"
                min={today}
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="outline-none border p-2 w-full md:w-96 text-black"
               />
            </div>
            <br />
            <button
              onClick={() => {
                // 1. Length Check
                if (text.trim().length <= 2) {
                  toast.info(" Plz Enter more than 2 character todo ", {
                    position: "top-right",
                    autoClose: 800,
                    theme: "dark",
                    transition: Zoom,
                  });
                  return;
                }

                // 2. Duplicate Check (Case-Insensitive)
                const isDuplicate = state.some(
                  (todo) => todo.text.toLowerCase() === text.trim().toLowerCase()
                );

                if (isDuplicate) {
                  toast.error("This task already exists!", {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "dark",
                  });
                  return;
                }

                // 3. Add Todo
                dispatch({
                  type: "Add",
                  payload: { 
                    id: uuidv4(),
                    text: text.trim(),
                    isRead: false,
                    createdAt: new Date().toLocaleString(),
                    dueDate: targetDate
                  },
                });

                setText("");
                setTargetDate(today);
              }}
              className="border p-3"
            >
              Add ToDo
            </button>
          </label>
        </div>
        <div className="space-y-2">
          {state.length > 0 ? (
            <div className="space-y-2">
              {state.map((todo) => {
                return (
                  <div
                    key={todo.id}
                    className="list todo bg-[rgb(157,109,109)] p-5 flex justify-between px-5 md:px-10 items-center"
                  >
                    <div className="flex gap-x-2 items-center">
                      <input
                        onChange={() => {
                          dispatch({ 
                            type: "EditRead",
                            payload: { id: todo.id, isRead: !todo.isRead },
                          });
                        }}
                        className="w-5 h-5 accent-amber-900 cursor-pointer"
                        type="checkbox"
                        checked={todo.isRead}
                      />
                      <div>
                        <h1 
                          className={todo.isRead ? "line-through text-xl md:text-2xl font-bold" : "text-xl md:text-2xl font-bold"} 
                        >
                          {todo.text}
                        </h1>
                        {/* Date Display */}
                        <p className="text-[10px] opacity-70">
                          Added: {todo.createdAt} | <span className="text-red-200">Due: {todo.dueDate}</span>
                        </p>
                      </div>
                    </div>
                    <div className="space-x-3 flex shrink-0">
                      <button
                        onClick={() => {
                          Navigate("/editTodo", { state: todo });
                        }}
                      >
                        <FaEdit size={25} />
                      </button>
                      <button
                        onClick={() => {
                          dispatch({
                            type: "Delete",
                            payload: { id: todo.id },
                          });
                        }}
                      >
                        <MdDelete size={25} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-xl p-5 bg-[rgb(157,109,109)]">
                There is no todo to show!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
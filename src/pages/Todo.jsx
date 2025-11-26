import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../store/ToDoProvider";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

function ToDo() {
  const [text, setText] = useState("");
  const { state, dispatch } = useContext(TodoContext); // dispatch function is used to send actions to the reducer to update the state. state holds the current list of to-do items. 
  const Navigate = useNavigate();

  console.log(state);

  return (
    <div className="bg-gradient-to-r from-blue-200 via-green-100 to-red-300 p-30 max-h-full">
      <div className="bg-amber-700 p-5 w-[800px] m-auto mt-10 text-white space-y-5 ">
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
              className=" outline-none border p-4 w-96 text-black"
              type="text"
              placeholder="New todo"
              required // The required attribute ensures that the input field must be filled out before the form can be submitted.
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <br />
            <button
              onClick={() => {
                if (text.length > 2) {
                  dispatch({
                    type: "Add",
                    payload: { // payload contains the data needed to perform the action.
                      id: uuidv4(),
                      text: text,
                      isRead: false,
                    },
                  });

                  setText("");
                } else {
                  toast.info(" Plz Enter more than 2 character todo ", {
                    position: "top-right",
                    autoClose: 800,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Zoom,
                  });
                }
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
                    className="list todo bg-[rgb(157,109,109)] p-5 flex justify-between px-10 items-center"
                  >
                    <div className="flex gap-x-2 items-center">
                      <input
                        onChange={() => {
                          dispatch({    // dispatch function is used to send actions to the reducer to update the state. 
                            type: "EditRead",
                            payload: { id: todo.id, isRead: !todo.isRead },
                          });
                        }}
                        className="w-5 h-5 accent-amber-900 cursor-pointer"
                        type="checkbox"
                        checked={todo.isRead}
                      />
                      {/* CORRECTED LINE: Removed the outer backticks and used the ternary operator inside the JSX curly braces {} */}
                      <h1 
                        className={todo.isRead ? "line-through text-2xl font-bold" : "text-2xl font-bold"} 
                      >
                        {todo.text}
                      </h1>
                    </div>
                    <div className="space-x-3">
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
                            payload: {
                              id: todo.id,
                            },
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
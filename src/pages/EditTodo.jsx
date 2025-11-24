import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TodoContext } from "../store/ToDoProvider";

function EditTodo() {
  const location = useLocation();
  const [text, setText] = useState(location.state.text);  
  const { state, dispatch } = useContext(TodoContext);
  const Navigate =useNavigate()
  console.log(location.state);
  return (
    <div >
      <div className="m-auto w-96 mt-40 p-10 text-center text-2xl shadow-2xl shadow-red-300 bg-gradient-to-r from-blue-200 via-green-100 to-red-300">
        <label className="space-y-4 text-center " htmlFor="todo" >
          <h1 className="space-y-4  font-medium">Update Todo </h1>
          <input
            className=" outline-none shadow-2xl shadow-amber-200 border p-2 w-80"
            type="text"
            value={text}
            placeholder="New todo"  
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <br />
          <button
            onClick={() => {
              dispatch({
                type: "Update",
                payload: {
                    id: location.state.id,
                    text: text,
                },
              });
              Navigate('/todo')
            }}
            className="border p-1 shadow-2xl shadow-amber-200"
          >
            Update
          </button>
        </label>
      </div>
    </div>
  );
}

export default EditTodo;
import { createContext, useEffect, useReducer } from "react";
import { Bounce, Slide, toast, Zoom } from "react-toastify";
export const TodoContext = createContext();
const getTodo=()=>{
  let data = localStorage.getItem("todo")
  return data ? JSON.parse(data):[]
}
const initialState = getTodo(); //initial state is an empty array, indicating that there are no to-do items at the start.
const todoReducer = (state, action) => { //reducer function takes the current state and an action as arguments and returns a new state based on the action type.
  switch (action.type) {  //action.type tells the reducer what kind of action to perform.it is used to determine what kind of action is being dispatched.
    case "Add": {
      // {
      //   id:1,
      //   text:"Hello",
      //   isRead:false
      // }
      // 1.get data from user
      // 2. check that todo exists or not in the state
      // 3.if exist don't do any thing
      // 4.if not exist add that todo to the state
      let isExist = state.find((item) => {     //checks if a to-do item with the same ID already exists in the state.
        return item.id == action.payload.id;  //action.payload.id contains the ID of the to-do item being added. 
      });
      if (isExist) {
        return state;
      } else {
        let newArr = [...state, action.payload];
        toast(" Todo is added ", {
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
        return newArr;
      }
    }

    case "Delete": {
      console.log(action);
      // get id
      // and filter todo except with that id
      let filterToDo = state.filter((item) => { //filters out the to-do item with the specified ID from the state.
        return item.id !== action.payload.id;
      });

      toast.success(" Todo is deleted ", {
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
      return filterToDo;
    }

    case "Update": {
      console.log(action.payload);
      //  first get the  updated todo id and updated text
      // find that id and updated that old text with new text

      let newTodo = state.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              text: action.payload.text,
            }
          : item;
      });

      toast.success(" Todo is updated ", {
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
      return newTodo;
    }

    case "clear": {
      return state;
    }

    case "EditRead": {     
      let newTodo = state.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              isRead: action.payload.isRead,
            }
          : item;
      });

      console.log(newTodo)
      return newTodo;
    }

    default: {
      return state;
    }
  }
};
export const ToDoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState); ////useReducer hook is used to manage the state of the to-do list. It takes the reducer function and the initial state as arguments and returns the current state and a dispatch function.

  useEffect(()=>{
    localStorage.setItem("todo",JSON.stringify(state))
  })
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// In this code, we define a context and a provider for managing a to-do list using the useReducer hook. The todoReducer function handles various actions such as adding, deleting, updating, and marking to-dos as read. The ToDoProvider component wraps its children with the TodoContext.Provider, passing down the current state and dispatch function for managing the to-do list.
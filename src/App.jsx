import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Todo from './pages/Todo.jsx'
import EditTodo from './pages/EditTodo.jsx'
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/edittodo' element={<EditTodo />} />
      </Routes>
    
    </div>
  )
}

export default App

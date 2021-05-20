import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTaks] = useState(false)
  const [tasks, setTasks] = useState([
        
    ]);

    // Delete Task 
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
      console.log('delete ', id);
      setTasks(tasks.filter((task) => task.id !== id))
    }

    // toggle reminder
    const toggleReminder = async(id) => {

      const taskToggle = await fetchTask(id)
      const updatedTask = {...taskToggle, reminder: !taskToggle.reminder }

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedTask)
      })

      const data = await res.json()

      setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }

    // Add task 
    const addTask = async (task) => {

      const res = await fetch('http://localhost:5000/tasks', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(task)})

      const data = await res.json()
      console.log(data)
      setTasks([...tasks, data])

      // const id = Math.floor(Math.random() * 10000) +1
      // const newTask = {id, ...task}
      // setTasks([...tasks, newTask])
    }

    useEffect(() => {
      const getTasks = async () => {
        const result = await fetchTasks()
        setTasks(result)
      }
      getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTaks(!showAddTask)} showAddTask={showAddTask}/>
        
      
      <Route path='/' exact render= {(props) => (
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks'}
        </>
      )}
      />
      <Route path='/about' component={About} />
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
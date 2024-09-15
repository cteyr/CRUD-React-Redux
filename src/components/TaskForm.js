import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import {v4 as uuid} from "uuid";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm () {

    const [task, setTask] = useState({
        tittle: '',
        description: ''
    })

    const dispatch = useDispatch();
    const navegate = useNavigate();
    const params = useParams();
    const tasks = useSelector(state => state.tasks)

    //Funcion para actualizar el estado  (Task) del componente Form
    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //Para evitar que se recargue la pagina

        if(params.id){
            dispatch(editTask(task))
        }else {
            dispatch(addTask({
                ...task,
                id: uuid()
            }))
        }
        navegate('/')
    }

    useEffect(() => {
        if(params.id) {
            setTask(tasks.find((task) => task.id === params.id))
        }
    },[params.id, tasks])

    return (
        <form  onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-2">
            <label htmlFor="tittle" className="block text-xs font-bold mb-2">Task:</label> 
            <input name="tittle" value={task.tittle} type="text" className="w-full p-2 rounded-md bg-zinc-600 mb-2" placeholder="tittle" onChange={handleChange}/>
            <label htmlFor="description" className="block text-xs font-bold mb-2">Description:</label> 
            <textarea name="description" value={task.description} className="w-full p-2 rounded-md bg-zinc-600 mb-2" placeholder="description" onChange={handleChange}></textarea>
            <button className="bg-indigo-600 px-2 py-1">Save</button>
        </form>
    )
}

export default TaskForm
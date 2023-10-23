import { useState } from "react"
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"


const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user}= useAuthContext()

    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const [error,setError]=useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('you must be logged in')
            return
        }

        const workout={title,load,reps}

        const response=await fetch('/api/workouts',{
            method:'POST',
            body: JSON.stringify(workout),
            headers: {
                'content-type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json =await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added',json)
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }

    const backgroudstyle={background:'lightgrey',padding:'20px'}

    return ( 
        <form className="workoutForm" style={backgroudstyle} onSubmit={handleSubmit}>
            <h2>Add a new workout</h2>
            <label>Exercise Title</label>
            <input
                type="text"
                onChange = {(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>load (in Kgs)</label>
            <input
                type="number"
                onChange = {(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Reps</label>
            <input
                type="number"
                onChange = {(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default WorkoutForm;
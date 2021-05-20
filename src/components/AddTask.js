import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        // validation 
        if (!text) {
            alert('Please add task')
            return
        }

        onAdd({text, day, reminder})

        // init
        setText('');
        setDay('')
        setReminder(false);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & FaTimes</label>
                <input type='text' placeholder='Add Day & time' value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>set reminder</label>
                <input type='checkbox' value={reminder}  checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <input type='submit'  value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask

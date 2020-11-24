import React, { useContext, useState } from 'react';
import { TaskListContext } from '../context/TaskListContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const TaskForm = () => {
    const { addTask, clearList} = useContext(TaskListContext);

    const [title, setTitle] = useState('');
    const [state, setState] = useState("0");
    const [dueDate, setStartDate] = useState(new Date());
    const [desc, setDesc] = useState('');


    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleDescChange = e => {
        setDesc(e.target.value);
    };

    const handleSelect = e => {
        setState(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        addTask(title, state, dueDate, desc);
        setTitle('');
        setDesc('');
    };



    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="input-line">
            <input
                onChange={handleChange}
                type="text"
                value={title}
                className="task-input"
                placeholder="Add task title..."
            />
            <div className="task-state"> 
                <select onClick={handleSelect}>
                    <option value='0'>State</option>
                    <option value='Done'>Done</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Pending'>Pending</option>
                    <option value='Postponed'>Postponed</option>
                </select>
                </div>
                <DatePicker className="datePicker" selected={dueDate} onChange={date => setStartDate(date)} />
                </div>
            <div className="input-line">
                <input
                onChange={handleDescChange}
                type="text"
                value={desc}
                className="desc-input"
                placeholder="Add a description..."
            />
            </div>
            <div className="buttons">
                <button type="submit"
                    className="btn add-task-btn"
                >Add Task</button>
                <button className="btn clear-btn" onClick={clearList}>Clear</button>
            </div>
        </form>
    );
};

export default TaskForm;

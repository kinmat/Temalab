import React, { useContext } from 'react';
import TaskPopUp from './TaskPopUp'
import { TaskListContext } from '../context/TaskListContext';

const Task = ({ task }) => {
    const { removeTask, dateFormat } = useContext(TaskListContext);

    return (
        <div>
            <li className="list-item">
                <span>
                    <p className="task-title">{task.title}</p>
                    <p className="task-desc desc"> {task.description}</p>
                </span>
                <div className="state-and-button">           
                    <p className="task-desc">{task.currState}</p>    
                    <p className="task-desc">{dateFormat(task.dueDate)}</p>
                    <TaskPopUp task={task} key={task.id}/>
                    <button className="btn-delete task-btn"
                            onClick= {()=> removeTask(task.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </li>
        </div>
    );
};

export default Task;

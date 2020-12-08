import Popup from "reactjs-popup";
import React, { useContext, useState } from "react";
import { TaskListContext } from "../context/TaskListContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const TaskPopUp = ({ task }) => {
  const { findItem, dateFormat , editTask} = useContext(TaskListContext);
  const [edit, setEdit] = useState(false);
    const [dueDate, setStartDate] = useState(new Date(task.dueDate));
    const [state, setState] = useState(task.currState);
    
    const handleSelect = e => {
    setState(e.target.value);
  };

  var stateEdit;

  if (edit)
    stateEdit = (
      <div>
        <div>
      State : <div className="task-state"> 
             <select onClick={handleSelect}>
                 <option value="0">State</option>
                 <option value="Done">Done</option>
                 <option value="In Progress">In Progress</option>
                 <option value="Pending">Pending</option>
                 <option value="Postponed">Postponed</option>
             </select>
          </div>
        </div>
   Due Date:  <DatePicker className="datePicker" selected={dueDate} onChange={date => setStartDate(date)} />
   <div> Description: {task.description}
        </div>
      </div>
      
    );
  else stateEdit =
    <div>
      <p>State: {task.currState}</p>
      <p>Due date: {dateFormat(task.dueDate)}</p>
    <p>Description: {task.description}</p>
    </div>;

  const changeEdited = () => {
    setEdit(!edit);
  };


  return (
    <Popup
      trigger={
        <button className="btn-edit task-btn" onClick={() => findItem(task.id)}>
          <i className="fas fa-pen"></i>
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> {task.title} </div>
          <div className="content">
            <button className="btn-edit task-btn" onClick={changeEdited}>
              <i className="fas fa-pen"></i>
            </button>
            {stateEdit}
          </div>
          <div className="actions">
                      <button className="button" onClick={() => { close(); setEdit(false); }}> Close </button>
                      <button className="button" onClick={() => { editTask(task.title, task.id, state, dueDate, task.description); setEdit(false); console.log(task.description); }}> Save</button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default TaskPopUp;

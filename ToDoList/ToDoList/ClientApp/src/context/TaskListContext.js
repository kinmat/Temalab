
import React, { createContext, useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid'

export const TaskListContext = createContext();

const TaskListContextProvider = props => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    async function getTasks() {
        const response = await fetch('api/Tasks');
        const data = await response.json();
        setTasks(data);
        return data;
    }

    async function backupTasks(task) {
     /*   var formData = new FormData();
        formData.append('Title', task.title);
        formData.append('CurrState', task.currState);
        formData.append('DueDate', dateFormat(task.dueDate));
        formData.append('Description', task.description);
        */
        let data = JSON.stringify(task);
        console.log(data)
      // let newData = { Title: task.title, Id: task.id, CurrState: task.currState, DueDate: task.dueDate, Description: task.description };
      // newData = JSON.stringify(newData);
      //  console.log(newData);
        fetch('api/Tasks', {
            method: 'POST',
            body: data,
            contentType: 'application/json'
        });
    }

    async function deleteTask(id) {
        fetch(`api/Tasks/${id}`, {
            method: 'DELETE',
        });
    }

    async function updateTask(title, id, state, desc, due) {
        var formData = new FormData();
        formData.append('Title', title);
        formData.append('Id', id);
        formData.append('CurrState', state);
        formData.append('DueDate', dateFormat(due));
        formData.append('Description', desc);
        fetch(`api/Tasks/${id}`, {
            method: 'PUT',
            body: formData,
            contentType: 'application/json'
        });
    }
    
    
    const addTask = (title, state, dueDate, desc) => {
        if (title.trim() && state !== "0") {
            let newTask;
            setTasks([...tasks, newTask = { title, id: uuid(), currState: state, dueDate: new Date(dueDate), description: desc }]);
            backupTasks(newTask);
        }
       
    };

    const removeTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
        deleteTask(id);
    };

    const clearList = () => {
        setTasks([]);
    };

    const findItem = id => {
        return tasks.find(task => task.id === id)
    }


    const dateFormat = due => {
        var d = new Date(due),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const editTask = (title, id, state, dueDate, desc) => {
        console.log(tasks);
         setTasks(tasks.map(task => (task.id === id ? { title, id, state, dueDate, desc } : task)));
         updateTask(title, id, state, desc,dueDate);
       
      }
    

    return <TaskListContext.Provider value={{tasks, addTask, removeTask, clearList, findItem, dateFormat, editTask}}>
        {props.children}
    </TaskListContext.Provider>
      
}; 

export default TaskListContextProvider;

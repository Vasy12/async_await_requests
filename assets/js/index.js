'use strict';
// http://192.168.0.106:3000/tasks
const [postTaskButton] = document.getElementsByTagName('button');
const taskInput = document.querySelector('input[type="text"]');


const state = {
    isFetching: false,
    tasks:[],
    error: null,
};



postTaskButton.onclick = async function () {
    try {

        const {value} = taskInput;
        taskInput.value = '';
        const response = await fetch('http://192.168.0.106:3000/task', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(new Object({
                value
            })), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        });

        if(response.status >=200 && response.status < 300)
        {
            const data = await response.json();
            state.tasks.unshift(data);
            refreshTasksList(state.tasks)
        }
    } catch (e) {
        console.error(e);
    }
};

async function loadAllTasks() {
    try {
        const response = await fetch('http://192.168.0.106:3000/tasks');

        state.tasks = await response.json();
        refreshTasksList(state.tasks);
    } catch (e) {
        state.error = e;
    }
}


function refreshTasksList(tasks){
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = "";
    tasks.forEach( task => {

        const taskListItem = document.createElement("li");
        taskListItem.append(task.value);
        tasksList.append(taskListItem);
    })

}


window.onload = loadAllTasks;


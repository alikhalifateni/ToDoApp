const tasks = []
const taskBtn = document.getElementById('taskBtn')
const input = document.getElementById('input')
const taskList = document.querySelector('.task-list')

document.addEventListener('DOMContentLoaded', () => {
  let storeTasks = JSON.parse(localStorage.getItem('tasks'))
  if (storeTasks) {
    storeTasks.forEach((task) => tasks.push(task))
    updataTaskList()
    updataStats()
  }
})
function saveTask() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
function addTask() {
    tasks.push({title: input.value, completed: false})
    updataTaskList()
    updataStats()
    saveTask()
}

function toogleTaskComplete(index) {
   tasks[index].completed = !tasks[index].completed
   updataStats()
   saveTask()
}
function deleteTask(index) {
  tasks.splice(index, 1)
  updataTaskList()
  updataStats()
  saveTask()
}

function editTask(index) {
  input.value = tasks[index].title
  tasks.splice(index, 1)
  updataTaskList()
  updataStats()
  saveTask()
}

function updataStats() {
  let completedTask = tasks.filter((task) => task.completed).length
  let totelTasks = tasks.length
  let progress = (completedTask / totelTasks) *100
  let progressBar = document.getElementById('progress')
  progressBar.style.width = `${progress}%`
  document.getElementById('numbers').innerText = `${completedTask} / ${totelTasks}`
}
function updataTaskList() {
  taskList.innerHTML = ''
  tasks.forEach((task, index) => {
    let listItem = document.createElement('li')
    
    listItem.innerHTML = `
    <div class="task-item">
        <div class="task ${task.completed === true ? 'completed' :''}">
          <input class='checkbox' type="checkbox" ${task.completed == true ? 'checked' : ''}>
          <p>${task.title}</p>
        </div>
        <div class="icons">
          <img src="edit.png"onclick='editTask(${index})'>
          <img src="bin.png" onclick='deleteTask(${index})'>
        </div>
    </div>
    `
    listItem.addEventListener('change', () => toogleTaskComplete(index))
    
    taskList.appendChild(listItem)
  })
}


taskBtn.onclick = function () {
  if (input.value.trim() !== '') {
    addTask()
    input.value = ''
  }
}


document.querySelector('.lang').addEventListener('click', () => {
document.body.style.direction = 'rtl'
document.querySelector('h1').innerText = 'قائمة المهام'
document.querySelector('.details p').innerText = 'اجعله يرتفع'
document.querySelector('.lang').innerText = 'EN'
document.querySelector('.lang').onclick = function () {
        document.body.style.direction = 'ltr'
document.querySelector('h1').innerText = 'ToDo App'
document.querySelector('.details p').innerText = 'Keep it up!'
document.querySelector('.lang').innerText = 'AR'
}
})



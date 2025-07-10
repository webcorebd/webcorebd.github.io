const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// ✅ LocalStorage থেকে টাস্ক লোড করা
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task));
});

// ✅ টাস্ক সাবমিট করলে সেভ + DOM এ দেখাও
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task) {
    addTaskToDOM(task);
    saveTask(task);
    input.value = '';
  }
});

// ✅ টাস্ক HTML এ দেখানোর ফাংশন
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.textContent = task;

  // 🗑️ ডিলিট বাটন
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(task);
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// ✅ LocalStorage-এ টাস্ক সেভ
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ✅ LocalStorage থেকে টাস্ক ডিলিট
function deleteTask(taskToDelete) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task !== taskToDelete);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoAll = document.querySelector("#todo-all");
const todoQueue = document.querySelector("#todo-queue");
const todoCompleted = document.querySelector("#todo-completed");
const clearBtn = document.querySelector("#clear-btn");
const listContainer = document.querySelector(".list-container");
const emptyEl = document.querySelector(".empty-el");
const emptyList = document.querySelector("#empty-list");
const welcomeUser = document.querySelector("#welcome-user");
const userSideBar = document.querySelector(".user-sidebar");
const logout = document.querySelector("#logout");

const addTodoEl = () => {
  const inputValue = todoInput.value;
  const listDiv = document.createElement("div");
  const checkboxId = Math.random().toString(36).substring(2, 15);
  const todoItem = `<input type="checkbox" name="checkbox-el" id="${checkboxId}" />
  <label for="${checkboxId}"><p class="todo-el">${inputValue}</p></label>
  <button class="delete-btn">-</button>`;

  listDiv.className = "list-el";

  if (inputValue == "") {
    swal("Hay Aksi!", "Lütfen yapılacak herhangi bir görev girin", "error");
  } else {
    listDiv.innerHTML = todoItem;
    listContainer.appendChild(listDiv);
    emptyEl.style.display = "none";
    todoInput.value = "";

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTodo = { text: inputValue, isChecked: false };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const renderTodos = (todos) => {
  listContainer.innerHTML = "";
  if (todos.length === 0) {
    emptyEl.style.display = "flex";
  } else {
    todos.forEach((todo, index) => {
      const listDiv = document.createElement("div");
      const checkboxId = Math.random().toString(36).substring(2, 15);
      const isChecked = todo.isChecked ? "checked" : "";
      const todoItem = `<input type="checkbox" name="checkbox-el" id="${checkboxId}" ${isChecked}/>
      <label for="${checkboxId}"><p class="todo-el">${todo.text}</p></label>
      <button class="delete-btn">-</button>`;
      listDiv.className = "list-el";
      listDiv.innerHTML = todoItem;
      listContainer.appendChild(listDiv);
      emptyEl.style.display = "none";
    });
  }
};

const clearAllTodos = () => {
  localStorage.removeItem("todos");
  renderTodos([]);
  listContainer.innerHTML = `<div class="empty-el">
  <p id="empty-list" class="empty-list">
    Yapılacaklar listende hiçbir görev yok.
  </p>`;
  emptyEl.style.display = "flex";
};

const filterTodos = (todos, isChecked) => {
  return todos.filter((todo) => todo.isChecked === isChecked);
};

const handleFilterClick = (isChecked) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const filteredTodos = filterTodos(todos, isChecked);
  renderTodos(filteredTodos);
};

const handleTodoToggle = (e) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const targetCheckboxId = e.target.getAttribute("id");
  todos.forEach((todo) => {
    if (todo.text === e.target.nextElementSibling.textContent) {
      todo.isChecked = e.target.checked;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

const handleTodoDelete = (e) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const targetTodoText = e.target.previousElementSibling.textContent;
  const filteredTodos = todos.filter((todo) => todo.text !== targetTodoText);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  renderTodos(filteredTodos);
  if (filteredTodos.length === 0) {
    emptyEl.style.display = "flex";
  }
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodoEl();
});

addBtn.addEventListener("click", () => {
  addTodoEl();
});

clearBtn.addEventListener("click", () => {
  swal({
    title: "Emin misin?",
    text: "Tüm görevleri silmek istediğinize emin misiniz?",
    icon: "warning",
    buttons: ["Hayır", "Evet"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      clearAllTodos();
      swal("Başarılı!", "Tüm görevler başarıyla silindi", "success");
    } else {
      swal("Görevleriniz silinmedi.");
    }
  });
});

todoAll.addEventListener("click", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  renderTodos(todos);
});

todoQueue.addEventListener("click", () => {
  handleFilterClick(false);
});

todoCompleted.addEventListener("click", () => {
  handleFilterClick(true);
});

listContainer.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    handleTodoToggle(e);
  } else if (e.target.classList.contains("delete-btn")) {
    handleTodoDelete(e);
  }
});

const todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos(todos);

if (localStorage.getItem("Username") == null) {
  welcomeUser.textContent = "Misafir";
} else {
  welcomeUser.innerHTML = `${localStorage.getItem("Username")}`;
}

document.addEventListener("DOMContentLoaded", () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  renderTodos(todos);
});

userSideBar.addEventListener("click", () => {
  const userMenu = document.querySelector(".user-menu");
  if (userMenu.style.display === "none") {
    userMenu.style.display = "flex";
  } else {
    userMenu.style.display = "none";
  }
});

logout.addEventListener("click", () => {
  swal("Çıkış Yaptınız", "Oturumunuz sonlandırılıyor...", "warning");
  setTimeout(() => {
    window.location.replace("index.html");
  }, 3000);
});

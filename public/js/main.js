const deleteBtn = document.querySelectorAll(".del");
const todoItem = document.querySelectorAll("span.not");
const todoComplete = document.querySelectorAll("span.completed");
const editBtn = document.querySelectorAll(".edit");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteTodo);
});

Array.from(todoItem).forEach((el) =>
  el.addEventListener("click", markComplete)
);

Array.from(todoComplete).forEach((el) =>
  el.addEventListener("click", markIncomplete)
);

Array.from(editBtn).forEach((el) => {
  el.addEventListener("click", editTodo);
});

async function deleteTodo() {
  const todoId = this.parentNode.dataset.id;
  try {
    const res = await fetch("todos/deleteTodo", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoIdFromJs: todoId }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/markComplete", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoIdFromJs: todoId }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/markIncomplete", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoIdFromJs: todoId }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function editTodo() {
  // get todo and its value
  const span = this.parentNode.querySelector("span");
  const spanValue = span.innerText;

  // create input and filled spanValue
  const input = document.createElement("input");
  input.type = "text";
  input.value = spanValue;

  // replace span with input
  span.replaceWith(input);
  input.focus();

  // save input change
  input.addEventListener("blur", changeTodo); // run function, if clicked outside input
  input.addEventListener("keydown", function (e) {
    // on enter key
    if (e.key === "Enter") {
      changeTodo();
    }
  });

  async function changeTodo() {
    const todoId = input.parentNode.dataset.id;
    const todoNewValue = input.value.trim();
    if (todoNewValue === "") return; // prevent empty values
    try {
      const res = await fetch("/todos/editTodo", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoIdFromJS: todoId, todoItem: todoNewValue }),
      });
      const data = await res.json();
      console.log(data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}

let toDo = [];
const addBtn = document.getElementById("add-btn");
const input = document.getElementById("input-el");
const ulEl = document.getElementById("list-content");
const lists = document.getElementsByTagName("li");
let renderCount = 0;
let delItems = [];
const clearBtn = document.getElementById("clear-btn");

function start() {
  const previousList = JSON.parse(localStorage.getItem("List"));
  const delIndex = JSON.parse(localStorage.getItem("delIndex"));
  const deletedItems = localStorage.getItem("itemDeleted");

  if (previousList) {
    toDo = previousList;
    render(toDo, renderCount);
    if (deletedItems) {
      if (delIndex === null) {
        delItems = [];
      } else {
        delItems = delIndex;
      }
      renderDeletedItems(delItems, renderCount);
    }
  }
}
function addItem() {
  if (input.value.trim() != "") {
    toDo.push(input.value);
    localStorage.setItem("List", JSON.stringify(toDo));
    start();
  } else {
    input.parentElement.style.animation = "shake 0.5s 3";
    setTimeout(() => {
      input.parentElement.style.animation = "none";
    }, 1500);
  }
  input.value = "";
}
addBtn.addEventListener("click", addItem);
window.addEventListener("keydown", (e) => {
  if (e.code === "Enter") addItem();
});

clearBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  ulEl.innerHTML = ` <li>
    <em>Lorem ipsum dolor sit.
    </em>
    </li>`;
  toDo = [];
});

function deleteItem(index) {
  listIndex = parseInt(index);
  lists[listIndex].style.textDecoration = "line-through";
  delItems.push(listIndex);
  delItems.sort;
  localStorage.setItem("delIndex", JSON.stringify(delItems));
  localStorage.setItem("itemDeleted", index);
}

function delListItem(count) {
  console.log(count);
  toDo = toDo.filter((item) => {
    if (item !== toDo[count]) return item;
  });
  localStorage.setItem("List", JSON.stringify(toDo));
  start();
}

function render(list, count) {
  let items = "";
  for (; count < list.length; count++) {
    items += `<li>
        ${list[count]}
            <div class="del-btn" onclick="deleteItem(${count})">
            <i class="fa-solid fa-trash-can"></i>
            </div>
            <div class="del-btn red-btn" onclick="delListItem(${count})">
            <i class="fa-solid fa-trash-can"></i>
            </div>
            </li>`;
  }
  clearBtn.style.display = "flex";
  ulEl.innerHTML = items;
}

function renderDeletedItems(arr, count) {
  for (; count < arr.length; count++) {
    lists[arr[count]].style.textDecoration = "line-through";
  }
}
start();

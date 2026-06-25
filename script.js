const itemArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

console.log(itemArray);

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});


function displayitems() {
  let items = "";
  for (let i = 0; i < itemArray.length; i++) {
    items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${itemArray[i]}</textarea>
            <div class="edit-controller">
                <span class="material-symbols-outlined deletebtn">check_circle</span>
                
                <span class="material-symbols-outlined editbtn"> edit_square </span>

            </div>
        </div>
        <div class="update-controller">
            <button class="savebtn">save</button>
            <button class="cancelbtn">cancel</button>
        </div>
    </div>`;
  }
  
   document.querySelector(".to-do-list").innerHTML = items
   activateDeleteListeners()
   activateEditListeners()
   activateSaveListeners()
   activateCancelListeners()
}

//---------------DELETE FUNCTIONS---------------//
function activateDeleteListeners(){
    let deletebtn = document.querySelectorAll(".deletebtn")
    deletebtn.forEach((db, i) => {
        db.addEventListener("click", () => {
            deleteItem(i)
        })
    })
}
function deleteItem(i){
    itemArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemArray))
    location.reload()
}
function createItem(item) {
  itemArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemArray));
  location.reload();
}

// ---------------Edit Function-----------------//
function activateEditListeners(){
    let editbtn = document.querySelectorAll(".editbtn")
    let updateController = document.querySelectorAll(".update-controller")
    let input = document.querySelectorAll(".input-controller textarea")
    editbtn.forEach((eb, i) => {
      eb.addEventListener("click", () => {
        updateController[i].style.display = "block"
        input[i].disabled = false
      })
    })
} 

//----------------Save Function ------------//
function activateSaveListeners(){
  const savebtn = document.querySelectorAll(".savebtn")
  const input = document.querySelectorAll(".input-controller textarea")
  savebtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(input[i].value, i)  // Fixed: Added index [i]
    })
  })
}

function activateCancelListeners(){
  const cancelbtn = document.querySelectorAll(".cancelbtn")
  const updatecontroller = document.querySelectorAll(".update-controller")
  const input = document.querySelectorAll(".input-controller textarea")
  cancelbtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updatecontroller[i].style.display = "none"
      input.disabled = true
    })
  })
}

function updateItem(text, i){
  itemArray[i] = text
  localStorage.setItem("items", JSON.stringify(itemArray))
  location.reload()
}

function displaydate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displaydate();
  displayitems();
};

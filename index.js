const formEventTitle = document.querySelector("#formEventTitle");
const formEventText = document.querySelector("#formEventText");
const dataEvent = document.querySelector(".dataEvent");
const setDate = document.querySelector("#set-date");
const setTime = document.querySelector("#set-time");
const btn = document.querySelector("#form-btn");
const dataReading = document.querySelector(".data-reading");
const calendar = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const infoPage = document.querySelector("#info-page");
let recordId = 0;
let array = [];
let completedArray = [];

window.onload = (show) => {
    showitem();
}
btn.addEventListener("click", () => {
    eventValidation();
    eventCreate();
    showitem();
});
// create an array
const eventCreate = () =>{
    dataReading.textContent = " ";
    const object = {
        id: recordId,
        formEventTitle: formEventTitle.value,
        formEventText: formEventText.value,
        setDate: setDate.value,
        setTime: setTime.value,
    };
    formEventTitle.value = " ";
    formEventText.value = " ";
    setDate.value = " ";
    setTime.value = " ";
    recordId++;
    array.push(object);
    // adding my data to local
    //localStorage.setItem('myEvents', JSON.stringify(array));
    //document.getElementsByClassName('data-entry').innerHTML = localStorage.getItem('myEvents')
    //console.log(localStorage)
}
// data verification
const eventValidation = () => {
    if(formEventTitle.value == ""){
        alert('fill in the part with the note');        
        return false;
    }else if(formEventText.value == ""){
        alert('Fill in the main part');
        return false;
    }else if(setDate.value == ""){
        alert ('Enter the time');
        return false;
    }
}
// mapping the array and adding it dataReading
const showitem = () => {
    dataReading.textContent = "";
    array.map((item, index) => {
        addEventItem(index, item.formEventTitle, item.setDate,item.setTime)
    })
};
const addEventItem = (id, formEventTitle,setDate,setTime) => {
    const eventItem = document.createElement('div')
    eventItem.setAttribute('class', 'event-item')
    eventItem.setAttribute('draggable','true')
    eventItem.setAttribute('ondragstart', 'drag(event)')
    eventItem.setAttribute('id', `${id}`)

    const eventTitle = document.createElement('div')
    eventTitle.setAttribute('class', 'event-title')

    const eventDate = document.createElement('div')
    eventDate.setAttribute('class', 'event-date')

    const eventTime = document.createElement('div')
    eventTime.setAttribute('class', 'event-time')

    eventTitle.textContent = formEventTitle;
    eventDate.textContent = setDate;
    eventTime.textContent = setTime;

    eventItemDelete(eventItem, id)
    eventItem.appendChild(eventTitle);
    eventItem.appendChild(eventDate);
    eventItem.appendChild(eventTime);
    dataReading.appendChild(eventItem);
}
// creates a button in the datareading arrays
const eventItemDelete = (eventItem, id) => {
    let eventDeleteBtn = document.createElement("button");
    eventDeleteBtn.textContent = "Delete";
    eventItem.appendChild(eventDeleteBtn);

    eventDeleteBtn.addEventListener("click", () => {
        array.splice(id, 1)
        showitem();
    })
};
// mapping the array and adding it dataEvent
const showCompletedItems = () => {
    dataEvent.textContent = "";
    completedArray.map((item, index) => {
        addEventCompletedItem(index, item.formEventTitle, item.setDate,item.setTime)
    })
};
const addEventCompletedItem = (id, formEventTitle,setDate,setTime) => {
    const eventCompletedItem = document.createElement('div')
    eventCompletedItem.setAttribute('class', 'event-item')
    eventCompletedItem.setAttribute('draggable','true')
    eventCompletedItem.setAttribute('ondragstart', 'drag(event)')
    eventCompletedItem.setAttribute('id', `item-${id}`)

    const eventTitle = document.createElement('div')
    eventTitle.setAttribute('class', 'event-title')

    const eventDate = document.createElement('div')
    eventDate.setAttribute('class', 'event-date')

    const eventTime = document.createElement('div')
    eventTime.setAttribute('class', 'event-time')

    eventTitle.textContent = formEventTitle;
    eventDate.textContent = setDate;
    eventTime.textContent = setTime;

    eventItemCompletedDelete(eventCompletedItem, id)
    eventCompletedItem.appendChild(eventTitle);
    eventCompletedItem.appendChild(eventDate);
    eventCompletedItem.appendChild(eventTime);
    dataEvent.appendChild(eventCompletedItem);
}
// creates a button in the dataEvents arrays
const eventItemCompletedDelete = (eventCompletedItem, id) => {
    let eventDeleteBtn = document.createElement("button");
    eventDeleteBtn.textContent = "Delete";
    eventCompletedItem.appendChild(eventDeleteBtn);

    eventDeleteBtn.addEventListener("click", () => {
        completedArray.splice(id, 1)
        showCompletedItems();
    })
};
// Drag and drop
function allowDrop(take){
    take.preventDefault();
}
function drag(take){
    take.dataTransfer.setData("ggg",take.target.id);
}
function drop(take){
    take.preventDefault();
    var id = take.dataTransfer.getData("ggg");
    completedArray.push(array[id]);
    showCompletedItems();
 

    array.splice(id,1);
    showitem();

      
   
}













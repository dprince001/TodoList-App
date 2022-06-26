
class NewTask {
    constructor(id, title, description, checked = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isChecked = checked;
    }
}

let allItems = [];
let active, completed;

// allItems[index].isChecked === false ? allItems[index].isChecked = true : allItems[index].isChecked = false;


const mainUL = document.querySelector('.todo--items');
let inputTitle = document.querySelector('.task');
let inputDescription = document.querySelector('.description');
const submitBtn = document.querySelector('.btn');
const tickBtn = document.querySelector('.check');
const delBtn = document.getElementById('del-btn');


// get user input, store object and display
submitBtn.addEventListener('click', addItem);
document.addEventListener('keypress', (e) => {
    if(e.keyCode === 13 || e.which === 13) {
        addItem();
    }
});


function displayFn (arr, ul) {
    arr.forEach(cur => {
        let html, newHtml;
        html = '<li id="item-0"><p class="todo-title">%title%</p></li>';
        
        newHtml = html.replace('%id%', cur.id);
        newHtml = newHtml.replace('%title%', cur.title);
        
        ul.insertAdjacentHTML('beforeend', newHtml);  
    });
}

let ID;

function addItem() {
    if(inputTitle.value !== '' && inputDescription.value !== '') {
    
        // let ID;
        if(allItems.length > 0) {
            ID = allItems[allItems.length - 1].id + 1;
        } else {
            ID = 0;
        }
    
        const newTodo = new NewTask(ID, inputTitle.value, inputDescription.value);
    
        allItems.push(newTodo);


        // replace dummy html        
        let html, newHtml;
        html = '<li id="item-%id%"><input type="checkbox" name="" class="check"><p class="todo-title">%title%</p><div><img src="./img/delete.png" id="del-btn"></div></li>';
    
        newHtml = html.replace('%id%', ID);
        newHtml = newHtml.replace('%title%', inputTitle.value);
        
        mainUL.insertAdjacentHTML('beforeend', newHtml);

        itemsLeft(allItems);
    
        // clear fields
        inputTitle.value = '';
        inputDescription.value = '';
        inputTitle.focus();
    }
}


// event delegation for clicking
mainUL.addEventListener('click', (e) => {

    if(e.target.className.includes('check')) {
        let itemID, idSplit, Id;
        itemID = e.target.parentNode.id; 
        // console.log(itemID);
        idSplit = itemID.split('-');
        Id = +idSplit[1];

        const arr = allItems.map(cur => cur.id);

        allItems[arr.indexOf(Id)].isChecked === false ? allItems[arr.indexOf(Id)].isChecked = true : allItems[arr.indexOf(Id)].isChecked = false;


        // strike through
        let titles = Array.from(document.querySelectorAll('.todo-title'));
        titles[arr.indexOf(Id)].classList.toggle('strike');

        active = allItems.filter(cur => {
            return cur.isChecked === false;
        })
        console.log(active);
        
        completed = allItems.filter(cur => {
            return cur.isChecked === true;
        })
        console.log(completed);
    }
});


// event delegation for delete

mainUL.addEventListener('click', (e) => {

    if(e.target.id.includes('del')){
        let el, elArr, Id;
        el = e.target.parentNode.parentNode.id;
        elArr = el.split('-');
        Id = +elArr[1];
        
        // remove the particular id from the allItems array then remove el from the UI.
        // get index of that particular ID from the current present ids
        let curIDs, index;
        if(allItems.length > 0) {
            curIDs = allItems.map(cur => cur.id);
            index = curIDs.indexOf(Id);
        }
        if(index !== -1) {
            allItems.splice(index, 1);

            function delElseWhere(arr) {
                if(arr.findIndex(cur => cur.id === Id) !== -1) {
                    arr.splice(arr.findIndex(cur => cur.id === Id) ,1);
                }
            }
            delElseWhere(active);
            delElseWhere(completed);
        }
        itemsLeft(allItems);

        document.getElementById(el).remove();

    }
});

function itemsLeft(currArr) {
    if(currArr.length > 0) {
        document.querySelector('.items-left').textContent = currArr.length;
    } else {
        document.querySelector('.items-left').textContent = '0';
    }
} 


// hidden pages 
let allLink = document.querySelector('.link-all');
let allUL = document.querySelector('.todo--items');
let activeLink = document.querySelector('.link-active');
let activeUL = document.querySelector('.active-items');
let completedLink = document.querySelector('.link-completed');
let completedUL = document.querySelector('.completed-items');

// displayFn(active, activeUL);
// displayFn(completed, completedUL);

activeUL.classList.add('hidden');
completedUL.classList.add('hidden');

activeLink.addEventListener('click', () => {
    // clear dom
    activeUL.innerHTML = '';
    displayFn(active, activeUL);

    allUL.classList.add('hidden');
    completedUL.classList.add('hidden');
    activeUL.classList.remove('hidden');

    // display active items left
        itemsLeft(active);
});

allLink.addEventListener('click', () => {
    allUL.classList.remove('hidden');
    activeUL.classList.add('hidden');
    completedUL.classList.add('hidden');

    itemsLeft(allItems);
})

completedLink.addEventListener('click', () => {
    // clear dom
    completedUL.innerHTML = '';
    displayFn(completed, completedUL);

    allUL.classList.add('hidden');
    activeUL.classList.add('hidden');
    completedUL.classList.remove('hidden');

    // display completed items
        itemsLeft(completed);
});


// change background
const bgToggle = document.querySelector('.checkbox');

bgToggle.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('change-bg-color');
    document.querySelector('.container').classList.toggle('change-bg-color');
    document.querySelector('.container').classList.toggle('shadow');
});









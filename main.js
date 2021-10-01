const form =document.querySelector('#form');
const input =document.querySelector('#input');
const todos =document.querySelector('#todos');
const btn_add=document.querySelector('#btn-add')

readLS();


form.addEventListener('submit',function(ev){
    ev.preventDefault();

    addNewTodo();
});
btn_add.addEventListener('click',function(ev){
    addNewTodo();
});

function addNewTodo(text='',isCompleted=false){
    let todoText=input.value;
    if(text){
        todoText=text;
    }
    if(todoText){
        const todoEl=document.createElement('li');
        if(isCompleted){
            console.log('is',isCompleted);
            todoEl.classList.add('completed');
        }
        todoEl.innerHTML=`
        <p>${todoText}</p>
        <button class="btn-base" id="btn-delete">
            <i class="fas fa-trash"></i>
        </button>
        `;
        todoEl.addEventListener('click',function(){
            todoEl.classList.toggle('completed');
            updateLS();
        });

        todoEl.addEventListener('contextmenu',function(ev){
            ev.preventDefault();
            todoEl.remove();
            updateLS();
        });
        const btn_delete=todoEl.querySelector('#btn-delete');
        btn_delete.addEventListener('click',function(){
            todoEl.remove();
            updateLS();
        });


        todos.appendChild(todoEl);
        input.value='';
        updateLS();
    }
}

//讀取LocalStorage
function readLS(){
    const lsTodos=JSON.parse(localStorage.getItem('todos'));
    lsTodos.forEach(function(item){
        // console.log(item['text'],item['completed']);
        addNewTodo(item['text'],item['completed']);
    });
}

//更新LocalStorage
function updateLS(){
    const todosEl=document.querySelectorAll('.todos-container li');
    let todos=[];
    todosEl.forEach(function(item){
        let data={
            text:item.innerText,
            completed:item.classList.contains('completed')
        }
        todos.push(data);
    });

    localStorage.setItem('todos',JSON.stringify(todos));
}
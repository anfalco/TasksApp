document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title: title,
        description: description
    };

    if(localStorage.getItem('tasks') === null) {
        /**SI ESTA VACIO LO CREO COMO ARREGLO */
        let tasks = [];
        //LO LLENO CON PUSH CON UNA TAREA NUEVA
        tasks.push(task);
        //LO ALMACELO EN LOCALSTORAGE
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        //SI EXISTE LAS OBTENGO, ALMACENO EN VARIABLE, ACTUALIZO POR PUSH Y VUELVO A ALMACENAR
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    //cada vez que almacene una tarea para que se actualice, esto despues de crear getTasks
    getTasks();
    //para que se borren los campos despues de agregar una task
    document.getElementById('formTask').reset();
   
    e.preventDefault();


}

function getTasks() {
    //obtengo las tareas
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //obtengo el div de tasks para mostrar
    let tasksView = document.getElementById('tasks');

    //para insertar contenido, primero limpiamos con '' en caso que ya haya datos
    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        //almaceno cada variable 
        let title = tasks[i].title;
        let description = tasks[i].description;
        //dentro del div id tasks creamos html
        tasksView.innerHTML += `
        <div class='card mb-3'>
            <div class='card-body'>
                <p>${title} - ${description}</p>
                <a class='btn btn-danger' onClick="deleteTask('${title}')">
                    Delete
                </a>
            </div>
        </div>`
    }

}

function deleteTask(title) {
 //En el <a> del boton tiene que tener el metido ocnlick con el nombre de la funcion deleteTask
 
 //traigo las tareas
 let tasks = JSON.parse(localStorage.getItem('tasks'));
 for(let i = 0; i < tasks.length; i++) {
     //si el titulo de las tareas en i es igual al title que le paso por la funcion
     if(tasks[i].title == title) {
         //quitamos dato en indice i, 1 dato
        tasks.splice(i, 1);
     }
 }
 //volvemos a almacenar para mostrar sin el dato borrado
 localStorage.setItem('tasks', JSON.stringify(tasks));
 getTasks();
}

getTasks();

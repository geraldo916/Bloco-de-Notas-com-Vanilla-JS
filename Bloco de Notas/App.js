var notasElement = document.getElementById('notas');
var newElBtn = document.getElementById('mais')
var notesStored = JSON.parse(localStorage.getItem('notas')) 


newElBtn.addEventListener('click',()=>{
    cadastrar()
})

notesStored.forEach(note=>{
    cadastrar(note.titulo,note.descricao)
})

function cadastrar(title = '',desc=''){
    var newElement = document.createElement('div');
    newElement.setAttribute('class','nota')
    
    newElement.innerHTML = `
                <div class="cabecalho-note">
                <h2 class="titleHeader"></h2>
                <div class="botoes">
                    <button class="edit"> <i class="fas fa-edit" ></i> </button>
                    <button class="save hidden"> <i class="fas fa-save" ></i> </<button>
                    <button class="apagar"> <i class="fas fa-trash-alt" ></i> </button>  
                </div>
            </div>
            <div class="input hidden">
                <input type="text" name="titulo" class="titulo" placeholder="Titulo">
                <textarea placeholder="Descrição" name="descricao" class="descricao" cols="30" rows="10"></textarea>
            </div>
            <div class="main"></div>
    `
    const editBtn = newElement.querySelector('.edit')
    const saveBtn = newElement.querySelector('.save')
    const deleteBtn = newElement.querySelector('.apagar')
    const titulo = newElement.querySelector('.titulo')
    const descricao = newElement.querySelector('.descricao')
    const titleHeader = newElement.querySelector('.titleHeader')
    const input = newElement.querySelector('.input')
    const main = newElement.querySelector('.main')

    titulo.value = title;
    descricao.value = desc;
    titleHeader.textContent = limitarCaracteres(title) 
    main.textContent = desc

    saveBtn.addEventListener('click',function(){
        input.classList.toggle('hidden')
        main.classList.toggle('hidden')
        editBtn.classList.toggle('hidden')
        saveBtn.classList.toggle('hidden')
        titleHeader.textContent = limitarCaracteres(titulo.value) 
        main.textContent = descricao.value

        storageNote()
    })
    editBtn.addEventListener('click',function(){
        input.classList.toggle('hidden')
        main.classList.toggle('hidden')
        editBtn.classList.toggle('hidden')
        saveBtn.classList.toggle('hidden')
    })
    deleteBtn.addEventListener('click',()=>{
        newElement.remove()
        storageNote()
    })
    notasElement.appendChild(newElement);

}

function limitarCaracteres(descricao){
    if(descricao.length>30){
        return descricao.slice(0,28).concat('...')
    }else{
        return descricao
    }
}

function storageNote(){
    var notes = document.querySelectorAll('.nota')
    var notesTitulo = document.querySelectorAll('.titulo')
    var notesdescricao = document.querySelectorAll('.descricao')
    var notas = []
    for(let i = 0;i<=notes.length-1;i++){
        var descricao = notesdescricao.item(i).value
        var titulo = notesTitulo.item(i).value
        var nova_nota = {
            titulo:titulo,
            descricao:descricao
        }
        notas.push(nova_nota)
    }
    localStorage.setItem('notas',JSON.stringify(notas))

}
const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
}

const MOCK_NOTES = [
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.GREEN,
        isFavorite: false,
    },
]


const model = {
    notes: MOCK_NOTES,

    addTask(title, task) {
        const tasks = {
            id: Date.now(),
            title: title,
            content: task,
            isFavorite: false,
            color: colors.YELLOW,
        }
        this.notes.push(tasks)
        view.renderNotes(this.notes)
    },
    deleteTask(notesID){
        this.notes = this.notes.filter((note) =>note.id !== notesID)
        view.renderNotes(this.notes)
    },
    isFavorite(notesID){
        this.notes = this.notes.map((note)=> {
            if(note.id === notesID){
                note.isFavorite = !note.isFavorite
            }
            return note

        })
        view.renderNotes(this.notes)
    },
}

const view = {
    init() {
        this.renderNotes(model.notes)
        const form = document.querySelector('.note-form')
        const list = document.querySelector('.notes-list')
        const name = document.getElementById('name')
        const newNotes = document.getElementById('new-notes')

        form.addEventListener('submit', function (event) {
            event.preventDefault()
            const title = name.value
            const task = newNotes.value
            controller.addTask(title, task)
            name.value = ''
            newNotes.value = ''
        })

        list.addEventListener('click', function (event) {
            if (event.target.classList.contains('delete-button')) {
                const notesID = +event.target.closest('li').id
                controller.deleteTask(notesID)
            }
        })

        list.addEventListener('click', function (event) {
            if(event.target.classList.contains('isFavorite')) {
                const notesID = +event.target.closest('li').id
                controller.isFavorite(notesID)
            }
        })

    },
    renderNotes(notes) {
        const list = document.querySelector('.notes-list') // находим элемент, где будут отображаться наши заметки

        let newNotes = ''// создаем новый объект

        for (let i = 0; i < notes.length; i++) {
            let task = notes[i]
            newNotes += `
                <li id="${task.id}" class="decor-notes" >
                <div class = "decor-name">
                    <b class="${task.color}"></b>
                    <b class="notes-title">${task.title}</b>
                    <button class="isFavorite">${task.isFavorite ? '💖' : '🤍'}</button>
                    <button class = "delete-button">🗑️</button>
                 </div>
                    <b class="notes-content">${task.content}</b>
                </li>
                `
        }
        list.innerHTML = newNotes


        const count = document.querySelector('.notes-counter')
        let totalCount = notes.length
        count.innerHTML = `Всего заметок: ${totalCount}`
    }
}

const controller = {
    addTask(title, task) {
        if (title.trim() !== '' && task.trim() !== '') {
            model.addTask(title, task)
        }
    },
    deleteTask(notesID) {
        model.deleteTask(notesID)
    },
    isFavorite(notesID){
        model.isFavorite(notesID)
    },
}

view.init()

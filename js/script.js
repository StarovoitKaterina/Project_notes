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
    allNotes: MOCK_NOTES,

    addTask(title, task) {
        const tasks = {
            id: Date.now(),
            title: title,
            content: task,
            isFavorite: false,
            color: colors.YELLOW,
        }
        this.allNotes.push(tasks)
        this.notes = this.allNotes
        view.renderNotes(this.notes)
    },
    deleteTask(notesID){
        this.allNotes = this.allNotes.filter((note) =>note.id !== notesID)
        this.notes = this.allNotes
        view.renderNotes(this.notes)
    },
    isFavorite(notesID){
        this.allNotes = this.allNotes.map((note)=> {
            if(note.id === notesID){
                note.isFavorite = !note.isFavorite
            }
            return note

        })
        this.notes = this.allNotes
        view.renderNotes(this.notes)
    },
    showFavoritesOnly() {
        this.notes = this.allNotes.filter(note => note.isFavorite)
        view.renderNotes(this.notes)
    },

    showAllNotes() {
        this.notes = this.allNotes
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
        const list = document.querySelector('.notes-list')

        let newNotes = ''

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

        // const filter = document.querySelector('.filter-box')
        // if(notes.length === 0){
        //     filter.innerHTML=''
        // } else {
        //     filter.innerHTML= `<label class="my-favorite">
        //         <input type="checkbox" name="favorites" id="favorites">
        //             Показать только избранные заметки
        //     </label>`
        // }

        const fav = document.getElementById('favorites')
        if(fav){
            fav.addEventListener('change', function () {
                controller.toggleFavoriteView(fav.checked)
            })
        }

        const clear = document.querySelector('.null-notes')
        if (notes.length > 0) {
            clear.innerHTML = ''
        } else {
            clear.innerHTML = `
        <p>У вас нет еще ни одной заметки</p>
        <p>Заполните поля выше и создайте свою первую заметку!</p>
    `
        }
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
    toggleFavoriteView(showOnlyFavorites) {
        if (showOnlyFavorites) {
            model.showFavoritesOnly()
        } else {
            model.showAllNotes()
        }
    }
}

view.init()

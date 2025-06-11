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
    notes: MOCK_NOTES
}

const view = {
    init() {
        this.renderNotes(model.notes)


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
                    <button class = "isFavorite">❤</button>
                    <button class = "delete-button">🗑️</button>
                 </div>
                    <b class="notes-content">${task.content}</b>
                </li>
                `

        }
        list.innerHTML = newNotes
    }
}

const controller = {}

view.init()

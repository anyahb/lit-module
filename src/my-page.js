import {
    LitElement,
    html,
    css
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import './components/modal.js'

import style from "./styles.css" assert { type: "css"}

export let isModalClosed = false


class MyPage extends LitElement {
    static styles = [
        style
    ]
    constructor() {
        super()
        this.isModalClosed = false
        this.title = "Please enter your information"

        this.addEventListener('close-overlay', this.closeOverlay)

        this.addEventListener('modal-cancelled', this.cancelButton)

        this.addEventListener('modal-submitted', this.submitButton)

        this.addEventListener('keydown', this.escapeButton)

        document.addEventListener('keydown', (event) => this.escapeButton(event))

    }

    submitButton(event) {
        const formValues = event.detail

        this.nameValue = formValues.name
        this.countryValue = formValues.country
        this.subscribeValue = formValues.subscribe
        this.genderValue = formValues.gender

        this.closeModal()
        this.isModalClosed = true

        const mainContent = this.shadowRoot.querySelector('.main-content')
        mainContent.classList.add('shown')
        this.requestUpdate()
    }

    cancelButton() {
        this.closeModal()
        this.isModalClosed = true
    }


    closeOverlay() {
        this.closeModal()
        this.isModalClosed = true
    }


    closeModal() {
        const myModal = this.shadowRoot.querySelector('my-modal')
        if (myModal) {
            myModal.classList.add('close')
            this.isModalClosed = true
        }
    }


    escapeButton(event) {
        if (event.key === "Escape") {
            this.closeModal()
            this.isModalClosed = true
        }
    }


    openModal() {
        const myModal = this.shadowRoot.querySelector('my-modal')
        if (myModal) {
            myModal.classList.remove('close')
            this.isModalClosed = true
            this.isButtonClicked = false
        }
    }


    toggleForm() {
        const myModal = this.shadowRoot.querySelector('my-modal')
        const mainContent = this.shadowRoot.querySelector('.main-content')

        if (myModal) {
            if (this.isModalClosed) {
                this.openModal()
                mainContent.classList.remove('shown')
            } else {
                this.closeModal()
            }

            this.isModalClosed = !this.isModalClosed
        }
    }

    render() {
        return html `
        <div class="main-content ${this.isModalClosed ? 'shown' : ''}">
            <p>Name: ${this.nameValue}</p>
            <p>Country: ${this.countryValue}</p>
            <p>Subscribe: ${this.subscribeValue ? 'Yes' : 'No'}</p>
            <p>Gender: ${this.genderValue}</p>
        </div>
        <button slot="toggle-button" @click="${this.toggleForm}">Toggle Modal</button>
        <my-modal .title="${this.title}" class="my-modal"></my-modal>
    `
    }
}

customElements.define('my-page', MyPage)
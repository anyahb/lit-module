import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import './my-header.js'
import './form.js'
import './footer.js'


import style from "../styles.css" assert {type: "css"}

class MyModal extends LitElement {

    static styles = [
        style
    ]

    static properties = {
        title: "test",
    }

    constructor() {
        super()
        this.formValues = {}
        this.addEventListener('form-value-changed', this.handleFormValueChange)
        this.addEventListener('submit-button-clicked', this.onSubmit)
        this.addEventListener('cancel-button-clicked', this.onCancel)
    }

    handleFormValueChange(event) {
        const detail = event.detail
        this.formValues = {
            name: detail.name,
            country: detail.country,
            subscribe: detail.subscribe,
            gender: detail.gender
        }

        this.dispatchEvent(new CustomEvent('form-values-updated', {
            detail: this.formValues,
            bubbles: true,
            composed: true
        }))

    }

    onSubmit(event) {
        this.dispatchEvent(new CustomEvent('modal-submitted', {
            detail: this.formValues,
            bubbles: true,
            composed: true
        }))

    }

    onCancel(event) {
        this.dispatchEvent(new CustomEvent('modal-cancelled', {
            bubbles: true,
            composed: true
        }))
    }

    closeOverlay(event) {
        this.dispatchEvent(new CustomEvent('close-overlay', {
            bubbles: true,
            composed: true
        }))
    }

    render() {
        return html `
        <div id="overlay" class="${this.hasCloseClass ? '' : 'open'}"   @click="${this.closeOverlay}"></div>
        <div class="other">
        <header>
        <p class="title">${this.title}</p>
        </header>
        <my-form class="my-form"></my-form>
        <my-footer></my-footer>
        </div>
        `
    }

    get hasCloseClass() {
        return this.classList.contains('close')
    }


    get otherDiv() {
        return this.shadowRoot.querySelector('.other')
    }
}

customElements.define('my-modal', MyModal)
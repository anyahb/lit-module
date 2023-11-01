import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}
import '../index.js';

// defining a custom element for the Header
class MyHeader extends LitElement {

    static styles = [
        style
    ]

    constructor() {
        super()
        this.isModalOpen = false
    }

    toggleForm(event) {
        this.dispatchEvent(new CustomEvent('toggle-form'))
    }

    // render the Header
    render() {
        return html `
        <div id="my-header">
      <h1>
        <slot></slot>
      </h1>
      <button id="toggle-button" @click="${this.toggleForm}">Toggle Modal</button>
      </div>
    `
    }
}

// register "my-header"
customElements.define('my-header', MyHeader)


const Header = document.querySelector('my-header')
const myModule = document.querySelector('#my-module')


// adding an event listener to toggle the form's visibility
let isModalOpen = false


Header.addEventListener('toggle-form', () => {
    // form.style.display = form.style.display === 'none' ? 'block' : 'none'

    isModalOpen = !isModalOpen

    if (isModalOpen) {
        // then open
        myModule.style.maxHeight = '100%'
        myModule.style.opacity = '1'
      
    } else {
        // then close
        myModule.style.maxHeight = '0'
        myModule.style.opacity = '0'
    }
})


import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}

// defining a custom element for the Header
class MyHeader extends LitElement {



    static styles = [
        style
    ]

    static properties = {
        title: { type: String },
        isModalOpen: {attribute: false}
      }

    constructor() {
        super()
        this.isModalOpen = false
    }

    // render the Header
    render() {
        return html `
        <div>
        <slot></div>
        </div>
    `
    }
}

// register "my-header"
customElements.define('my-header', MyHeader)


const Header = document.querySelector('my-header')
const myModal = document.querySelector('#my-modal')


// adding an event listener to toggle the form's visibility
// let isModalOpen = false


// Header.addEventListener('toggle-form', () => {
//     // form.style.display = form.style.display === 'none' ? 'block' : 'none'

//     isModalOpen = !isModalOpen

//     if (isModalOpen) {
//         // then open
//         myModal.style.maxHeight = '100%'
//         myModal.style.opacity = '1'
      
//     } else {
//         // then close
//         myModal.style.maxHeight = '0'
//         myModal.style.opacity = '0'
//     }
// })


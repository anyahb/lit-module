import {
    LitElement,
    html,
    css
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import './components/my-header.js';
import './components/form.js';
import './components/footer.js';

export let isModalOpen = false;
const myModule = document.querySelector('#my-module')


//close modal with an escape button

function escapeButton(event) {
    if (event.key === "Escape") {
        myModule.style.maxHeight = '0'
        myModule.style.opacity = '0'
    }
}

document.body.addEventListener("keydown", escapeButton)

// close modal with an outside click

// function outsideClick(event) {
//     if (!myModule.contains(event.target)) {
//         myModule.style.maxHeight = '0'
//         myModule.style.opacity = '0'
//     }
// }

// document.body.addEventListener("click", outsideClick)


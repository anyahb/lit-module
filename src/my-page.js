import {
    LitElement,
    html,
    css
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import './components/modal.js';

import style from "./styles.css" assert { type: "css"}

export let isModalOpen = false;


class MyPage extends LitElement {
    static styles = [
        style
    ]
    constructor() {
        super()
        this.isModalOpen = false
        this.title = "privet"

        this.addEventListener('close-overlay', this.closeOverlay)

    



        document.addEventListener('keydown', (event) => this.escapeButton(event));


        document.addEventListener('modal-cancelled', () => {
            this.closeModal();
            this.isModalOpen = true;
        });


        document.addEventListener('modal-submitted', () => {
            const formValues = event.detail;
            console.log("Form values submitted:", formValues);
            this.closeModal();
            this.isModalOpen = true;

        });

    }


    closeOverlay(){
        this.closeModal()
    }


    closeModal() {
        const myModal = this.shadowRoot.querySelector('my-modal');
        if (myModal) {
            myModal.classList.add('close');
            this.isModalOpen = false;
        }
    }


    escapeButton(event) {
        if (event.key === "Escape") {
            this.closeModal(); 
            this.isModalOpen = true;
        }
    }


    openModal() {
        const myModal = this.shadowRoot.querySelector('my-modal');
        if (myModal) {
            myModal.classList.remove('close');
            this.isModalOpen = true;
        }
    }


    toggleForm() {
        const myModal = this.shadowRoot.querySelector('my-modal');
        if (myModal) {

            if (this.isModalOpen) {
                this.openModal();
            } else {
                this.closeModal();
            }
            this.isModalOpen = !this.isModalOpen;
        }
    }


    // escapeButton(event) {
    //     const myModal = this.shadowRoot.querySelector('my-modal');
    //     if (event.key === "Escape") {
    //         this.closeModal();
    //     }
    // }
    
   


    render() {
        return html `
        <button slot="toggle-button" @click="${this.toggleForm}">Toggle Modal</button>
        <my-modal .title="${this.title}" class="my-modal"></my-modal>
    `
    }
}



customElements.define('my-page', MyPage)



import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import {
    css
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

// defining a custom element for the Header
class MyHeader extends LitElement {

    static styles = css `
    #toggle-button {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    color: white;
    background: rgb(29, 38, 113);
    margin: 10px;
    font-size: 16px;
    }
  `

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

// defining a custom element for the form
class MyForm extends LitElement {
    static styles = css `
    .my-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        font-size: 18px;
    }

    .my-form label {
        font-size: 24px;
        margin-bottom: 10px;
        color: white;
    }

    .my-form input[type="text"],
    .my-form select {
        width: 100%;
        max-width: 250px;
        font-size: 18px;
        padding: 14px;
        margin: 10px 0;
    }

    .my-form input[type="checkbox"],
    .my-form input[type="radio"] {
        width: 18px;
        height: 18px;
    }
`

    render() {
        return html `
            <form class="my-form">
                <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" autocomplete="off">
                </div>
                <div>
                    <label for="country">Country</label>
                    <select id="country" name="country">
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                    </select>
                </div>
                <div>
                    <label for="subscribe">Subscribe to newsletter</label>
                    <input type="checkbox" id="subscribe" name="subscribe" value="yes">
                </div>
                <div>
                    <label>Gender</label><br>
                    <input type="radio" id="male" name="gender" value="male">
                    <label for="male">Male</label><br>
                    <input type="radio" id="female" name="gender" value="female">
                    <label for="female">Female</label>
                </div>
            </form>
        `
    }
}

// register "my-form"
customElements.define('my-form', MyForm)


// define a customer element for the footer
class MyFooter extends LitElement {

    static styles = css `
    .my-button {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    color: white;
    background: rgb(29, 38, 113);
    margin: 10px;
    font-size: 16px;
    box-shadow: 1px 2px 15px white;
    }

    #footer {
        padding-left: 20px;
    }

  `



     // render the footer    
    render() {
        return html `
      <div id="footer">
        <button id="cancelButton" class="my-button">Cancel</button>
        <button id="submitButton" class="my-button">Submit</button>
      </div>
    `
    }

    // updated in the DOM
    firstUpdated() {
        const cancelButton = this.shadowRoot.getElementById('cancelButton')
        const submitButton = this.shadowRoot.getElementById('submitButton')
        const myModule = this.shadowRoot.host.getRootNode().querySelector('#my-module')


        // click => change display style
        cancelButton.addEventListener('click', () => {
            // myModule.style.display = myModule.style.display === 'none' ? 'block' : 'none'
            myModule.style.maxHeight = '0'
            myModule.style.opacity = '0'
            isModalOpen = false
        })

        // click => call userInputs()
        submitButton.addEventListener("click", () => {
            setTimeout(() => {
                myModule.style.maxHeight = '0'
                myModule.style.opacity = '0'
                isModalOpen = false
                this.userInputs()
            }, 2000)
        })
    }

    userInputs() {
        // get user inputs
        const name = document.querySelector('my-form').shadowRoot.querySelector('#name').value
        const country = document.querySelector('my-form').shadowRoot.querySelector('#country').value
        const subscribe = document.querySelector('my-form').shadowRoot.querySelector('#subscribe').checked
        const gender = document.querySelector('my-form').shadowRoot.querySelector('input[name="gender"]:checked').value
        const mainContent = document.querySelector(".main-content")

        // create paragraphs for each user input
        const nameParagraph = document.createElement('p')
        nameParagraph.textContent = `Name: ${name}`
        const countryParagraph = document.createElement('p')
        countryParagraph.textContent = `Country: ${country}`
        const subscribeParagraph = document.createElement('p')
        subscribeParagraph.textContent = `Subscribe to newsletter: ${subscribe ? 'Yes' : 'No'}`
        const genderParagraph = document.createElement('p')
        genderParagraph.textContent = `Gender: ${gender}`

        // append it to the mainContent div
        mainContent.append(nameParagraph)
        mainContent.append(countryParagraph)
        mainContent.append(subscribeParagraph)
        mainContent.append(genderParagraph)
    }

}

// register "my-footer"
customElements.define('my-footer', MyFooter)

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
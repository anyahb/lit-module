import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

// defining a custom element for the Header
class MyHeader extends LitElement {
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

    // render the form    
    render() {
        return html `
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <label for="country">Country:</label>
        <select id="country" name="country">
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
        </select><br><br>
        <label for="subscribe">Subscribe to newsletter:</label>
        <input type="checkbox" id="subscribe" name="subscribe" value="yes"><br><br>
        <label>Gender:</label><br>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">Male</label><br>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">Female</label><br>
      </form>
    `
    }
}

// register "my-form"
customElements.define('my-form', MyForm)


// define a customer element for the footer
class MyFooter extends LitElement {

    //render the footer    
    render() {
        return html `
      <div id="footer">
        <button id="cancelButton">Cancel</button>
        <button id="submitButton">Submit</button>
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
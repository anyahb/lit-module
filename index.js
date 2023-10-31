import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

// defining a custom element for the title
class MyTitle extends LitElement {
    toggleForm() {
        this.dispatchEvent(new CustomEvent('toggle-form'))
    }

    // render the title
    render() {
        return html `
      <h1 @click="${this.toggleForm}">
        <slot></slot>
      </h1>
    `
    }
}

// register "my-title"
customElements.define('my-title', MyTitle)


const title = document.querySelector('my-title')
// const form = document.querySelector('#my-module')
const myModule = document.querySelector('#my-module');

const isModuleOpen = false;
// adding an event listener to toggle the form's visibility
title.addEventListener('toggle-form', () => {
    // form.style.display = form.style.display === 'none' ? 'block' : 'none'
    if (!isModuleOpen) {
        // open
        myModule.style.maxHeight = '100%';
        myModule.style.opacity = '1';
      } else {
        // closed
        myModule.style.maxHeight = '0';
        myModule.style.opacity = '0';
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
            myModule.style.maxHeight = '0';
            myModule.style.opacity = '0';
        })

        // click => call userInputs()
        submitButton.addEventListener("click", () => {
            this.userInputs()
        })
    }

    userInputs() {
        // get user inputs
        const name = document.querySelector('my-form').shadowRoot.querySelector('#name').value
        const country = document.querySelector('my-form').shadowRoot.querySelector('#country').value
        const subscribe = document.querySelector('my-form').shadowRoot.querySelector('#subscribe').checked
        const gender = document.querySelector('my-form').shadowRoot.querySelector('input[name="gender"]:checked').value

        console.log("User Input Data:")
        console.log("Name: " + name)
        console.log("Country: " + country)
        console.log("Subscribe to newsletter: " + (subscribe ? 'Yes' : 'No'))
        console.log("Gender: " + gender)
    }

}

// register "my-footer"
customElements.define('my-footer', MyFooter)
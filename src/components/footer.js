import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}

// define a customer element for the footer
class MyFooter extends LitElement {

    static styles = [
        style
    ]

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

        let isModalOpen = false


        // click => change display style
        cancelButton.addEventListener('click', () => {
            // myModule.style.display = myModule.style.display === 'none' ? 'block' : 'none'
            myModule.style.maxHeight = '0'
            myModule.style.opacity = '0'
            if (isModalOpen) {
                isModalOpen = false; // update the isModalOpen variable here
            }


            // isModalOpen = false
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
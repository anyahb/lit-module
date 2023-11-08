import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}

// defining a custom element for the form
class MyForm extends LitElement {

    updateFormValues() {
        const userInputs = {
            name: this.name,
            country: this.country,
            subscribe: this.subscribe,
            gender: this.gender
        }
        this.dispatchEvent(new CustomEvent('form-value-changed', {
            detail: userInputs,
            bubbles: true,
            composed: true
        }))
    }


    updated(changedProperties) {
        super.updated(changedProperties)

        if (
            changedProperties.has('name') ||
            changedProperties.has('country') ||
            changedProperties.has('subscribe') ||
            changedProperties.has('gender')
        ) {
            this.updateFormValues()
        }
    }

     handleNameChange(e) {
        this.name = e.target.value 
    }

    handleGenderChange(e) {
        this.gender = e.target.value
    }


    static styles = [
        style
    ]

    static properties = {
        name: {type: String},
        form: {type: Object},
        country: { type: String },
        subscribe: { type: Boolean },
        gender: { type: String }
      }

    constructor() {
        super()
        this.name = ''
        this.country = 'usa'
        this.subscribe = false
        this.gender = 'male'
      }

    //   clickHandler() {

    //     const userInputs = {
    //       name: this.name,
    //       country: this.country,
    //       subscribe: this.subscribe,
    //       gender: this.gender
    //     }
    //     console.log(userInputs)
    //   }

  // <div class="main-button" @click="${this.clickHandler}">Test</div>

    render() {
        return html `
            <form class="my-form">
                <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" autocomplete="off" .value="${this.name}" @input="${this.handleNameChange}">
                </div>
                <div>
                    <label for="country">Country</label>
                    <select id="country" name="country" @change="${(e) => this.country = e.target.value}">
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                    </select>
                </div>
                <div>
                    <label for="subscribe">Subscribe to newsletter</label>
                    <input type="checkbox" id="subscribe" name="subscribe" .checked="${this.subscribe}" @change="${(e) => this.subscribe = e.target.checked}">
                </div>
                <div>
                    <label>Gender</label><br>
                    <input type="radio" id="male" name="gender" value="male" @change="${this.handleGenderChange}" .checked="${this.gender === 'male'}">
                    <label for="male">Male</label><br>
                    <input type="radio" id="female" name="gender" value="female" @change="${this.handleGenderChange}" .checked="${this.gender === 'female'}">
                    <label for="female">Female</label>
                </div>

              
            </form>
        `
    }
}


// register "my-form"
customElements.define('my-form', MyForm)
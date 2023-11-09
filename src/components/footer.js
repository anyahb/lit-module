import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}

import './my-header.js'
import './form.js'

class MyFooter extends LitElement {

    static styles = [
        style
    ]

    static properties = {
        isSpinnerHidden: true,
      };


    constructor(){
        super()
        this.isSpinnerHidden = true
        this.isButtonClicked = false;
    }

    submitHandler() {
        this.isSpinnerHidden = false
        this.isButtonClicked = true;
        setTimeout(() => {
            this.isSpinnerHidden = true
            this.dispatchEvent(new CustomEvent('submit-button-clicked', {
                bubbles: true,
                composed: true
            }))

            this.isButtonClicked = false;
        }, 2000)
    }


    cancelHandler() {
        this.dispatchEvent(new CustomEvent('cancel-button-clicked', {
            bubbles: true,
            composed: true
        }))
    }

    render() {
        return html `
       
      <div id="footer">
        <button id="cancelButton" class="my-button"  @click="${this.cancelHandler}">Cancel</button>
        <button id="submitButton" class="my-button ${this.isButtonClicked ? 'button-clicked' : ''}" @click="${this.submitHandler}">Submit
        <div class="${this.isSpinnerHidden ? 'hideSpinner' : 'shownSpinner'}"></div>
        </button>
      </div>
    `
    }
}

customElements.define('my-footer', MyFooter)
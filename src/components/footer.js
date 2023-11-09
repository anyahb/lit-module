import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}

import './my-header.js'
import './form.js'


// define a customer element for the footer
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
    }

    submitHandler() {
        console.log(this)
        this.isSpinnerHidden = false
        setTimeout(() => {
            this.isSpinnerHidden = true
            this.dispatchEvent(new CustomEvent('submit-button-clicked', {
                bubbles: true,
                composed: true
            }))
        }, 2000)
    }


    cancelHandler() {
        this.dispatchEvent(new CustomEvent('cancel-button-clicked', {
            // detail: userInputs,
            bubbles: true,
            composed: true
        }))
    }



    // render the footer    
    render() {
        return html `
       
      <div id="footer">
        <button id="cancelButton" class="my-button"  @click="${this.cancelHandler}">Cancel</button>
        <button id="submitButton" class="my-button"  @click="${this.submitHandler}">Submit
        <div class="${this.isSpinnerHidden ? 'hideSpinner' : 'shownSpinner'}">111</div>
        </button>
      </div>
    `
    }
}




// register "my-footer"
customElements.define('my-footer', MyFooter)
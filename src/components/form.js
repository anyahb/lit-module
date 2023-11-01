import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}

// defining a custom element for the form
class MyForm extends LitElement {
    static styles = [
        style
    ]

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
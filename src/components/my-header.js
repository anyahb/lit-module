import {
    LitElement,
    html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'

import style from "../styles.css" assert {type: "css"}

class MyHeader extends LitElement {

    static styles = [
        style
    ]

    static properties = {
        title: { type: String },
        isModalClosed: {attribute: false}
      }

    constructor() {
        super()
        this.isModalClosed = false
    }

    render() {
        return html `
        <div>
        <slot></div>
        </div>
    `
    }
}

customElements.define('my-header', MyHeader)



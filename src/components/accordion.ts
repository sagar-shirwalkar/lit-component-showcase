import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-accordion')
export class ShowcaseAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .accordion {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }
  `

  render() {
    return html`
      <div class="accordion">
        <slot></slot>
      </div>
    `
  }
}

@customElement('showcase-accordion-item')
export class ShowcaseAccordionItem extends LitElement {
  @property({ type: String }) id = ''
  @property({ type: String }) title = ''
  @property({ type: Boolean }) open = false

  static styles = css`
    :host {
      display: block;
      border-bottom: 1px solid #e5e7eb;
    }
    :host:last-child {
      border-bottom: none;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: #f9fafb;
      cursor: pointer;
      font-weight: 500;
      color: #374151;
      transition: background 0.2s;
    }
    .header:hover {
      background: #f3f4f6;
    }
    .icon {
      width: 20px;
      height: 20px;
      transition: transform 0.2s;
    }
    .icon.open {
      transform: rotate(180deg);
    }
    .content {
      padding: 0 20px;
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease-out;
    }
    .content.open {
      padding: 16px 20px;
      max-height: 500px;
    }
    ::slotted(*) {
      color: #4b5563;
      margin: 0;
    }
  `

  render() {
    return html`
      <div class="item">
        <div class="header" @click=${this._toggle}>
          <span>${this.title}</span>
          <svg class="icon ${this.open ? 'open' : ''}" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="content ${this.open ? 'open' : ''}">
          <slot></slot>
        </div>
      </div>
    `
  }

  private _toggle() {
    this.open = !this.open
    this.dispatchEvent(new CustomEvent('toggle', { 
      detail: { id: this.id, open: this.open },
      bubbles: true, 
      composed: true 
    }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-accordion': ShowcaseAccordion
    'showcase-accordion-item': ShowcaseAccordionItem
  }
}
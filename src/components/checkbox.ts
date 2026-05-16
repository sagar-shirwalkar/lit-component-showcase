import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-checkbox')
export class ShowcaseCheckbox extends LitElement {
  @property({ type: Boolean }) checked = false
  @property({ type: String }) label = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) indeterminate = false

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }
    .checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid #d1d5db;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .checkbox.checked {
      background: #6366f1;
      border-color: #6366f1;
    }
    .checkbox.indeterminate {
      background: #6366f1;
      border-color: #6366f1;
    }
    .checkmark {
      color: white;
      width: 12px;
      height: 12px;
    }
    .indeterminate-mark {
      width: 8px;
      height: 2px;
      background: white;
      border-radius: 1px;
    }
    .label {
      font-size: 14px;
      color: #374151;
      user-select: none;
    }
  `

  render() {
    return html`
      <label class="wrapper" @click=${this._onClick}>
        <div class="checkbox ${this.checked ? 'checked' : ''} ${this.indeterminate ? 'indeterminate' : ''}">
          ${this.checked ? html`<svg class="checkmark" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>` : ''}
          ${this.indeterminate ? html`<div class="indeterminate-mark"></div>` : ''}
        </div>
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      </label>
    `
  }

  private _onClick() {
    if (!this.disabled) {
      this.checked = !this.checked
      this.indeterminate = false
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      }))
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-checkbox': ShowcaseCheckbox
  }
}
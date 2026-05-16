import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type InputVariant = 'default' | 'filled' | 'outlined'

@customElement('showcase-input')
export class ShowcaseInput extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) value = ''
  @property({ type: String }) variant: InputVariant = 'default'
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) error = false
  @property({ type: String }) errorMessage = ''

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    label {
      font-size: 14px;
      font-weight: 500;
      color: var(--input-label, #374151);
    }
    input {
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--input-border, #d1d5db);
      font-size: 16px;
      font-family: inherit;
      transition: all 0.2s;
      outline: none;
      background: var(--input-bg, #ffffff);
      color: var(--input-text, #111827);
    }
    input:focus {
      border-color: var(--input-focus-border, #6366f1);
      box-shadow: 0 0 0 3px var(--input-focus-ring, rgba(99, 102, 241, 0.1));
    }
    input:disabled {
      background: var(--input-disabled-bg, #f3f4f6);
      cursor: not-allowed;
    }
    .error input {
      border-color: var(--input-error, #ef4444);
    }
    .error input:focus {
      box-shadow: 0 0 0 3px var(--input-error-ring, rgba(239, 68, 68, 0.1));
    }
    .error-message {
      font-size: 13px;
      color: var(--input-error, #ef4444);
    }
    .filled input {
      background: var(--input-filled-bg, #f3f4f6);
      border-color: transparent;
    }
    .filled input:focus {
      background: var(--input-filled-focus-bg, #ffffff);
      border-color: var(--input-focus-border, #6366f1);
    }
    .outlined input {
      background: transparent;
      border-width: 2px;
      border-color: var(--input-focus-border, #6366f1);
    }
  `

  render() {
    return html`
      <div class="wrapper ${this.error ? 'error' : ''} ${this.variant}">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <input
          type="text"
          placeholder=${this.placeholder}
          .value=${this.value}
          ?disabled=${this.disabled}
          @input=${this._onInput}
        />
        ${this.error && this.errorMessage ? html`<span class="error-message">${this.errorMessage}</span>` : ''}
      </div>
    `
  }

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(new CustomEvent('input-change', { 
      detail: { value: this.value },
      bubbles: true, 
      composed: true 
    }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-input': ShowcaseInput
  }
}
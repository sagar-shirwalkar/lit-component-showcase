import { LitElement, html, css } from 'lit'
import { customElement, property, queryAll, state } from 'lit/decorators.js'

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
  @property({ type: String }) type: 'text' | 'password' = 'text'
  @state() private _showPassword = false

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
    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    input {
      flex: 1;
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
    .toggle-pw {
      position: absolute;
      right: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--input-text, #9ca3af);
      border-radius: 6px;
      transition: background 0.15s, color 0.15s;
    }
    .toggle-pw:hover {
      background: var(--input-filled-bg, #f3f4f6);
      color: var(--input-text, #374151);
    }
    .toggle-pw svg {
      width: 18px;
      height: 18px;
    }
    .toggle-pw.hidden svg:last-child {
      display: none;
    }
    .toggle-pw.visible svg:first-child {
      display: none;
    }
  `

  render() {
    const isPw = this.type === 'password'
    return html`
      <div class="wrapper ${this.error ? 'error' : ''} ${this.variant}">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <div class="input-wrap">
          <input
            type=${isPw && !this._showPassword ? 'password' : 'text'}
            placeholder=${this.placeholder}
            .value=${this.value}
            ?disabled=${this.disabled}
            @input=${this._onInput}
          />
          ${isPw ? html`
            <button
              class="toggle-pw ${this._showPassword ? 'visible' : 'hidden'}"
              @click=${() => this._showPassword = !this._showPassword}
              aria-label=${this._showPassword ? 'Hide password' : 'Show password'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M21 12.79A9 9 0 0 0 11.21 3M10 17.24A9 9 0 0 0 16.24 10"/></svg>
            </button>
          ` : ''}
        </div>
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

@customElement('showcase-otp')
export class ShowcaseOtp extends LitElement {
  @property({ type: Number }) length = 6
  @property({ type: String }) value = ''
  @property({ type: Boolean }) disabled = false
  @queryAll('.otp-box') boxes!: HTMLInputElement[]

  static styles = css`
    :host {
      display: block;
    }
    .otp-wrap {
      display: flex;
      gap: 8px;
    }
    .otp-box {
      width: 44px;
      height: 50px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      font-family: inherit;
      border: 2px solid var(--input-border, #d1d5db);
      border-radius: 10px;
      outline: none;
      background: var(--input-bg, #ffffff);
      color: var(--input-text, #111827);
      transition: border-color 0.2s, box-shadow 0.2s;
      -moz-appearance: textfield;
    }
    .otp-box::-webkit-outer-spin-button,
    .otp-box::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .otp-box:focus {
      border-color: var(--input-focus-border, #6366f1);
      box-shadow: 0 0 0 3px var(--input-focus-ring, rgba(99, 102, 241, 0.1));
    }
    .otp-box:disabled {
      background: var(--input-disabled-bg, #f3f4f6);
      cursor: not-allowed;
    }
    .otp-box.filled {
      border-color: var(--slider-value, #6366f1);
    }
  `

  private _onInput(e: InputEvent, idx: number) {
    const input = e.target as HTMLInputElement
    const val = input.value.replace(/\D/g, '').slice(0, 1)
    input.value = val
    this._updateValue()
    if (val && idx < this.length - 1) {
      const next = this.boxes[idx + 1]
      if (next) next.focus()
    }
  }

  private _onKeyDown(e: KeyboardEvent, idx: number) {
    const input = e.target as HTMLInputElement
    if (e.key === 'Backspace' && !input.value && idx > 0) {
      const prev = this.boxes[idx - 1]
      if (prev) { prev.focus(); prev.value = '' }
      this._updateValue()
    }
  }

  private _onPaste(e: ClipboardEvent) {
    e.preventDefault()
    const data = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, this.length)
    if (!data) return
    this.boxes.forEach((box, i) => {
      box.value = data[i] || ''
    })
    this._updateValue()
    const nextIdx = Math.min(data.length, this.length - 1)
    this.boxes[nextIdx]?.focus()
  }

  private _updateValue() {
    this.value = Array.from(this.boxes).map(b => b.value).join('')
    this.dispatchEvent(new CustomEvent('otp-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }))
  }

  render() {
    return html`
      <div class="otp-wrap" @paste=${this._onPaste}>
        ${Array.from({ length: this.length }, (_, i) => html`
          <input
            class="otp-box"
            type="text"
            inputmode="numeric"
            maxlength="1"
            ?disabled=${this.disabled}
            @input=${(e: InputEvent) => this._onInput(e, i)}
            @keydown=${(e: KeyboardEvent) => this._onKeyDown(e, i)}
          />
        `)}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-input': ShowcaseInput
    'showcase-otp': ShowcaseOtp
  }
}

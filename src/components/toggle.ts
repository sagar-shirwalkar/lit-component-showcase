import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-toggle')
export class ShowcaseToggle extends LitElement {
  @property({ type: Boolean }) checked = false
  @property({ type: String }) label = ''
  @property({ type: Boolean }) disabled = false

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .toggle-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    .toggle-wrapper.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    .toggle {
      position: relative;
      width: 48px;
      height: 26px;
      background: var(--toggle-off, #d1d5db);
      border-radius: 13px;
      transition: background 0.2s;
    }
    .toggle.checked {
      background: var(--toggle-on, #6366f1);
    }
    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background: var(--toggle-thumb, #ffffff);
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: var(--toggle-thumb-shadow, 0 1px 3px rgba(0,0,0,0.2));
    }
    .toggle.checked .toggle-thumb {
      transform: translateX(22px);
    }
    .label {
      font-size: 14px;
      font-weight: 500;
      color: var(--toggle-label, #374151);
    }
  `

  render() {
    return html`
      <label class="toggle-wrapper ${this.disabled ? 'disabled' : ''}">
        <div 
          class="toggle ${this.checked ? 'checked' : ''}" 
          @click=${this._onClick}
          role="switch"
          aria-checked=${this.checked}
        >
          <div class="toggle-thumb"></div>
        </div>
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      </label>
    `
  }

  private _onClick() {
    if (!this.disabled) {
      this.checked = !this.checked
      this.dispatchEvent(new CustomEvent('toggle', { 
        detail: { checked: this.checked },
        bubbles: true, 
        composed: true 
      }))
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-toggle': ShowcaseToggle
  }
}
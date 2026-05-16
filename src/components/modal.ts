import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-modal')
export class ShowcaseModal extends LitElement {
  @property({ type: Boolean }) open = false
  @property({ type: String }) title = ''

  static styles = css`
    :host {
      display: contents;
    }
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    .modal {
      background: var(--modal-bg, #ffffff);
      border-radius: 12px;
      padding: 24px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow: auto;
      box-shadow: var(--modal-shadow, 0 20px 25px -5px rgba(0,0,0,0.1));
      animation: slideUp 0.2s;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .header h2 {
      margin: 0;
      font-size: 20px;
      color: var(--modal-title, #1e293b);
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--modal-close, #64748b);
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
    }
    .close-btn:hover {
      background: var(--modal-close-hover, #f1f5f9);
    }
    ::slotted(*) {
      color: var(--modal-body, #475569);
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `

  render() {
    if (!this.open) return html``
    return html`
      <div class="backdrop" @click=${this._onBackdropClick}>
        <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <h2>${this.title}</h2>
            <button class="close-btn" @click=${this._close}>&times;</button>
          </div>
          <slot></slot>
        </div>
      </div>
    `
  }

  private _onBackdropClick() {
    this._close()
  }

  private _close() {
    this.open = false
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-modal': ShowcaseModal
  }
}
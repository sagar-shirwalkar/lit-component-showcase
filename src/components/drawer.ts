import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-drawer')
export class ShowcaseDrawer extends LitElement {
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
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    .drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 320px;
      background: white;
      box-shadow: -4px 0 24px rgba(0,0,0,0.15);
      z-index: 1001;
      animation: slideIn 0.3s ease-out;
      display: flex;
      flex-direction: column;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    .header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #64748b;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
    }
    .close-btn:hover {
      background: #f1f5f9;
    }
    .content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    ::slotted(*) {
      color: #475569;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  `

  render() {
    if (!this.open) return html``
    return html`
      <div class="backdrop" @click=${this._close}>
        <div class="drawer" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <h2>${this.title}</h2>
            <button class="close-btn" @click=${this._close}>&times;</button>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }

  private _close() {
    this.open = false
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-drawer': ShowcaseDrawer
  }
}
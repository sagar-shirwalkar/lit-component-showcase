import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'

@customElement('showcase-sidebar')
export class ShowcaseSidebar extends LitElement {
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
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 280px;
      background: var(--sidebar-bg, #ffffff);
      box-shadow: var(--sidebar-shadow, 4px 0 24px rgba(0,0,0,0.15));
      z-index: 1001;
      animation: slideIn 0.3s ease-out;
      display: flex;
      flex-direction: column;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 16px;
    }
    .header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: var(--sidebar-title, #1e293b);
      letter-spacing: -0.02em;
    }
    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--sidebar-close, #64748b);
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: background 0.15s;
    }
    .close-btn:hover {
      background: var(--sidebar-close-hover, #f1f5f9);
    }
    .divider {
      height: 1px;
      background: var(--sidebar-divider, #e5e7eb);
      margin: 0 20px 8px;
    }
    .content {
      flex: 1;
      padding: 4px 12px 20px;
      overflow-y: auto;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }

    @media (max-width: 480px) {
      .sidebar {
        width: 100%;
      }
    }
  `

  render() {
    if (!this.open) return html``
    return html`
      <div class="backdrop" @click=${this._close}></div>
      <div class="sidebar" @click=${(e: Event) => e.stopPropagation()}>
        <div class="header">
          <h2>${this.title}</h2>
          <button class="close-btn" @click=${this._close} aria-label="Close sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="divider"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `
  }

  private _close() {
    this.open = false
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
  }
}

@customElement('showcase-sidebar-item')
export class ShowcaseSidebarItem extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: Object }) icon: TemplateResult | null = null
  @property({ type: Boolean }) active = false
  @property({ type: String }) badge = ''

  static styles = css`
    :host {
      display: block;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      border: none;
      background: transparent;
      color: var(--sidebar-item-text, #475569);
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .item:hover {
      background: var(--sidebar-item-hover, #f1f5f9);
      color: var(--sidebar-item-hover-text, #1e293b);
    }
    .item.active {
      background: var(--sidebar-item-active-bg, #eef2ff);
      color: var(--sidebar-item-active-text, #6366f1);
      font-weight: 600;
    }
    .item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: inherit;
    }
    .item-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 9999px;
      background: var(--sidebar-badge-bg, #e5e7eb);
      color: var(--sidebar-badge-text, #4b5563);
      flex-shrink: 0;
    }
    .item.active .item-badge {
      background: var(--sidebar-badge-active-bg, #c7d2fe);
      color: var(--sidebar-badge-active-text, #4338ca);
    }
  `

  render() {
    return html`
      <button class="item ${this.active ? 'active' : ''}">
        ${this.icon ? html`<span class="item-icon">${this.icon}</span>` : ''}
        <span class="item-label">${this.label}</span>
        ${this.badge ? html`<span class="item-badge">${this.badge}</span>` : ''}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-sidebar': ShowcaseSidebar
    'showcase-sidebar-item': ShowcaseSidebarItem
  }
}

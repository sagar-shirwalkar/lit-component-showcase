import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-dropdown')
export class ShowcaseDropdown extends LitElement {
  @property({ type: String }) label = 'Options'
  @property({ type: Boolean }) open = false

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }
    .dropdown {
      position: relative;
    }
    .trigger {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: var(--dropdown-trigger-bg, #ffffff);
      border: 1px solid var(--dropdown-trigger-border, #d1d5db);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: var(--dropdown-trigger-text, #374151);
      cursor: pointer;
      transition: all 0.2s;
    }
    .trigger:hover {
      border-color: var(--dropdown-accent, #6366f1);
      background: var(--dropdown-trigger-hover, #f5f3ff);
    }
    .trigger::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--dropdown-arrow, #6b7280);
      transition: transform 0.2s;
    }
    .trigger.open::after {
      transform: rotate(180deg);
    }
    .menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      min-width: 180px;
      background: var(--dropdown-menu-bg, #ffffff);
      border: 1px solid var(--dropdown-menu-border, #e5e7eb);
      border-radius: 8px;
      box-shadow: var(--dropdown-shadow, 0 10px 15px -3px rgba(0,0,0,0.1));
      z-index: 100;
      padding: 4px;
      animation: dropdownIn 0.15s ease-out;
    }
    @keyframes dropdownIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    ::slotted(showcase-dropdown-item) {
      display: block;
    }
  `

  render() {
    return html`
      <div class="dropdown">
        <button 
          class="trigger ${this.open ? 'open' : ''}"
          @click=${this._toggle}
        >
          ${this.label}
        </button>
        ${this.open ? html`
          <div class="menu" @click=${this._stopPropagation}>
            <slot></slot>
          </div>
        ` : ''}
      </div>
    `
  }

  private _toggle() {
    this.open = !this.open
    this.dispatchEvent(new CustomEvent('toggle', { 
      detail: { open: this.open },
      bubbles: true, 
      composed: true 
    }))
  }

  private _stopPropagation(e: Event) {
    e.stopPropagation()
  }
}

@customElement('showcase-dropdown-item')
export class ShowcaseDropdownItem extends LitElement {
  @property({ type: Boolean }) disabled = false

  static styles = css`
    :host {
      display: block;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 12px;
      border: none;
      background: transparent;
      color: var(--dropdown-item-text, #374151);
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      border-radius: 6px;
      transition: background 0.15s;
    }
    .item:hover:not(:disabled) {
      background: var(--dropdown-item-hover, #f3f4f6);
    }
    .item:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `

  render() {
    return html`
      <button class="item" ?disabled=${this.disabled} @click=${this._onClick}>
        <slot></slot>
      </button>
    `
  }

  private _onClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }))
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-dropdown': ShowcaseDropdown
    'showcase-dropdown-item': ShowcaseDropdownItem
  }
}
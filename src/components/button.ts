import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

@customElement('showcase-button')
export class ShowcaseButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = 'primary'
  @property({ type: String }) size: ButtonSize = 'md'
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) loading = false
  @property({ type: Boolean }) circle = false
  @property({ type: String }) tooltip = ''
  private _tooltipTimer: ReturnType<typeof setTimeout> | null = null

  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
      border-radius: var(--btn-radius, 8px);
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      position: relative;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .sm { padding: 6px 12px; font-size: 14px; }
    .md { padding: 10px 20px; font-size: 16px; }
    .lg { padding: 14px 28px; font-size: 18px; }
    .circle.sm { width: 36px; height: 36px; padding: 0; border-radius: 50%; }
    .circle.md { width: 44px; height: 44px; padding: 0; border-radius: 50%; }
    .circle.lg { width: 56px; height: 56px; padding: 0; border-radius: 50%; }
    .primary { background: var(--btn-primary-bg, #6366f1); color: var(--btn-primary-text, white); }
    .primary:hover:not(:disabled) { background: var(--btn-primary-hover, #4f46e5); }
    .secondary { background: var(--btn-secondary-bg, #e5e7eb); color: var(--btn-secondary-text, #1f2937); }
    .secondary:hover:not(:disabled) { background: var(--btn-secondary-hover, #d1d5db); }
    .danger { background: var(--btn-danger-bg, #ef4444); color: var(--btn-danger-text, white); }
    .danger:hover:not(:disabled) { background: var(--btn-danger-hover, #dc2626); }
    .ghost { background: transparent; color: var(--btn-ghost-text, #6366f1); border: 1px solid var(--btn-ghost-text, #6366f1); }
    .ghost:hover:not(:disabled) { background: var(--btn-ghost-hover, #eef2ff); }
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .tooltip {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      background: var(--btn-tooltip-bg, #1f2937);
      color: var(--btn-tooltip-text, #ffffff);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 50;
    }
    :host(:hover) .tooltip, :host(.tooltip-active) .tooltip {
      opacity: 1;
    }
  `

  private _onTouchStart() {
    if (!this.tooltip) return
    if (this._tooltipTimer) clearTimeout(this._tooltipTimer)
    this.classList.add('tooltip-active')
  }

  private _onTouchEnd() {
    if (!this.tooltip) return
    this._tooltipTimer = setTimeout(() => {
      this.classList.remove('tooltip-active')
    }, 1500)
  }

  render() {
    return html`
      <button
        class="${this.size} ${this.variant}${this.circle ? ' circle' : ''}"
        ?disabled=${this.disabled || this.loading}
        @click=${this._onClick}
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
      >
        ${this.loading ? html`<span class="spinner"></span>` : ''}
        <slot></slot>
      </button>
      ${this.tooltip ? html`<span class="tooltip">${this.tooltip}</span>` : ''}
    `
  }

  private _onClick() {
    if (!this.disabled && !this.loading) {
      this.dispatchEvent(new CustomEvent('button-click', { bubbles: true, composed: true }))
    }
  }
}

export interface GroupButton {
  label: string
  variant?: ButtonVariant
  disabled?: boolean
  icon?: TemplateResult
}

@customElement('showcase-button-group')
export class ShowcaseButtonGroup extends LitElement {
  @property({ type: Array }) buttons: GroupButton[] = []

  static styles = css`
    :host {
      display: inline-flex;
    }
    .group {
      display: inline-flex;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--btn-group-border, #e5e7eb);
    }
    .group-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      border: none;
      border-right: 1px solid var(--btn-group-border, #e5e7eb);
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      background: var(--btn-group-bg, #ffffff);
      color: var(--btn-group-text, #374151);
    }
    .group-btn:last-child {
      border-right: none;
    }
    .group-btn:hover:not(:disabled) {
      background: var(--btn-group-hover-bg, #f3f4f6);
    }
    .group-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .group-btn.primary {
      background: var(--btn-primary-bg, #6366f1);
      color: white;
    }
    .group-btn.primary:hover:not(:disabled) {
      background: var(--btn-primary-hover, #4f46e5);
    }
    .group-btn.danger {
      background: var(--btn-danger-bg, #ef4444);
      color: white;
    }
    .group-btn.danger:hover:not(:disabled) {
      background: var(--btn-danger-hover, #dc2626);
    }
    .group-btn-icon {
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  `

  render() {
    return html`
      <div class="group" role="group">
        ${this.buttons.map(btn => html`
          <button class="group-btn ${btn.variant || ''}" ?disabled=${btn.disabled}>
            ${btn.icon ? html`<span class="group-btn-icon">${btn.icon}</span>` : ''}
            ${btn.label}
          </button>
        `)}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-button': ShowcaseButton
    'showcase-button-group': ShowcaseButtonGroup
  }
}

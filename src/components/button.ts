import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

@customElement('showcase-button')
export class ShowcaseButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = 'primary'
  @property({ type: String }) size: ButtonSize = 'md'
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) loading = false

  static styles = css`
    :host {
      display: inline-flex;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    /* Sizes */
    .sm { padding: 6px 12px; font-size: 14px; }
    .md { padding: 10px 20px; font-size: 16px; }
    .lg { padding: 14px 28px; font-size: 18px; }
    /* Variants */
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
  `

  render() {
    const sizeClass = this.size
    const variantClass = this.variant
    return html`
      <button
        class="${sizeClass} ${variantClass}"
        ?disabled=${this.disabled || this.loading}
        @click=${this._onClick}
      >
        ${this.loading ? html`<span class="spinner"></span>` : ''}
        <slot></slot>
      </button>
    `
  }

  private _onClick() {
    if (!this.disabled && !this.loading) {
      this.dispatchEvent(new CustomEvent('button-click', { bubbles: true, composed: true }))
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-button': ShowcaseButton
  }
}
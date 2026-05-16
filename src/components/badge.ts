import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BadgeColor = 'default' | 'primary' | 'success' | 'warning' | 'danger'

@customElement('showcase-badge')
export class ShowcaseBadge extends LitElement {
  @property({ type: String }) color: BadgeColor = 'default'
  @property({ type: String }) type: 'badge' | 'tag' = 'badge'
  @property({ type: Boolean }) removable = false

  static styles = css`
    :host {
      display: inline-flex;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: none;
      letter-spacing: 0;
      border: 1px solid var(--badge-tag-border, #e5e7eb);
    }
    .default { background: var(--badge-default-bg, #f3f4f6); color: var(--badge-default-text, #4b5563); }
    .primary { background: var(--badge-primary-bg, #eef2ff); color: var(--badge-primary-text, #6366f1); }
    .success { background: var(--badge-success-bg, #f0fdf4); color: var(--badge-success-text, #16a34a); }
    .warning { background: var(--badge-warning-bg, #fffbeb); color: var(--badge-warning-text, #d97706); }
    .danger { background: var(--badge-danger-bg, #fef2f2); color: var(--badge-danger-text, #dc2626); }
    .tag.default { background: var(--badge-default-bg, #f3f4f6); color: var(--badge-default-text, #4b5563); border-color: var(--badge-tag-border, #e5e7eb); }
    .tag.primary { background: transparent; color: var(--badge-primary-text, #6366f1); border-color: var(--badge-primary-text, #6366f1); }
    .tag.success { background: transparent; color: var(--badge-success-text, #16a34a); border-color: var(--badge-success-text, #16a34a); }
    .tag.warning { background: transparent; color: var(--badge-warning-text, #d97706); border-color: var(--badge-warning-text, #d97706); }
    .tag.danger { background: transparent; color: var(--badge-danger-text, #dc2626); border-color: var(--badge-danger-text, #dc2626); }
    .remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: inherit;
      opacity: 0.5;
      padding: 0;
      border-radius: 3px;
      transition: opacity 0.15s;
    }
    .remove:hover {
      opacity: 1;
    }
    .remove svg {
      width: 12px;
      height: 12px;
    }
    .clickable {
      cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .clickable:active {
      transform: scale(0.95);
    }
  `

  private _onRemove(e: Event) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('remove', { bubbles: true, composed: true }))
  }

  render() {
    const cls = `${this.type} ${this.color}`
    return html`
      <span class="${cls}">
        <slot></slot>
        ${this.removable ? html`
          <button class="remove" @click=${this._onRemove} aria-label="Remove">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        ` : ''}
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-badge': ShowcaseBadge
  }
}

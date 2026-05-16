import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BadgeColor = 'default' | 'primary' | 'success' | 'warning' | 'danger'

@customElement('showcase-badge')
export class ShowcaseBadge extends LitElement {
  @property({ type: String }) color: BadgeColor = 'default'

  static styles = css`
    :host {
      display: inline-block;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .default {
      background: var(--badge-default-bg, #f3f4f6);
      color: var(--badge-default-text, #4b5563);
    }
    .primary {
      background: var(--badge-primary-bg, #eef2ff);
      color: var(--badge-primary-text, #6366f1);
    }
    .success {
      background: var(--badge-success-bg, #f0fdf4);
      color: var(--badge-success-text, #16a34a);
    }
    .warning {
      background: var(--badge-warning-bg, #fffbeb);
      color: var(--badge-warning-text, #d97706);
    }
    .danger {
      background: var(--badge-danger-bg, #fef2f2);
      color: var(--badge-danger-text, #dc2626);
    }
  `

  render() {
    return html`
      <span class="badge ${this.color}">
        <slot></slot>
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-badge': ShowcaseBadge
  }
}
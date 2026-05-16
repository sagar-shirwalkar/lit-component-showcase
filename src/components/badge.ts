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
      background: #f3f4f6;
      color: #4b5563;
    }
    .primary {
      background: #eef2ff;
      color: #6366f1;
    }
    .success {
      background: #f0fdf4;
      color: #16a34a;
    }
    .warning {
      background: #fffbeb;
      color: #d97706;
    }
    .danger {
      background: #fef2f2;
      color: #dc2626;
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
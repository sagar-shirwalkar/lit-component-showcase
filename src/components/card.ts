import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type CardVariant = 'default' | 'bordered' | 'elevated'

@customElement('showcase-card')
export class ShowcaseCard extends LitElement {
  @property({ type: String }) variant: CardVariant = 'default'
  @property({ type: String }) title = ''
  @property({ type: Boolean }) hoverable = false

  static styles = css`
    :host {
      display: block;
    }
    .card {
      border-radius: 12px;
      padding: 24px;
      transition: all 0.2s;
    }
    .default {
      background: var(--card-bg, #f9fafb);
      border: 1px solid var(--card-border, #e5e7eb);
    }
    .bordered {
      background: var(--card-bg-accent, #ffffff);
      border: 2px solid var(--card-accent, #6366f1);
    }
    .elevated {
      background: var(--card-bg-accent, #ffffff);
      box-shadow: var(--card-shadow, 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1));
    }
    .hoverable:hover {
      transform: translateY(-2px);
      box-shadow: var(--card-shadow-hover, 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1));
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 12px;
      color: var(--card-title, #111827);
    }
    ::slotted(*) {
      color: var(--card-body, #4b5563);
    }
  `

  render() {
    const variantClass = this.variant
    return html`
      <div class="card ${variantClass} ${this.hoverable ? 'hoverable' : ''}">
        ${this.title ? html`<h3 class="title">${this.title}</h3>` : ''}
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-card': ShowcaseCard
  }
}
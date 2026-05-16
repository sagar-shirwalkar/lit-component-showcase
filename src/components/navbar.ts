import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-navbar')
export class ShowcaseNavbar extends LitElement {
  @property({ type: String }) brand = 'Brand'
  @property({ type: Array }) links: { label: string; href: string }[] = []

  static styles = css`
    :host {
      display: block;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .brand {
      font-size: 20px;
      font-weight: 700;
      color: #6366f1;
    }
    .links {
      display: flex;
      gap: 24px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .links a {
      text-decoration: none;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .links a:hover {
      color: #6366f1;
    }
  `

  render() {
    return html`
      <nav class="navbar">
        <div class="brand">${this.brand}</div>
        <ul class="links">
          ${this.links.map(link => html`
            <li><a href=${link.href}>${link.label}</a></li>
          `)}
        </ul>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-navbar': ShowcaseNavbar
  }
}
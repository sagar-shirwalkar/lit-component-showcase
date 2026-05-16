import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('showcase-navbar')
export class ShowcaseNavbar extends LitElement {
  @property({ type: String }) brand = 'Brand'
  @property({ type: Array }) links: { label: string; href: string }[] = []
  @state() private mobileOpen = false

  static styles = css`
    :host {
      display: block;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      background: var(--navbar-bg, #ffffff);
      border-bottom: 1px solid var(--navbar-border, #e5e7eb);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .brand {
      font-size: 20px;
      font-weight: 700;
      color: var(--navbar-accent, #6366f1);
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
      color: var(--navbar-link, #64748b);
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .links a:hover {
      color: var(--navbar-accent, #6366f1);
    }
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      background: transparent;
      border: 1px solid var(--navbar-border, #e5e7eb);
      border-radius: 6px;
      cursor: pointer;
      padding: 8px;
    }
    .hamburger span {
      display: block;
      height: 2px;
      background: var(--navbar-link, #64748b);
      border-radius: 2px;
      transition: transform 0.2s, opacity 0.2s;
    }
    .hamburger.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger.open span:nth-child(2) {
      opacity: 0;
    }
    .hamburger.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    .mobile-menu {
      display: none;
      flex-direction: column;
      background: var(--navbar-bg, #ffffff);
      border-bottom: 1px solid var(--navbar-border, #e5e7eb);
      padding: 8px 16px 12px;
      gap: 4px;
    }
    .mobile-menu.open {
      display: flex;
    }
    .mobile-menu a {
      text-decoration: none;
      color: var(--navbar-link, #64748b);
      font-size: 14px;
      font-weight: 500;
      padding: 10px 12px;
      border-radius: 6px;
      transition: background 0.15s, color 0.15s;
    }
    .mobile-menu a:hover {
      background: var(--navbar-hover, #f1f5f9);
      color: var(--navbar-accent, #6366f1);
    }
    @media (max-width: 640px) {
      .links { display: none; }
      .hamburger { display: flex; }
    }
  `

  private _toggle() {
    this.mobileOpen = !this.mobileOpen
  }

  private _close() {
    this.mobileOpen = false
  }

  render() {
    return html`
      <nav class="navbar">
        <div class="brand">${this.brand}</div>
        <button
          class="hamburger ${this.mobileOpen ? 'open' : ''}"
          @click=${this._toggle}
          aria-label="Toggle navigation"
          aria-expanded=${this.mobileOpen}
        >
          <span></span><span></span><span></span>
        </button>
        <ul class="links">
          ${this.links.map(link => html`
            <li><a href=${link.href}>${link.label}</a></li>
          `)}
        </ul>
      </nav>
      <div class="mobile-menu ${this.mobileOpen ? 'open' : ''}">
        ${this.links.map(link => html`
          <a href=${link.href} @click=${this._close}>${link.label}</a>
        `)}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-navbar': ShowcaseNavbar
  }
}
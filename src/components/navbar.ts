import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'

export interface NavLink {
  label: string
  href: string
  icon?: TemplateResult
  badge?: string
}

@customElement('showcase-navbar')
export class ShowcaseNavbar extends LitElement {
  @property({ type: String }) brand = 'Brand'
  @property({ type: Array }) links: NavLink[] = []
  @property({ type: Boolean }) search = false
  @property({ type: Array }) actions: { type: 'notification' | 'avatar'; badge?: string; src?: string }[] = []
  @state() private mobileOpen = false
  @state() private searchValue = ''

  static styles = css`
    :host {
      display: block;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 24px;
      background: var(--navbar-bg, #ffffff);
      border-bottom: 1px solid var(--navbar-border, #e5e7eb);
      gap: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 700;
      color: var(--navbar-accent, #6366f1);
      white-space: nowrap;
    }
    .brand-icon {
      flex-shrink: 0;
    }
    .links {
      display: flex;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .links a {
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      color: var(--navbar-link, #64748b);
      font-size: 13px;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 6px;
      transition: background 0.15s, color 0.15s;
    }
    .links a:hover {
      background: var(--navbar-hover, #f1f5f9);
      color: var(--navbar-accent, #6366f1);
    }
    .links a .link-icon {
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    .link-badge {
      font-size: 10px;
      font-weight: 700;
      background: var(--navbar-accent, #6366f1);
      color: white;
      padding: 1px 6px;
      border-radius: 9999px;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--navbar-search-bg, #f1f5f9);
      border: 1px solid var(--navbar-search-border, transparent);
      border-radius: 6px;
      padding: 6px 10px;
      flex: 1;
      max-width: 200px;
      transition: border-color 0.2s;
    }
    .search-box:focus-within {
      border-color: var(--navbar-accent, #6366f1);
    }
    .search-box svg {
      width: 15px;
      height: 15px;
      color: var(--navbar-link, #94a3b8);
      flex-shrink: 0;
    }
    .search-box input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 13px;
      font-family: inherit;
      color: var(--navbar-text, #1f2937);
      outline: none;
      min-width: 0;
    }
    .search-box input::placeholder {
      color: var(--navbar-link, #94a3b8);
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .action-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 8px;
      color: var(--navbar-link, #64748b);
      transition: background 0.15s, color 0.15s;
    }
    .action-btn:hover {
      background: var(--navbar-hover, #f1f5f9);
      color: var(--navbar-accent, #6366f1);
    }
    .action-btn svg {
      width: 18px;
      height: 18px;
    }
    .action-badge {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ef4444;
      border: 2px solid var(--navbar-bg, #ffffff);
    }
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
    }
    .avatar-placeholder {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--navbar-accent, #6366f1);
      color: white;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
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
      border-top: 1px solid var(--navbar-border, #e5e7eb);
      padding: 8px 12px 12px;
      gap: 4px;
    }
    .mobile-menu.open {
      display: flex;
    }
    .mobile-menu a {
      display: flex;
      align-items: center;
      gap: 8px;
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
    .mobile-menu .link-icon {
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    @media (max-width: 640px) {
      .links { display: none; }
      .search-box { display: none; }
      .actions { display: none; }
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
      <div class="navbar">
        <div class="brand">
          ${this.renderBrandIcon()}
          ${this.brand}
        </div>
        <ul class="links">
          ${this.links.map(link => html`
            <li>
              <a href=${link.href}>
                ${link.icon ? html`<span class="link-icon">${link.icon}</span>` : ''}
                ${link.label}
                ${link.badge ? html`<span class="link-badge">${link.badge}</span>` : ''}
              </a>
            </li>
          `)}
        </ul>
        ${this.search ? html`
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search..." .value=${this.searchValue} @input=${(e: InputEvent) => this.searchValue = (e.target as HTMLInputElement).value}>
          </div>
        ` : ''}
        <div class="actions">
          ${this.actions.map(action => {
            if (action.type === 'notification') {
              return html`
                <button class="action-btn" aria-label="Notifications">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  ${action.badge ? html`<span class="action-badge"></span>` : ''}
                </button>
              `
            }
            if (action.type === 'avatar') {
              return html`
                <button class="action-btn" aria-label="User menu">
                  ${action.src
                    ? html`<img class="avatar" src=${action.src} alt="User avatar">`
                    : html`<span class="avatar-placeholder">${(this.brand[0] || 'U').toUpperCase()}</span>`
                  }
                </button>
              `
            }
            return ''
          })}
        </div>
        <button
          class="hamburger ${this.mobileOpen ? 'open' : ''}"
          @click=${this._toggle}
          aria-label="Toggle navigation"
          aria-expanded=${this.mobileOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu ${this.mobileOpen ? 'open' : ''}">
        ${this.search ? html`
          <div class="search-box" style="margin-bottom:6px">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search..." .value=${this.searchValue} @input=${(e: InputEvent) => this.searchValue = (e.target as HTMLInputElement).value}>
          </div>
        ` : ''}
        ${this.links.map(link => html`
          <a href=${link.href} @click=${this._close}>
            ${link.icon ? html`<span class="link-icon">${link.icon}</span>` : ''}
            ${link.label}
          </a>
        `)}
      </div>
    `
  }

  private renderBrandIcon(): TemplateResult {
    return html`<svg class="brand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 12 2 20 7"/><polyline points="4 17 12 22 20 17"/><line x1="4" y1="7" x2="4" y2="17"/><line x1="20" y1="7" x2="20" y2="17"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-navbar': ShowcaseNavbar
  }
}

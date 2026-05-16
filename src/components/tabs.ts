import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'

@customElement('showcase-tabs')
export class ShowcaseTabs extends LitElement {
  @property({ type: String }) activeTab = ''

  static styles = css`
    :host {
      display: block;
    }
    .tabs {
      display: flex;
      gap: 4px;
      padding: 4px;
      background: var(--tabs-bar-bg, #f1f5f9);
      border-radius: 12px;
    }
  `

  render() {
    return html`
      <div class="tabs" role="tablist">
        <slot></slot>
      </div>
    `
  }
}

@customElement('showcase-tab')
export class ShowcaseTab extends LitElement {
  @property({ type: String }) tab = ''
  @property({ type: String }) label = ''
  @property({ type: Object }) icon: TemplateResult | null = null

  static styles = css`
    :host {
      display: inline-block;
      flex: 1;
    }
    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 10px 20px;
      border: none;
      background: transparent;
      color: var(--tabs-text, #64748b);
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.2s;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .tab:hover {
      color: var(--tabs-hover-text, #334155);
      background: var(--tabs-hover-bg, rgba(255,255,255,0.6));
    }
    .tab.active {
      color: var(--tabs-active-text, #6366f1);
      background: var(--tabs-active-bg, #ffffff);
      box-shadow: var(--tabs-active-shadow, 0 1px 3px rgba(0,0,0,0.1));
      font-weight: 600;
    }
    .tab-icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }
    .tab-label {
      white-space: nowrap;
    }
  `

  render() {
    const isActive = this.tab === ((this.getRootNode() as ShadowRoot)?.host as any)?.['activeTab']
    return html`
      <button
        class="tab ${isActive ? 'active' : ''}"
        @click=${this._onClick}
        role="tab"
        aria-selected=${isActive ? 'true' : 'false'}
      >
        ${this.icon ? html`<span class="tab-icon">${this.icon}</span>` : ''}
        <span class="tab-label">${this.label}</span>
      </button>
    `
  }

  private _onClick() {
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { tab: this.tab },
      bubbles: true,
      composed: true
    }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-tabs': ShowcaseTabs
    'showcase-tab': ShowcaseTab
  }
}

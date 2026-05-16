import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-tabs')
export class ShowcaseTabs extends LitElement {
  @property({ type: String }) activeTab = ''

  static styles = css`
    :host {
      display: block;
    }
    .tabs {
      display: flex;
      border-bottom: 2px solid #e2e8f0;
      gap: 4px;
    }
    .tab {
      padding: 12px 20px;
      border: none;
      background: transparent;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      transition: all 0.2s;
    }
    .tab:hover {
      color: #1e293b;
      background: #f8fafc;
    }
    .tab.active {
      color: #6366f1;
      border-bottom-color: #6366f1;
    }
  `

  render() {
    return html`
      <div class="tabs">
        <slot></slot>
      </div>
    `
  }
}

@customElement('showcase-tab')
export class ShowcaseTab extends LitElement {
  @property({ type: String }) tab = ''
  @property({ type: String }) label = ''

  static styles = css`
    :host {
      display: inline-block;
    }
  `

  render() {
    return html`
      <button 
        class="tab ${this.tab === ((this.getRootNode() as ShadowRoot)?.host as any)?.['activeTab'] ? 'active' : ''}"
        @click=${this._onClick}
      >
        ${this.label}
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
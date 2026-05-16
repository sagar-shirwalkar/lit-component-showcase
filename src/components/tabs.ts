import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'

export interface TabItem {
  id: string
  label: string
  icon?: TemplateResult
  closable?: boolean
}

@customElement('showcase-tabs')
export class ShowcaseTabs extends LitElement {
  @property({ type: Array }) tabs: TabItem[] = []
  @property({ type: String }) activeTab = ''
  @property({ type: Boolean }) addable = false

  static styles = css`
    :host {
      display: block;
    }
    .tabs-bar {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: 1px solid var(--tabs-border, #e2e8f0);
      background: var(--tabs-bg, transparent);
      color: var(--tabs-text, #64748b);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn:hover {
      border-color: var(--tabs-hover-border, #cbd5e1);
      background: var(--tabs-hover-bg, #f8fafc);
      color: var(--tabs-hover-text, #334155);
    }
    .tab-btn.active {
      background: var(--tabs-active-bg, #ffffff);
      border-color: var(--tabs-active-border, #6366f1);
      color: var(--tabs-active-text, #6366f1);
      font-weight: 600;
      box-shadow: 0 1px 3px rgba(99, 102, 241, 0.12);
    }
    .tab-icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }
    .tab-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      border-radius: 4px;
      padding: 0;
      opacity: 0.4;
      transition: all 0.15s;
      flex-shrink: 0;
    }
    .tab-close:hover {
      opacity: 1;
      background: rgba(0,0,0,0.08);
    }
    .tab-close svg {
      width: 12px;
      height: 12px;
    }
    .add-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border: 1px dashed var(--tabs-border, #e2e8f0);
      background: transparent;
      color: var(--tabs-text, #94a3b8);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .add-btn:hover {
      border-color: var(--tabs-active-border, #6366f1);
      color: var(--tabs-active-text, #6366f1);
      background: var(--tabs-active-bg, #f8faff);
      border-style: solid;
    }
    .add-btn svg {
      width: 16px;
      height: 16px;
    }
  `

  private _selectTab(id: string) {
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { tab: id },
      bubbles: true,
      composed: true
    }))
  }

  private _closeTab(id: string, e: Event) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('tab-close', {
      detail: { tab: id },
      bubbles: true,
      composed: true
    }))
  }

  private _addTab() {
    this.dispatchEvent(new CustomEvent('tab-add', {
      bubbles: true,
      composed: true
    }))
  }

  render() {
    return html`
      <div class="tabs-bar" role="tablist">
        ${this.tabs.map(tab => html`
          <button
            class="tab-btn ${tab.id === this.activeTab ? 'active' : ''}"
            @click=${() => this._selectTab(tab.id)}
            role="tab"
            aria-selected=${tab.id === this.activeTab ? 'true' : 'false'}
          >
            ${tab.icon ? html`<span class="tab-icon">${tab.icon}</span>` : ''}
            <span>${tab.label}</span>
            ${tab.closable ? html`
              <button class="tab-close" @click=${(e: Event) => this._closeTab(tab.id, e)} aria-label="Close ${tab.label}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            ` : ''}
          </button>
        `)}
        ${this.addable ? html`
          <button class="add-btn" @click=${this._addTab} aria-label="Add new tab">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        ` : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-tabs': ShowcaseTabs
  }
}

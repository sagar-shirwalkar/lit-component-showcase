import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type AlertType = 'info' | 'success' | 'warning' | 'error'

@customElement('showcase-alert')
export class ShowcaseAlert extends LitElement {
  @property({ type: String }) type: AlertType = 'info'
  @property({ type: String }) title = ''
  @property({ type: Boolean }) dismissible = false

  static styles = css`
    :host {
      display: block;
    }
    .alert {
      display: flex;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .alert:last-child {
      margin-bottom: 0;
    }
    .icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }
    .content {
      flex: 1;
    }
    .title {
      font-weight: 600;
      margin: 0 0 4px;
      font-size: 14px;
    }
    .message {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }
    .close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: inherit;
      opacity: 0.6;
      font-size: 18px;
      line-height: 1;
    }
    .close:hover {
      opacity: 1;
    }
    .info {
      background: var(--alert-info-bg, #eff6ff);
      border: 1px solid var(--alert-info-border, #bfdbfe);
      color: var(--alert-info-text, #1e40af);
    }
    .success {
      background: var(--alert-success-bg, #f0fdf4);
      border: 1px solid var(--alert-success-border, #bbf7d0);
      color: var(--alert-success-text, #166534);
    }
    .warning {
      background: var(--alert-warning-bg, #fffbeb);
      border: 1px solid var(--alert-warning-border, #fde68a);
      color: var(--alert-warning-text, #92400e);
    }
    .error {
      background: var(--alert-error-bg, #fef2f2);
      border: 1px solid var(--alert-error-border, #fecaca);
      color: var(--alert-error-text, #991b1b);
    }
  `

  private _getIcon() {
    switch (this.type) {
      case 'info':
        return html`<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`
      case 'success':
        return html`<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`
      case 'warning':
        return html`<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`
      case 'error':
        return html`<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`
    }
  }

  render() {
    return html`
      <div class="alert ${this.type}">
        ${this._getIcon()}
        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : ''}
          <div class="message"><slot></slot></div>
        </div>
        ${this.dismissible ? html`<button class="close" @click=${this._dismiss}>&times;</button>` : ''}
      </div>
    `
  }

  private _dismiss() {
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-alert': ShowcaseAlert
  }
}
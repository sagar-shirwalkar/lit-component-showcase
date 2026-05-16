import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-notification')
export class ShowcaseNotification extends LitElement {
  @property({ type: Boolean }) open = false
  @property({ type: String }) title = ''
  @property({ type: String }) message = ''

  private _timer: ReturnType<typeof setTimeout> | null = null

  static styles = css`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2000;
      display: flex;
      gap: 14px;
      align-items: flex-start;
      width: 360px;
      max-width: calc(100vw - 40px);
      padding: 16px 18px;
      border-radius: 10px;
      background: var(--notif-bg, #ffffff);
      border: 1px solid var(--notif-border, #e5e7eb);
      box-shadow: var(--notif-shadow, 0 6px 24px rgba(0,0,0,0.12));
      animation: slideIn 0.3s ease-out;
      box-sizing: border-box;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-16px); }
    }
    .toast.closing {
      animation: slideOut 0.25s ease-in forwards;
    }

    .icon-wrap {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--notif-accent-bg, #eef2ff);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .icon-wrap svg {
      width: 14px;
      height: 14px;
      color: var(--notif-accent, #6366f1);
    }

    .body {
      flex: 1;
      min-width: 0;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--notif-title, #1f2937);
      margin: 0 0 3px;
    }
    .message {
      font-size: 13px;
      color: var(--notif-message, #6b7280);
      margin: 0;
      line-height: 1.5;
    }

    .close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px;
      color: var(--notif-close, #9ca3af);
      line-height: 0;
      border-radius: 4px;
      transition: color 0.15s;
    }
    .close:hover {
      color: var(--notif-close-hover, #374151);
    }
    .close svg {
      width: 16px;
      height: 16px;
    }
  `

  updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this.open) {
      this._startTimer()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._clearTimer()
  }

  private _startTimer() {
    this._clearTimer()
    this._timer = setTimeout(() => this._dismiss(), 3000)
  }

  private _clearTimer() {
    if (this._timer !== null) {
      clearTimeout(this._timer)
      this._timer = null
    }
  }

  private _dismiss() {
    const toast = this.renderRoot?.querySelector('.toast')
    if (toast) {
      toast.classList.add('closing')
      toast.addEventListener('animationend', () => {
        this._dispatchClose()
      }, { once: true })
    } else {
      this._dispatchClose()
    }
  }

  private _dispatchClose() {
    this.dispatchEvent(new CustomEvent('close'))
  }

  render() {
    if (!this.open) return ''

    return html`
      <div class="toast" role="alert">
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <div class="body">
          <p class="title">${this.title}</p>
          <p class="message">${this.message}</p>
        </div>
        <button class="close" @click=${this._dismiss} aria-label="Close notification">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-notification': ShowcaseNotification
  }
}

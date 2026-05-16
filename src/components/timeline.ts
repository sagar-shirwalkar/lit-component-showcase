import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export interface TimelineItem {
  id: string
  title: string
  description: string
  completed: boolean
  date?: string
  time?: string
}

@customElement('showcase-timeline')
export class ShowcaseTimeline extends LitElement {
  @property({ type: Array }) items: TimelineItem[] = []

  static styles = css`
    :host {
      display: block;
    }
    .timeline {
      position: relative;
      padding: 8px 0;
    }
    .item {
      display: flex;
      gap: 16px;
      padding-bottom: 32px;
      position: relative;
    }
    .item:last-child {
      padding-bottom: 0;
    }
    .item:last-child .line-connector {
      display: none;
    }

    .date-col {
      width: 100px;
      flex-shrink: 0;
      text-align: right;
      padding-top: 2px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }
    .date-col:empty {
      width: 100px;
    }
    .date-text {
      font-size: 12px;
      font-weight: 600;
      color: var(--tl-date, #64748b);
      white-space: nowrap;
    }
    .time-text {
      font-size: 11px;
      color: var(--tl-time, #94a3b8);
    }

    .line-col {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 28px;
      flex-shrink: 0;
    }
    .line-connector {
      position: absolute;
      top: 28px;
      bottom: 0;
      width: 2px;
      background: var(--tl-line, #e5e7eb);
    }
    .icon {
      position: relative;
      z-index: 1;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.3s;
    }
    .icon-circle {
      border: 2px solid var(--tl-line, #e5e7eb);
      background: var(--tl-icon-bg, #ffffff);
    }
    .icon-circle::after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tl-line, #e5e7eb);
    }
    .icon-check {
      border: 2px solid var(--tl-accent, #6366f1);
      background: var(--tl-accent, #6366f1);
    }
    .icon-check svg {
      width: 14px;
      height: 14px;
      color: white;
    }

    .content-col {
      flex: 1;
      min-width: 0;
      padding-top: 1px;
    }
    .card {
      background: var(--tl-card-bg, #ffffff);
      border: 1px solid var(--tl-card-border, #e5e7eb);
      border-radius: 10px;
      padding: 16px 18px;
      transition: box-shadow 0.2s;
    }
    .card-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--tl-title, #1f2937);
      margin: 0 0 4px;
    }
    .card-desc {
      font-size: 13px;
      color: var(--tl-desc, #6b7280);
      margin: 0;
      line-height: 1.5;
    }
    .card.completed .card-title {
      color: var(--tl-title-done, #16a34a);
    }

    .item.mobile-date .date-col {
      display: none;
    }
    .mobile-date-row {
      display: none;
    }

    @media (max-width: 640px) {
      .date-col {
        display: none !important;
      }
      .item.mobile-date .date-col {
        display: none !important;
      }
      .mobile-date-row {
        display: flex;
        gap: 4px;
        align-items: baseline;
        margin-top: 12px;
        padding-left: 44px;
      }
      .mobile-date-row .date-text {
        font-size: 12px;
        font-weight: 600;
        color: var(--tl-date, #64748b);
      }
      .mobile-date-row .time-text {
        font-size: 11px;
        color: var(--tl-time, #94a3b8);
      }
      .item {
        gap: 12px;
        padding-bottom: 24px;
      }
      .card {
        padding: 12px 14px;
      }
    }
  `

  private _formatDate(date?: string): string {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  render() {
    return html`
      <div class="timeline">
        ${this.items.map(item => html`
          <div class="item ${item.date || item.time ? 'mobile-date' : ''}">
            <div class="date-col">
              ${item.completed && item.date ? html`<span class="date-text">${this._formatDate(item.date)}</span>` : ''}
              ${item.completed && item.time ? html`<span class="time-text">${item.time}</span>` : ''}
            </div>

            <div class="line-col">
              <div class="icon ${item.completed ? 'icon-check' : 'icon-circle'}">
                ${item.completed ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              </div>
              <div class="line-connector"></div>
            </div>

            <div class="content-col">
              <div class="card ${item.completed ? 'completed' : ''}">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-desc">${item.description}</p>
              </div>
              ${item.completed && (item.date || item.time) ? html`
                <div class="mobile-date-row">
                  ${item.date ? html`<span class="date-text">${this._formatDate(item.date)}</span>` : ''}
                  ${item.time ? html`<span class="time-text">${item.time}</span>` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        `)}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-timeline': ShowcaseTimeline
  }
}

import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './dropdown.ts'

@customElement('showcase-calendar')
export class ShowcaseCalendar extends LitElement {
  @property({ type: Number }) value?: number
  @property({ type: Number }) month = new Date().getMonth()
  @property({ type: Number }) year = new Date().getFullYear()
  @state() private selectedDate?: number
  @state() private monthDropdownOpen = false
  @state() private yearDropdownOpen = false

  static styles = css`
    :host {
      display: inline-block;
    }
    .calendar {
      width: 340px;
      background: var(--cal-bg, #ffffff);
      border: 1px solid var(--cal-border, #e5e7eb);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--cal-shadow, 0 4px 6px -1px rgba(0,0,0,0.1));
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .header-selectors {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .nav-btn {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      color: var(--cal-nav-color, #64748b);
      border-radius: 4px;
      flex-shrink: 0;
    }
    .nav-btn:hover {
      background: var(--cal-nav-hover, #f1f5f9);
    }
    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }
    .weekday {
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: var(--cal-weekday, #64748b);
      padding: 8px 0;
    }
    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }
    .day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--cal-day-text, #374151);
      transition: all 0.15s;
    }
    .day:hover:not(:disabled) {
      background: var(--cal-day-hover, #f1f5f9);
    }
    .day.today {
      font-weight: 600;
      color: var(--cal-today, #6366f1);
    }
    .day.selected {
      background: var(--cal-selected-bg, #6366f1);
      color: var(--cal-selected-text, #ffffff);
    }
    .day.other-month {
      color: var(--cal-other-month, #d1d5db);
    }
    .day:disabled {
      cursor: default;
      opacity: 0.3;
    }
  `

  private getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate()
  }

  private getFirstDayOfMonth(month: number, year: number): number {
    return new Date(year, month, 1).getDay()
  }

  private _selectDay(day: number) {
    this.selectedDate = day
    this.value = day
    this.dispatchEvent(new CustomEvent('change', {
      detail: { date: new Date(this.year, this.month, day) },
      bubbles: true,
      composed: true,
    }))
  }

  private _prevMonth() {
    if (this.month === 0) {
      this.month = 11
      this.year--
    } else {
      this.month--
    }
  }

  private _nextMonth() {
    if (this.month === 11) {
      this.month = 0
      this.year++
    } else {
      this.month++
    }
  }

  private _selectMonth(month: number) {
    this.month = month
    this.monthDropdownOpen = false
  }

  private _selectYear(year: number) {
    this.year = year
    this.yearDropdownOpen = false
  }

  render() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const daysInMonth = this.getDaysInMonth(this.month, this.year)
    const firstDay = this.getFirstDayOfMonth(this.month, this.year)
    const today = new Date()
    const isToday = (day: number) =>
      day === today.getDate() &&
      this.month === today.getMonth() &&
      this.year === today.getFullYear()

    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)

    const baseYear = today.getFullYear()
    const yearRange: number[] = []
    for (let y = baseYear - 10; y <= baseYear + 10; y++) yearRange.push(y)

    return html`
      <div class="calendar">
        <div class="header">
          <button class="nav-btn" @click=${this._prevMonth}>&larr;</button>
          <div class="header-selectors">
            <showcase-dropdown
              label="${monthNames[this.month]}"
              .open=${this.monthDropdownOpen}
              @toggle=${(e: CustomEvent) => {
                this.monthDropdownOpen = e.detail.open
                if (e.detail.open) this.yearDropdownOpen = false
              }}
            >
              ${monthNames.map((name, i) => html`
                <showcase-dropdown-item @click=${() => this._selectMonth(i)}>
                  ${name}
                </showcase-dropdown-item>
              `)}
            </showcase-dropdown>
            <showcase-dropdown
              label="${this.year}"
              .open=${this.yearDropdownOpen}
              @toggle=${(e: CustomEvent) => {
                this.yearDropdownOpen = e.detail.open
                if (e.detail.open) this.monthDropdownOpen = false
              }}
            >
              ${yearRange.map(y => html`
                <showcase-dropdown-item @click=${() => this._selectYear(y)}>
                  ${y}
                </showcase-dropdown-item>
              `)}
            </showcase-dropdown>
          </div>
          <button class="nav-btn" @click=${this._nextMonth}>&rarr;</button>
        </div>
        <div class="weekdays">
          ${dayNames.map(day => html`<div class="weekday">${day}</div>`)}
        </div>
        <div class="days">
          ${days.map((day) => day === null
            ? html`<div class="day other-month"></div>`
            : html`
              <button
                class="day ${isToday(day) ? 'today' : ''} ${this.selectedDate === day ? 'selected' : ''}"
                @click=${() => this._selectDay(day)}
              >
                ${day}
              </button>
            `
          )}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-calendar': ShowcaseCalendar
  }
}

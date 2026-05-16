import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('showcase-calendar')
export class ShowcaseCalendar extends LitElement {
  @property({ type: Number }) value?: number
  @property({ type: Number }) month = new Date().getMonth()
  @property({ type: Number }) year = new Date().getFullYear()
  @state() private selectedDate?: number

  static styles = css`
    :host {
      display: inline-block;
    }
    .calendar {
      width: 320px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .month-year {
      font-weight: 600;
      color: #1e293b;
    }
    .nav-btn {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      color: #64748b;
      border-radius: 4px;
    }
    .nav-btn:hover {
      background: #f1f5f9;
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
      color: #64748b;
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
      color: #374151;
      transition: all 0.15s;
    }
    .day:hover:not(:disabled) {
      background: #f1f5f9;
    }
    .day.today {
      font-weight: 600;
      color: #6366f1;
    }
    .day.selected {
      background: #6366f1;
      color: white;
    }
    .day.other-month {
      color: #d1d5db;
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
      composed: true 
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

    return html`
      <div class="calendar">
        <div class="header">
          <button class="nav-btn" @click=${this._prevMonth}>&larr;</button>
          <span class="month-year">${monthNames[this.month]} ${this.year}</span>
          <button class="nav-btn" @click=${this._nextMonth}>&rarr;</button>
        </div>
        <div class="weekdays">
          ${dayNames.map(day => html`<div class="weekday">${day}</div>`)}
        </div>
        <div class="days">
          ${days.map((day) => day === null
            ? html`<div class="day other-month" disabled></div>`
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
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { TemplateResult } from 'lit'

@customElement('showcase-slider')
export class ShowcaseSlider extends LitElement {
  @property({ type: Number }) min = 0
  @property({ type: Number }) max = 100
  @property({ type: Number }) step = 1
  @property({ type: Number }) value = 50
  @property({ type: String }) label = ''
  @property({ type: Object }) icon: TemplateResult | null = null

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .label-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: var(--slider-label, #374151);
    }
    .label-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .label-icon {
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    }
    .value {
      font-weight: 600;
      color: var(--slider-value, #6366f1);
    }
    .slider-container {
      position: relative;
      height: 24px;
      display: flex;
      align-items: center;
    }
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      background: var(--slider-track, #e5e7eb);
      border-radius: 3px;
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: var(--slider-thumb, #6366f1);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: transform 0.15s;
    }
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }
    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--slider-thumb, #6366f1);
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  `

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement
    this.value = Number(target.value)
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }))
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.label ? html`
          <div class="label-row">
            <span class="label-left">
              ${this.icon ? html`<span class="label-icon">${this.icon}</span>` : ''}
              <span>${this.label}</span>
            </span>
            <span class="value">${this.value}</span>
          </div>
        ` : ''}
        <div class="slider-container">
          <input
            type="range"
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${this.value}
            @input=${this._onInput}
          />
        </div>
      </div>
    `
  }
}

@customElement('showcase-range-slider')
export class ShowcaseRangeSlider extends LitElement {
  @property({ type: Number }) min = 0
  @property({ type: Number }) max = 100
  @property({ type: Number }) step = 1
  @property({ type: Number }) valueMin = 20
  @property({ type: Number }) valueMax = 80
  @property({ type: String }) label = ''
  @property({ type: String }) prefix = ''

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .label-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: var(--slider-label, #374151);
    }
    .values {
      display: flex;
      gap: 8px;
      font-weight: 600;
      color: var(--slider-value, #6366f1);
    }
    .track-wrap {
      position: relative;
      height: 6px;
    }
    .slider {
      position: relative;
      width: 100%;
      height: 6px;
    }
    .track {
      position: absolute;
      width: 100%;
      height: 6px;
      background: var(--slider-track, #e5e7eb);
      border-radius: 3px;
      pointer-events: none;
    }
    .range {
      position: absolute;
      height: 6px;
      background: var(--slider-value, #6366f1);
      border-radius: 3px;
      pointer-events: none;
    }
    input[type="range"] {
      position: absolute;
      top: -7px;
      width: 100%;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      pointer-events: none;
      margin: 0;
      height: 20px;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: var(--slider-thumb, #6366f1);
      border-radius: 50%;
      cursor: pointer;
      pointer-events: auto;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      transition: transform 0.15s;
      border: 2px solid var(--slider-thumb-border, #ffffff);
    }
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.15);
    }
    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--slider-thumb, #6366f1);
      border-radius: 50%;
      cursor: pointer;
      pointer-events: auto;
      border: 2px solid var(--slider-thumb-border, #ffffff);
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    }
  `

  private _onMinInput(e: Event) {
    const v = Number((e.target as HTMLInputElement).value)
    this.valueMin = Math.min(v, this.valueMax - this.step)
    this._emit()
  }

  private _onMaxInput(e: Event) {
    const v = Number((e.target as HTMLInputElement).value)
    this.valueMax = Math.max(v, this.valueMin + this.step)
    this._emit()
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { valueMin: this.valueMin, valueMax: this.valueMax },
      bubbles: true,
      composed: true
    }))
  }

  render() {
    const fmt = (v: number) => `${this.prefix}${v}`
    return html`
      <div class="wrapper">
        ${this.label ? html`
          <div class="label-row">
            <span>${this.label}</span>
            <span class="values">${fmt(this.valueMin)} — ${fmt(this.valueMax)}</span>
          </div>
        ` : ''}
        <div class="track-wrap">
          <div class="slider">
            <div class="track"></div>
            <div class="range" style="left:${((this.valueMin - this.min) / (this.max - this.min)) * 100}%;width:${((this.valueMax - this.valueMin) / (this.max - this.min)) * 100}%"></div>
          </div>
          <input type="range" min=${this.min} max=${this.max} step=${this.step} .value=${this.valueMin} @input=${this._onMinInput}>
          <input type="range" min=${this.min} max=${this.max} step=${this.step} .value=${this.valueMax} @input=${this._onMaxInput}>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-slider': ShowcaseSlider
    'showcase-range-slider': ShowcaseRangeSlider
  }
}

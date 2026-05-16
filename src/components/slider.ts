import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-slider')
export class ShowcaseSlider extends LitElement {
  @property({ type: Number }) min = 0
  @property({ type: Number }) max = 100
  @property({ type: Number }) step = 1
  @property({ type: Number }) value = 50
  @property({ type: String }) label = ''

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
      color: #374151;
    }
    .value {
      font-weight: 600;
      color: #6366f1;
    }
    .slider-container {
      position: relative;
      height: 24px;
      display: flex;
      align-items: center;
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: #6366f1;
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
      background: #6366f1;
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
            <span>${this.label}</span>
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

declare global {
  interface HTMLElementTagNameMap {
    'showcase-slider': ShowcaseSlider
  }
}
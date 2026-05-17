import { LitElement, html, svg, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export interface ChartSeries {
  key: string
  name: string
  color: string
}

export interface DataPoint {
  name: string
  [key: string]: number | string
}

@customElement('showcase-line-chart')
export class ShowcaseLineChart extends LitElement {
  @property({ type: Array }) data: DataPoint[] = []
  @property({ type: Array }) series: ChartSeries[] = []
  @property({ type: Number }) width = 600
  @property({ type: Number }) height = 300
  @state() private hoverIndex: number | null = null
  @state() private mouseX = 0
  @state() private mouseY = 0

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .chart-wrap {
      position: relative;
      width: 100%;
    }
    svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .tooltip {
      position: absolute;
      pointer-events: none;
      background: var(--chart-tooltip-bg, #1f2937);
      color: var(--chart-tooltip-text, #fff);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      line-height: 1.6;
      white-space: nowrap;
      transform: translate(-50%, -100%);
      z-index: 10;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      opacity: 0;
      transition: opacity 0.15s;
    }
    .tooltip.visible {
      opacity: 1;
    }
    .tooltip-label {
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--chart-tooltip-label, #e5e7eb);
    }
    .tooltip-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tooltip-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      margin-top: 12px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--chart-legend-text, #6b7280);
    }
    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `

  private _getPath(data: DataPoint[], key: string): string {
    const pad = { top: 20, right: 20, bottom: 40, left: 50 }
    const w = this.width - pad.left - pad.right
    const h = this.height - pad.top - pad.bottom
    const allVals = data.flatMap(d => this.series.map(s => Number(d[s.key]) || 0))
    const yMin = 0
    const yMax = Math.max(...allVals) * 1.1 || 1
    const xStep = w / (data.length - 1 || 1)
    const toX = (i: number) => pad.left + i * xStep
    const toY = (v: number) => pad.top + h - ((v - yMin) / (yMax - yMin)) * h
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(Number(d[key]) || 0)}`).join(' ')
  }

  render() {
    const pad = { top: 20, right: 20, bottom: 40, left: 50 }
    const w = this.width - pad.left - pad.right
    const h = this.height - pad.top - pad.bottom
    const allVals = this.data.flatMap(d => this.series.map(s => Number(d[s.key]) || 0))
    const yMax = Math.max(...allVals) * 1.1 || 1
    const yTicks = 5
    const xStep = w / (this.data.length - 1 || 1)
    const toY = (v: number) => pad.top + h - (v / yMax) * h
    const toX = (i: number) => pad.left + i * xStep

    return html`
      <div class="chart-wrap">
        <svg viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="${this.width}" height="${this.height}" fill="transparent"/>
          <defs>
            ${this.series.map(s => svg`
              <linearGradient id="line-grad-${s.key}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${s.color}" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="${s.color}" stop-opacity="0"/>
              </linearGradient>
            `)}
          </defs>
          ${Array.from({ length: yTicks + 1 }, (_, i) => {
            const val = (yMax / yTicks) * i
            const y = toY(val)
            return svg`
              <line x1="${pad.left}" y1="${y}" x2="${pad.left + w}" y2="${y}" stroke="var(--chart-grid, #e5e7eb)" stroke-width="1"/>
              <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" fill="var(--chart-axis, #9ca3af)" font-size="11">${Math.round(val)}</text>
            `
          })}
          ${this.data.map((d, i) => svg`
            <text x="${toX(i)}" y="${this.height - 6}" text-anchor="middle" fill="var(--chart-axis, #9ca3af)" font-size="11">${d.name}</text>
          `)}
          ${this.series.map(s => svg`
            <path d="${this._getPath(this.data, s.key)}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round"/>
            <path d="${this._getPath(this.data, s.key)} L${toX(this.data.length - 1)},${pad.top + h} L${toX(0)},${pad.top + h} Z" fill="url(#line-grad-${s.key})" opacity="0.6"/>
          `)}
          ${this.hoverIndex !== null ? svg`
            <line x1="${toX(this.hoverIndex)}" y1="${pad.top}" x2="${toX(this.hoverIndex)}" y2="${pad.top + h}" stroke="var(--chart-crosshair, #d1d5db)" stroke-width="1" stroke-dasharray="4"/>
            ${this.series.map(s => {
              const val = Number(this.data[this.hoverIndex!][s.key]) || 0
              return svg`
                <circle cx="${toX(this.hoverIndex!)}" cy="${toY(val)}" r="4" fill="${s.color}" stroke="var(--chart-tooltip-bg, #1f2937)" stroke-width="2"/>
              `
            })}
          ` : ''}
          <rect x="${pad.left}" y="${pad.top}" width="${w}" height="${h}" fill="transparent"
            @mousemove=${(e: MouseEvent) => {
              const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect()
              const chartRect = this.renderRoot.querySelector('.chart-wrap')!.getBoundingClientRect()
              this.mouseX = e.clientX - chartRect.left
              this.mouseY = e.clientY - chartRect.top
              const relX = (e.clientX - rect.left) / rect.width * w
              const idx = Math.round(relX / xStep)
              this.hoverIndex = Math.max(0, Math.min(idx, this.data.length - 1))
            }}
            @mouseleave=${() => { this.hoverIndex = null; this.mouseX = 0; this.mouseY = 0 }}
          />
        </svg>
        <div class="tooltip ${this.hoverIndex !== null ? 'visible' : ''}"
          style="left:${this.mouseX}px;top:${this.mouseY}px"
        >
          ${this.hoverIndex !== null ? html`
            <div class="tooltip-label">${this.data[this.hoverIndex].name}</div>
            ${this.series.map(s => html`
              <div class="tooltip-row">
                <span class="tooltip-dot" style="background:${s.color}"></span>
                <span>${s.name}: ${Number(this.data[this.hoverIndex!][s.key]) || 0}</span>
              </div>
            `)}
          ` : ''}
        </div>
        <div class="legend">
          ${this.series.map(s => html`
            <div class="legend-item">
              <span class="legend-dot" style="background:${s.color}"></span>
              ${s.name}
            </div>
          `)}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-line-chart': ShowcaseLineChart
  }
}

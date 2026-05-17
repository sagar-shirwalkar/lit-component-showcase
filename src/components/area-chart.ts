import { LitElement, html, svg, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export interface AreaSeries {
  key: string
  name: string
  color: string
}

export interface AreaDataPoint {
  name: string
  [key: string]: number | string
}

@customElement('showcase-area-chart')
export class ShowcaseAreaChart extends LitElement {
  @property({ type: Array }) data: AreaDataPoint[] = []
  @property({ type: Array }) series: AreaSeries[] = []
  @property({ type: Boolean }) stacked = false
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
    .tooltip.visible { opacity: 1; }
    .tooltip-label { font-weight: 600; margin-bottom: 4px; color: var(--chart-tooltip-label, #e5e7eb); }
    .tooltip-row { display: flex; align-items: center; gap: 6px; }
    .tooltip-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      margin-top: 12px;
    }
    .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--chart-legend-text, #6b7280); }
    .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  `

  render() {
    const pad = { top: 20, right: 20, bottom: 40, left: 50 }
    const w = this.width - pad.left - pad.right
    const h = this.height - pad.top - pad.bottom
    const allVals = this.stacked
      ? this.data.map(d => this.series.reduce((sum, s) => sum + (Number(d[s.key]) || 0), 0))
      : this.data.flatMap(d => this.series.map(s => Number(d[s.key]) || 0))
    const yMax = Math.max(...allVals) * 1.1 || 1
    const yTicks = 5
    const xStep = w / (this.data.length - 1 || 1)
    const toX = (i: number) => pad.left + i * xStep
    const toY = (v: number) => pad.top + h - (v / yMax) * h

    const getAreaPath = (data: AreaDataPoint[], keys: string[], offset: number[]) => {
      const pts = data.map((d, i) => {
        let sum = offset[i]
        for (const k of keys) sum += Number(d[k]) || 0
        return `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(sum)}`
      }).join(' ')
      return pts + ` L${toX(data.length - 1)},${pad.top + h} L${toX(0)},${pad.top + h} Z`
    }

    const getLinePath = (data: AreaDataPoint[], keys: string[], offset: number[]) => {
      return data.map((d, i) => {
        let sum = offset[i]
        for (const k of keys) sum += Number(d[k]) || 0
        return `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(sum)}`
      }).join(' ')
    }

    const stackedOffsets = this.data.map(() => 0)
    const renderedSeries: { key: string; path: string; linePath: string; color: string; name: string }[] = []
    for (const s of this.series) {
      const keys = [s.key]
      const offsets = this.stacked ? [...stackedOffsets] : this.data.map(() => 0)
      renderedSeries.push({
        key: s.key,
        path: getAreaPath(this.data, keys, offsets),
        linePath: getLinePath(this.data, keys, offsets),
        color: s.color,
        name: s.name,
      })
      if (this.stacked) {
        this.data.forEach((d, i) => { stackedOffsets[i] += Number(d[s.key]) || 0 })
      }
    }

    const valAtIdx = (idx: number) => {
      if (idx < 0 || idx >= this.data.length) return []
      const d = this.data[idx]
      return this.series.map(s => ({ name: s.name, color: s.color, value: Number(d[s.key]) || 0 }))
    }

    return html`
      <div class="chart-wrap">
        <svg viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="${this.width}" height="${this.height}" fill="transparent"/>
          <defs>
            ${this.series.map(s => svg`
              <linearGradient id="area-grad-${s.key}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${s.color}" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="${s.color}" stop-opacity="0.02"/>
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
          ${renderedSeries.map(s => svg`
            <path d="${s.path}" fill="url(#area-grad-${s.key})" />
            <path d="${s.linePath}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round"/>
          `)}
          ${this.hoverIndex !== null ? svg`
            <line x1="${toX(this.hoverIndex)}" y1="${pad.top}" x2="${toX(this.hoverIndex)}" y2="${pad.top + h}" stroke="var(--chart-crosshair, #d1d5db)" stroke-width="1" stroke-dasharray="4"/>
            ${renderedSeries.map(s => {
              let val = Number(this.data[this.hoverIndex!][s.key]) || 0
              if (this.stacked) {
                let acc = 0
                for (const prev of this.series) {
                  acc += Number(this.data[this.hoverIndex!][prev.key]) || 0
                  if (prev.key === s.key) break
                }
                val = acc
              }
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
            ${valAtIdx(this.hoverIndex).map(v => html`
              <div class="tooltip-row">
                <span class="tooltip-dot" style="background:${v.color}"></span>
                <span>${v.name}: ${v.value}</span>
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
    'showcase-area-chart': ShowcaseAreaChart
  }
}

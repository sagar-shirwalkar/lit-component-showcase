import { LitElement, html, svg, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export interface BarSeries {
  key: string
  name: string
  color: string
}

export interface BarDataPoint {
  name: string
  [key: string]: number | string
}

@customElement('showcase-bar-chart')
export class ShowcaseBarChart extends LitElement {
  @property({ type: Array }) data: BarDataPoint[] = []
  @property({ type: Array }) series: BarSeries[] = []
  @property({ type: Boolean }) stacked = false
  @property({ type: Number }) width = 600
  @property({ type: Number }) height = 300
  @state() private hoverIndex: number | null = null
  @state() private hoverBar: string | null = null
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
    const yMax = Math.max(...allVals) * 1.2 || 1
    const yTicks = 5
    const toY = (v: number) => pad.top + h - (v / yMax) * h
    const groupW = w / this.data.length
    const barGap = 4
    const barCount = this.stacked ? 1 : this.series.length
    const barW = (groupW - barGap * 2) / barCount

    const getGroupedBars = () => {
      return this.data.map((d, di) => {
        const gx = pad.left + di * groupW
        return this.series.map((s, si) => {
          const val = Number(d[s.key]) || 0
          const x = gx + barGap + si * barW
          const y = toY(val)
          return { x, y, w: Math.max(barW - 2, 2), h: pad.top + h - y, key: s.key, val, name: s.name, color: s.color, di }
        })
      }).flat()
    }

    const getStackedBars = () => {
      return this.data.map((d, di) => {
        const gx = pad.left + di * groupW
        const x = gx + barGap
        const bw = Math.max(groupW - barGap * 2, 2)
        let acc = 0
        return this.series.map((s) => {
          const val = Number(d[s.key]) || 0
          const yBottom = toY(acc)
          const yTop = toY(acc + val)
          const bar = { x, y: yTop, w: bw, h: yBottom - yTop, key: s.key, val, name: s.name, color: s.color, di }
          acc += val
          return bar
        })
      }).flat()
    }

    const bars = this.stacked ? getStackedBars() : getGroupedBars()
    const hoveredBar = this.hoverIndex !== null && this.hoverBar
      ? bars.find(b => b.di === this.hoverIndex && b.key === this.hoverBar)
      : null

    return html`
      <div class="chart-wrap">
        <svg viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="${this.width}" height="${this.height}" fill="transparent"/>
          ${Array.from({ length: yTicks + 1 }, (_, i) => {
            const val = (yMax / yTicks) * i
            const y = toY(val)
            return svg`
              <line x1="${pad.left}" y1="${y}" x2="${pad.left + w}" y2="${y}" stroke="var(--chart-grid, #e5e7eb)" stroke-width="1"/>
              <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" fill="var(--chart-axis, #9ca3af)" font-size="11">${Math.round(val)}</text>
            `
          })}
          ${this.data.map((d, i) => svg`
            <text x="${pad.left + i * groupW + groupW / 2}" y="${this.height - 6}" text-anchor="middle" fill="var(--chart-axis, #9ca3af)" font-size="11">${d.name}</text>
          `)}
          ${bars.map(b => svg`
            <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="3" fill="${b.color}"
              opacity="${this.hoverIndex !== null && this.hoverIndex === b.di && this.hoverBar === b.key ? '1' : this.hoverIndex !== null ? '0.5' : '0.85'}"
              @mouseenter=${(e: MouseEvent) => {
                this.hoverIndex = b.di; this.hoverBar = b.key;
                const chartRect = this.renderRoot.querySelector('.chart-wrap')!.getBoundingClientRect()
                this.mouseX = e.clientX - chartRect.left
                this.mouseY = e.clientY - chartRect.top
              }}
              @mousemove=${(e: MouseEvent) => {
                if (this.hoverIndex !== b.di || this.hoverBar !== b.key) return
                const chartRect = this.renderRoot.querySelector('.chart-wrap')!.getBoundingClientRect()
                this.mouseX = e.clientX - chartRect.left
                this.mouseY = e.clientY - chartRect.top
              }}
              @mouseleave=${() => { this.hoverIndex = null; this.hoverBar = null; this.mouseX = 0; this.mouseY = 0 }}
            />
          `)}
        </svg>
        <div class="tooltip ${hoveredBar ? 'visible' : ''}"
          style="left:${this.mouseX}px;top:${this.mouseY}px"
        >
          ${hoveredBar ? html`
            <div class="tooltip-label">${this.data[hoveredBar.di].name}</div>
            <div class="tooltip-row">
              <span class="tooltip-dot" style="background:${hoveredBar.color}"></span>
              <span>${hoveredBar.name}: ${hoveredBar.val}</span>
            </div>
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
    'showcase-bar-chart': ShowcaseBarChart
  }
}

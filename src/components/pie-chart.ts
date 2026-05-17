import { LitElement, html, svg, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export interface PieSlice {
  name: string
  value: number
  color: string
}

@customElement('showcase-pie-chart')
export class ShowcasePieChart extends LitElement {
  @property({ type: Array }) data: PieSlice[] = []
  @property({ type: Boolean }) hollow = false
  @property({ type: Number }) width = 300
  @property({ type: Number }) height = 300
  @state() private hoverIndex: number | null = null
  @state() private mouseX = 0
  @state() private mouseY = 0

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    .chart-wrap {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    svg {
      width: 100%;
      max-width: 300px;
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
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 12px;
    }
    .legend-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--chart-legend-text, #6b7280); }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .legend-val { color: var(--chart-legend-val, #374151); font-weight: 600; margin-left: 2px; }
  `

  private _describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  private _describeDonutArc(cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number): string {
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180
    const ox1 = cx + outerR * Math.cos(startRad)
    const oy1 = cy + outerR * Math.sin(startRad)
    const ox2 = cx + outerR * Math.cos(endRad)
    const oy2 = cy + outerR * Math.sin(endRad)
    const ix1 = cx + innerR * Math.cos(endRad)
    const iy1 = cy + innerR * Math.sin(endRad)
    const ix2 = cx + innerR * Math.cos(startRad)
    const iy2 = cy + innerR * Math.sin(startRad)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M ${ox1} ${oy1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`
  }

  render() {
    const total = this.data.reduce((s, d) => s + d.value, 0) || 1
    const cx = this.width / 2
    const cy = this.height / 2
    const r = Math.min(cx, cy) - 10
    const innerR = this.hollow ? r * 0.55 : 0
    let curAngle = 0
    const slices = this.data.map((d, i) => {
      const angle = (d.value / total) * 360
      const slice = { ...d, startAngle: curAngle, endAngle: curAngle + angle, index: i }
      curAngle += angle
      return slice
    })
    const hovered = this.hoverIndex !== null ? this.data[this.hoverIndex] : null

    return html`
      <div class="chart-wrap">
        <div style="position:relative;width:100%;max-width:300px">
          <svg viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">
            ${slices.map(s => svg`
              <path
                d="${this.hollow ? this._describeDonutArc(cx, cy, r, innerR, s.startAngle, s.endAngle) : this._describeArc(cx, cy, r, s.startAngle, s.endAngle)}"
                fill="${s.color}"
                opacity="${this.hoverIndex === null || this.hoverIndex === s.index ? '1' : '0.4'}"
                stroke="var(--chart-pie-stroke, #fff)"
                stroke-width="1.5"
                style="cursor:pointer;transition:opacity 0.15s"
                @mouseenter=${(e: MouseEvent) => {
                  this.hoverIndex = s.index
                  const chartRect = this.renderRoot.querySelector('.chart-wrap')!.getBoundingClientRect()
                  this.mouseX = e.clientX - chartRect.left
                  this.mouseY = e.clientY - chartRect.top
                }}
                @mousemove=${(e: MouseEvent) => {
                  if (this.hoverIndex !== s.index) return
                  const chartRect = this.renderRoot.querySelector('.chart-wrap')!.getBoundingClientRect()
                  this.mouseX = e.clientX - chartRect.left
                  this.mouseY = e.clientY - chartRect.top
                }}
                @mouseleave=${() => { this.hoverIndex = null; this.mouseX = 0; this.mouseY = 0 }}
              />
            `)}
            ${this.hollow ? svg`
              <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="var(--chart-pie-hole, transparent)"/>
            ` : ''}
            ${this.hollow ? svg`
              <text x="${cx}" y="${cy - 6}" text-anchor="middle" fill="var(--chart-pie-center-label, #6b7280)" font-size="13">Total</text>
              <text x="${cx}" y="${cy + 12}" text-anchor="middle" fill="var(--chart-pie-center-val, #374151)" font-size="20" font-weight="700">${total}</text>
            ` : ''}
          </svg>
          <div class="tooltip ${hovered ? 'visible' : ''}"
            style="left:${this.mouseX}px;top:${this.mouseY}px"
          >
            ${hovered ? html`
              <div style="display:flex;align-items:center;gap:6px">
                <span style="width:8px;height:8px;border-radius:50%;background:${hovered.color};flex-shrink:0"></span>
                <span>${hovered.name}: ${hovered.value} (${Math.round((hovered.value / total) * 100)}%)</span>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="legend">
          ${this.data.map(d => html`
            <div class="legend-item">
              <span class="legend-dot" style="background:${d.color}"></span>
              ${d.name}
              <span class="legend-val">${Math.round((d.value / total) * 100)}%</span>
            </div>
          `)}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-pie-chart': ShowcasePieChart
  }
}

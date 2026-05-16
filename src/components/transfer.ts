import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export interface TransferItem {
  id: string
  label: string
}

@customElement('showcase-transfer')
export class ShowcaseTransfer extends LitElement {
  @property({ type: Array }) source: TransferItem[] = []
  @property({ type: Array }) target: TransferItem[] = []

  @state() private selectedSource = new Set<string>()
  @state() private selectedTarget = new Set<string>()

  static styles = css`
    :host {
      display: block;
    }
    .transfer {
      display: flex;
      align-items: stretch;
      gap: 12px;
    }
    .column {
      flex: 1;
      border: 1px solid var(--xfer-border, #e5e7eb);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: var(--xfer-header-bg, #f9fafb);
      border-bottom: 1px solid var(--xfer-border, #e5e7eb);
      font-size: 13px;
      font-weight: 600;
      color: var(--xfer-header-text, #374151);
    }
    .column-count {
      font-size: 11px;
      font-weight: 500;
      color: var(--xfer-meta, #9ca3af);
      background: var(--xfer-count-bg, #f3f4f6);
      padding: 2px 8px;
      border-radius: 9999px;
    }
    .column-body {
      flex: 1;
      overflow-y: auto;
      min-height: 180px;
      max-height: 280px;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      cursor: pointer;
      font-size: 14px;
      color: var(--xfer-item-text, #1f2937);
      border-left: 3px solid transparent;
      transition: background 0.1s, border-color 0.1s;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .item + .item {
      border-top: 1px solid var(--xfer-border, #e5e7eb);
    }
    .item:hover {
      background: var(--xfer-item-hover, #f9fafb);
    }
    .item.selected {
      background: var(--xfer-item-selected-bg, #eef2ff);
      border-left-color: var(--xfer-accent, #6366f1);
    }
    .item-check {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      border: 2px solid var(--xfer-check-border, #d1d5db);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }
    .item.selected .item-check {
      background: var(--xfer-accent, #6366f1);
      border-color: var(--xfer-accent, #6366f1);
    }
    .item-check svg {
      width: 10px;
      height: 10px;
      color: white;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .item.selected .item-check svg {
      opacity: 1;
    }
    .item-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 180px;
      font-size: 13px;
      color: var(--xfer-meta, #9ca3af);
      padding: 20px;
      text-align: center;
    }
    .controls {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      flex-shrink: 0;
      padding: 4px 0;
    }
    .ctrl-btn {
      width: 40px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--xfer-btn-border, #d1d5db);
      background: var(--xfer-btn-bg, #ffffff);
      border-radius: 8px;
      cursor: pointer;
      color: var(--xfer-btn-text, #6b7280);
      transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .ctrl-btn:hover:not(:disabled) {
      border-color: var(--xfer-accent, #6366f1);
      color: var(--xfer-accent, #6366f1);
      background: var(--xfer-btn-hover, #eef2ff);
    }
    .ctrl-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .ctrl-btn svg {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 640px) {
      .transfer {
        flex-direction: column;
      }
      .controls {
        flex-direction: row;
        justify-content: center;
        padding: 4px 0;
      }
      .ctrl-btn {
        transform: rotate(90deg);
        width: 36px;
        height: 36px;
      }
      .column-body {
        max-height: 200px;
        min-height: 120px;
      }
    }
  `

  private _toggleSource(id: string) {
    const next = new Set(this.selectedSource)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    this.selectedSource = next
  }

  private _toggleTarget(id: string) {
    const next = new Set(this.selectedTarget)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    this.selectedTarget = next
  }

  private _moveRight() {
    if (this.selectedSource.size === 0) return
    const ids = this.selectedSource
    const moved = this.source.filter(i => ids.has(i.id))
    const kept = this.source.filter(i => !ids.has(i.id))
    this.source = kept
    this.target = [...this.target, ...moved]
    this.selectedSource = new Set()
    this._emit()
  }

  private _moveLeft() {
    if (this.selectedTarget.size === 0) return
    const ids = this.selectedTarget
    const moved = this.target.filter(i => ids.has(i.id))
    const kept = this.target.filter(i => !ids.has(i.id))
    this.target = kept
    this.source = [...this.source, ...moved]
    this.selectedTarget = new Set()
    this._emit()
  }

  private _moveAllRight() {
    if (this.source.length === 0) return
    this.target = [...this.target, ...this.source]
    this.source = []
    this.selectedSource = new Set()
    this._emit()
  }

  private _moveAllLeft() {
    if (this.target.length === 0) return
    this.source = [...this.source, ...this.target]
    this.target = []
    this.selectedTarget = new Set()
    this._emit()
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent('transfer-change', {
      detail: { source: this.source, target: this.target },
      bubbles: true,
      composed: true,
    }))
  }

  render() {
    return html`
      <div class="transfer">
        <div class="column">
          <div class="column-header">
            <span>Source</span>
            <span class="column-count">${this.source.length}</span>
          </div>
          <div class="column-body">
            ${this.source.length === 0 ? html`
              <div class="empty">All items transferred</div>
            ` : this.source.map(item => html`
              <div
                class="item ${this.selectedSource.has(item.id) ? 'selected' : ''}"
                @click=${() => this._toggleSource(item.id)}
              >
                <span class="item-check"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg></span>
                <span class="item-label">${item.label}</span>
              </div>
            `)}
          </div>
        </div>

        <div class="controls">
          <button class="ctrl-btn" @click=${this._moveRight} ?disabled=${this.selectedSource.size === 0} aria-label="Move selected right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="ctrl-btn" @click=${this._moveLeft} ?disabled=${this.selectedTarget.size === 0} aria-label="Move selected left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="ctrl-btn" @click=${this._moveAllRight} ?disabled=${this.source.length === 0} aria-label="Move all right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
          </button>
          <button class="ctrl-btn" @click=${this._moveAllLeft} ?disabled=${this.target.length === 0} aria-label="Move all left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
          </button>
        </div>

        <div class="column">
          <div class="column-header">
            <span>Target</span>
            <span class="column-count">${this.target.length}</span>
          </div>
          <div class="column-body">
            ${this.target.length === 0 ? html`
              <div class="empty">No items selected</div>
            ` : this.target.map(item => html`
              <div
                class="item ${this.selectedTarget.has(item.id) ? 'selected' : ''}"
                @click=${() => this._toggleTarget(item.id)}
              >
                <span class="item-check"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg></span>
                <span class="item-label">${item.label}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-transfer': ShowcaseTransfer
  }
}

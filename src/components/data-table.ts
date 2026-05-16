import { LitElement, html, css } from 'lit'
import type { TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export interface ColumnDef {
  key: string
  header: string
  render?: (value: any, row: any) => string | TemplateResult
}

@customElement('showcase-data-table')
export class ShowcaseDataTable extends LitElement {
  @property({ type: Array }) columns: ColumnDef[] = []
  @property({ type: Array }) data: any[] = []
  @property({ type: Number }) pageSize = 5
  @property({ type: Number }) currentPage = 1

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    th {
      text-align: left;
      padding: 12px 16px;
      background: var(--table-header-bg, #f8fafc);
      font-weight: 600;
      color: var(--table-header-text, #475569);
      border-bottom: 2px solid var(--table-border, #e2e8f0);
    }
    td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--table-border, #e2e8f0);
      color: var(--table-text, #1e293b);
    }
    tr:hover td {
      background: var(--table-row-hover, #f8fafc);
    }
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-top: 1px solid var(--table-border, #e2e8f0);
      margin-top: 8px;
    }
    .page-info {
      font-size: 14px;
      color: var(--table-page-info, #64748b);
    }
    .page-controls {
      display: flex;
      gap: 4px;
    }
    .page-btn {
      padding: 6px 12px;
      border: 1px solid var(--table-border, #e2e8f0);
      background: var(--table-btn-bg, #ffffff);
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      color: var(--table-text, #1e293b);
      transition: all 0.2s;
    }
    .page-btn:hover:not(:disabled) {
      background: var(--table-btn-hover, #f1f5f9);
      border-color: var(--table-accent, #6366f1);
    }
    .page-btn.active {
      background: var(--table-accent, #6366f1);
      color: var(--table-btn-active-text, #ffffff);
      border-color: var(--table-accent, #6366f1);
    }
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `

  private get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize
    return this.data.slice(start, start + this.pageSize)
  }

  private get totalPages() {
    return Math.ceil(this.data.length / this.pageSize)
  }

  private _changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.dispatchEvent(new CustomEvent('page-change', {
        detail: { page, totalPages: this.totalPages },
        bubbles: true,
        composed: true
      }))
    }
  }

  render() {
    const totalPages = this.totalPages
    const start = (this.currentPage - 1) * this.pageSize + 1
    const end = Math.min(this.currentPage * this.pageSize, this.data.length)

    return html`
      <table>
        <thead>
          <tr>
            ${this.columns.map(col => html`<th>${col.header}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.paginatedData.map((row) => html`
            <tr>
              ${this.columns.map(col => html`
                <td>${col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              `)}
            </tr>
          `)}
        </tbody>
      </table>
      <div class="pagination">
        <div class="page-info">
          Showing ${start} to ${end} of ${this.data.length} entries
        </div>
        <div class="page-controls">
          <button 
            class="page-btn" 
            @click=${() => this._changePage(this.currentPage - 1)}
            ?disabled=${this.currentPage === 1}
          >
            Previous
          </button>
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => html`
            <button 
              class="page-btn ${this.currentPage === page ? 'active' : ''}"
              @click=${() => this._changePage(page)}
            >
              ${page}
            </button>
          `)}
          <button 
            class="page-btn" 
            @click=${() => this._changePage(this.currentPage + 1)}
            ?disabled=${this.currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-data-table': ShowcaseDataTable
  }
}
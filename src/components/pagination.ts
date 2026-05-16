import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('showcase-pagination')
export class ShowcasePagination extends LitElement {
  @property({ type: Number }) totalItems = 0
  @property({ type: Number }) pageSize = 10
  @property({ type: Number }) currentPage = 1
  @property({ type: Number }) maxVisiblePages = 5

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pagination {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .page-btn {
      min-width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e7eb;
      background: white;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
    }
    .page-btn:hover:not(:disabled):not(.active) {
      background: #f1f5f9;
      border-color: #6366f1;
      color: #6366f1;
    }
    .page-btn.active {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
    }
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-btn.nav-btn {
      padding: 0 12px;
      font-weight: 500;
    }
    .ellipsis {
      min-width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      font-size: 14px;
    }
  `

  private get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize)
  }

  private get visiblePages() {
    const total = this.totalPages
    const current = this.currentPage
    const max = this.maxVisiblePages
    const pages: (number | 'ellipsis')[] = []

    if (total <= max) {
      for (let i = 1; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      let start = Math.max(2, current - 1)
      let end = Math.min(total - 1, current + 1)

      if (current <= 3) {
        start = 2
        end = Math.min(max - 1, total - 1)
      } else if (current >= total - 2) {
        start = Math.max(total - max + 2, 2)
        end = total - 1
      }

      if (start > 2) pages.push('ellipsis')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < total - 1) pages.push('ellipsis')
      pages.push(total)
    }

    return pages
  }

  private _changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
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

    return html`
      <div class="pagination">
        <button 
          class="page-btn nav-btn" 
          @click=${() => this._changePage(this.currentPage - 1)}
          ?disabled=${this.currentPage === 1}
        >
          Previous
        </button>
        
        ${this.visiblePages.map((page) => 
          page === 'ellipsis' 
            ? html`<span class="ellipsis">...</span>`
            : html`
              <button 
                class="page-btn ${this.currentPage === page ? 'active' : ''}"
                @click=${() => this._changePage(page)}
              >
                ${page}
              </button>
            `
        )}
        
        <button 
          class="page-btn nav-btn" 
          @click=${() => this._changePage(this.currentPage + 1)}
          ?disabled=${this.currentPage === totalPages}
        >
          Next
        </button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-pagination': ShowcasePagination
  }
}
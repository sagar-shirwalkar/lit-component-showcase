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
      justify-content: center;
    }
    .pagination {
      display: flex;
      align-items: center;
      gap: 4px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      -ms-overflow-style: none;
      scrollbar-width: none;
      padding: 4px 2px;
      max-width: 100%;
    }
    .pagination::-webkit-scrollbar {
      display: none;
    }
    .page-btn {
      flex-shrink: 0;
      scroll-snap-align: center;
      min-width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--pagination-border, #e5e7eb);
      background: var(--pagination-bg, #ffffff);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: var(--pagination-text, #374151);
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    .page-btn:hover:not(:disabled):not(.active) {
      background: var(--pagination-hover-bg, #f1f5f9);
      border-color: var(--pagination-accent, #6366f1);
      color: var(--pagination-accent, #6366f1);
    }
    .page-btn.active {
      background: var(--pagination-accent, #6366f1);
      color: white;
      border-color: var(--pagination-accent, #6366f1);
    }
    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .page-btn.nav-btn {
      padding: 0 12px;
      font-weight: 500;
      gap: 4px;
    }
    .page-btn .nav-label {
      display: inline;
    }
    .page-btn .nav-icon {
      display: none;
      width: 16px;
      height: 16px;
    }
    .ellipsis {
      flex-shrink: 0;
      min-width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--pagination-muted, #64748b);
      font-size: 14px;
    }
    @media (max-width: 480px) {
      .page-btn {
        min-width: 32px;
        height: 32px;
        font-size: 13px;
        border-radius: 6px;
      }
      .page-btn.nav-btn {
        min-width: 32px;
        padding: 0 6px;
      }
      .page-btn .nav-label {
        display: none;
      }
      .page-btn .nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ellipsis {
        min-width: 24px;
      }
    }
    @media (pointer: coarse) {
      .page-btn {
        min-height: 40px;
        min-width: 40px;
      }
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

  private _scrollToActive(container: HTMLElement) {
    const active = container.querySelector('.active') as HTMLElement
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  private _onPrev() {
    this._changePage(this.currentPage - 1)
  }

  private _onNext() {
    this._changePage(this.currentPage + 1)
  }

  render() {
    const totalPages = this.totalPages

    return html`
      <div class="pagination" @updated=${(e: Event) => this._scrollToActive(e.target as HTMLElement)}>
        <button 
          class="page-btn nav-btn" 
          @click=${this._onPrev}
          ?disabled=${this.currentPage === 1}
          aria-label="Previous page"
        >
          <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></span>
          <span class="nav-label">Previous</span>
        </button>
        
        ${this.visiblePages.map((page) => 
          page === 'ellipsis' 
            ? html`<span class="ellipsis">...</span>`
            : html`
              <button 
                class="page-btn ${this.currentPage === page ? 'active' : ''}"
                @click=${() => this._changePage(page)}
                aria-label="Page ${page}"
                aria-current=${this.currentPage === page ? 'page' : 'false'}
              >
                ${page}
              </button>
            `
        )}
        
        <button 
          class="page-btn nav-btn" 
          @click=${this._onNext}
          ?disabled=${this.currentPage === totalPages}
          aria-label="Next page"
        >
          <span class="nav-label">Next</span>
          <span class="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></span>
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
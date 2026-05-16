import { LitElement, html, css } from 'lit'
import type { TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export interface UploadedFile {
  name: string
  size: number
  type: string
}

@customElement('showcase-upload')
export class ShowcaseUpload extends LitElement {
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: String }) label = 'Upload files'
  @property({ type: String }) hint = 'Drag & drop or click to browse'
  @state() private files: UploadedFile[] = []
  @state() private dragging = false

  static styles = css`
    :host {
      display: block;
    }
    .dropzone {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 32px 20px;
      border: 2px dashed var(--upload-border, #d1d5db);
      border-radius: 12px;
      background: var(--upload-bg, #fafafa);
      cursor: pointer;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .dropzone.dragging {
      border-color: var(--upload-accent, #6366f1);
      background: var(--upload-active-bg, #eef2ff);
    }
    .dropzone.has-files {
      border-style: solid;
      border-color: var(--upload-border-has, #e5e7eb);
      background: var(--upload-bg-has, #ffffff);
      cursor: default;
    }
    .upload-icon {
      width: 40px;
      height: 40px;
      color: var(--upload-accent, #6366f1);
      opacity: 0.7;
    }
    .dropzone.dragging .upload-icon {
      opacity: 1;
    }
    .upload-label {
      font-size: 15px;
      font-weight: 600;
      color: var(--upload-label-color, #374151);
      text-align: center;
    }
    .upload-hint {
      font-size: 13px;
      color: var(--upload-hint-color, #9ca3af);
      text-align: center;
    }
    .browse-link {
      color: var(--upload-accent, #6366f1);
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .file-list {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .file-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      background: var(--upload-file-bg, #f9fafb);
      border: 1px solid var(--upload-file-border, #e5e7eb);
      border-radius: 8px;
    }
    .file-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--upload-accent, #6366f1);
    }
    .file-info {
      flex: 1;
      min-width: 0;
    }
    .file-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--upload-file-name, #1f2937);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-meta {
      font-size: 11px;
      color: var(--upload-file-meta, #9ca3af);
      margin-top: 2px;
    }
    .file-remove {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--upload-remove, #9ca3af);
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s, background 0.15s;
      flex-shrink: 0;
    }
    .file-remove:hover {
      color: var(--upload-remove-hover, #ef4444);
      background: var(--upload-remove-bg, #fef2f2);
    }
    input[type="file"] {
      display: none;
    }

    @media (max-width: 480px) {
      .dropzone {
        padding: 24px 16px;
      }
      .upload-icon {
        width: 32px;
        height: 32px;
      }
      .file-item {
        padding: 8px 12px;
      }
    }
  `

  private _onDragOver(e: DragEvent) {
    e.preventDefault()
    this.dragging = true
  }

  private _onDragLeave() {
    this.dragging = false
  }

  private _onDrop(e: DragEvent) {
    e.preventDefault()
    this.dragging = false
    if (e.dataTransfer?.files) {
      this._addFiles(Array.from(e.dataTransfer.files))
    }
  }

  private _onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.files) {
      this._addFiles(Array.from(input.files))
      input.value = ''
    }
  }

  private _addFiles(newFiles: File[]) {
    const mapped: UploadedFile[] = newFiles.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
    }))
    if (this.multiple) {
      this.files = [...this.files, ...mapped]
    } else {
      this.files = mapped
    }
    this.dispatchEvent(new CustomEvent('upload-change', {
      detail: { files: this.files },
      bubbles: true,
      composed: true,
    }))
  }

  private _removeFile(index: number) {
    this.files = this.files.filter((_, i) => i !== index)
    this.dispatchEvent(new CustomEvent('upload-change', {
      detail: { files: this.files },
      bubbles: true,
      composed: true,
    }))
  }

  private _openFilePicker() {
    const input = this.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement
    input?.click()
  }

  private _formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  private _fileIcon(type: string): TemplateResult {
    if (type.startsWith('image/')) {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`
    }
    if (type.includes('pdf')) {
      return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
    }
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  }

  render() {
    return html`
      <div
        class="dropzone ${this.dragging ? 'dragging' : ''} ${this.files.length > 0 ? 'has-files' : ''}"
        @click=${this.files.length === 0 ? this._openFilePicker : undefined}
        @dragover=${this._onDragOver}
        @dragleave=${this._onDragLeave}
        @drop=${this._onDrop}
        role="button"
        tabindex="0"
        aria-label="${this.label}"
      >
        <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <div class="upload-label">${this.label}</div>
        <div class="upload-hint">${this.hint}</div>
      </div>

      <input
        type="file"
        accept=${this.accept}
        ?multiple=${this.multiple}
        @change=${this._onFileSelect}
      />

      ${this.files.length > 0 ? html`
        <div class="file-list">
          ${this.files.map((file, i) => html`
            <div class="file-item">
              <span class="file-icon">${this._fileIcon(file.type)}</span>
              <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">${this._formatSize(file.size)}</div>
              </div>
              <button class="file-remove" @click=${(e: Event) => { e.stopPropagation(); this._removeFile(i) }} aria-label="Remove ${file.name}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          `)}
        </div>
      ` : ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-upload': ShowcaseUpload
  }
}

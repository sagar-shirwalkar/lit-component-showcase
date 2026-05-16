import { LitElement, html, css } from 'lit'
import type { TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './components/button.ts'
import './components/card.ts'
import './components/input.ts'
import './components/modal.ts'
import './components/tabs.ts'
import './components/toggle.ts'
import './components/alert.ts'
import './components/badge.ts'
import './components/dropdown.ts'
import './components/accordion.ts'
import './components/calendar.ts'
import './components/data-table.ts'
import './components/navbar.ts'
import './components/checkbox.ts'
import './components/slider.ts'
import './components/drawer.ts'
import './components/pagination.ts'
import './components/sidebar.ts'
import './components/upload.ts'
import './components/transfer.ts'
import './components/timeline.ts'
import './components/notification.ts'

@customElement('showcase-app')
export class ShowcaseApp extends LitElement {
  @state() private activeTab = 'button'
  @state() private darkMode = false
  @state() private modalOpen = false
  @state() private toggleState = false
  @state() private dropdownOpen = false
  @state() private inputValue = ''
  @state() private accordionOpen = new Set(['item-1'])
  @state() private drawerOpen = false
  @state() private selectedDate?: Date
  @state() private sliderValue = 50
  @state() private brightnessValue = 70
  @state() private rangeMin = 50
  @state() private rangeMax = 350
  @state() private otpValue = ''
  @state() private pwValue = ''
  @state() private badgeCount = 0
  @state() private tagList = ['React', 'Lit', 'TypeScript', 'CSS', 'Vite']
  @state() private selectedHour = 12
  @state() private selectedMinute = 0
  @state() private selectedTimezone = 'UTC'
  @state() private checkboxStates = new Map<string, boolean>()
  @state() private tablePage = 1
  @state() private editableTablePage = 1
  @state() private editableTableCols = ['ID', 'Name', 'Email', 'Role']
  @state() private editableTableRows: Record<string, string>[] = [
    { ID: '1', Name: 'Alice Johnson', Email: 'alice@test.com', Role: 'Admin' },
    { ID: '2', Name: 'Bob Smith', Email: 'bob@test.com', Role: 'User' },
    { ID: '3', Name: 'Charlie Brown', Email: 'charlie@test.com', Role: 'Editor' },
    { ID: '4', Name: 'Diana Prince', Email: 'diana@test.com', Role: 'User' },
    { ID: '5', Name: 'Edward King', Email: 'edward@test.com', Role: 'Admin' },
  ]
  @state() private newColName = ''
  @state() private newRowInputs: Record<string, string> = {}
  @state() private editingCell: string | null = null
  @state() private hoveredCell: string | null = null
  @state() private paginationPage = 1
  @state() private tabsDemoActive = 'tab1'
  @state() private tabsDemoTabs: { id: string; label: string; icon?: TemplateResult; closable?: boolean }[] = [
    { id: 'tab1', label: 'Overview', icon: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`, closable: false },
    { id: 'tab2', label: 'Details', icon: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`, closable: true },
    { id: 'tab3', label: 'Settings', icon: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`, closable: true },
  ]
  @state() private _tabCounter = 4
  @state() private drawerEmailNotif = true
  @state() private drawerPushNotif = false
  @state() private drawerWeeklyDigest = false
  @state() private drawerAutoUpdate = true
  @state() private sidebarOpen = false
  @state() private sidebarDemoOpen = false
  @state() private transferSource = [
    { id: 'js', label: 'JavaScript' },
    { id: 'ts', label: 'TypeScript' },
    { id: 'py', label: 'Python' },
    { id: 'rs', label: 'Rust' },
    { id: 'go', label: 'Go' },
    { id: 'rb', label: 'Ruby' },
    { id: 'java', label: 'Java' },
    { id: 'kt', label: 'Kotlin' },
  ]
  @state() private transferTarget: { id: string; label: string }[] = []
  @state() private timelineItems = [
    { id: 't1', title: 'Project Kickoff', description: 'Initial team meeting and stakeholder alignment.', completed: true, date: '2025-01-15', time: '09:00' },
    { id: 't2', title: 'Requirements Gathering', description: 'Document all functional and technical requirements.', completed: true, date: '2025-02-01', time: '14:30' },
    { id: 't3', title: 'Design Phase', description: 'Wireframes, mockups, and architecture review.', completed: true, date: '2025-03-10' },
    { id: 't4', title: 'Development Sprint', description: 'Core development and feature implementation.', completed: false },
    { id: 't5', title: 'Testing & QA', description: 'Integration testing, bug fixes, and performance tuning.', completed: false },
    { id: 't6', title: 'Deployment', description: 'Production release and monitoring setup.', completed: false },
  ]
  @state() private showNotification = false
  @state() private signupName = ''
  @state() private signupEmail = ''
  @state() private signupPassword = ''
  @state() private signupAccountType = 'personal'
  @state() private signupAgreed = false
  @state() private signupSubmitted = false

  private componentGroups = [
    {
      category: 'Form Controls',
      items: [
        { id: 'button', label: 'Button', desc: 'Versatile button with variants, sizes, and states' },
        { id: 'input', label: 'Input', desc: 'Text input with labels, validation, and multiple styles' },
        { id: 'checkbox', label: 'Checkbox', desc: 'Checkbox with label and disabled state support' },
        { id: 'toggle', label: 'Toggle', desc: 'Binary on/off switch for boolean settings' },
        { id: 'slider', label: 'Slider', desc: 'Range input with configurable min, max, and step' },
        { id: 'upload', label: 'Upload', desc: 'File upload with drag-drop, preview, and removal' },
      ],
    },
    {
      category: 'Display',
      items: [
        { id: 'card', label: 'Card', desc: 'Content container with default, bordered, and elevated variants' },
        { id: 'badge', label: 'Badge', desc: 'Compact label for statuses, tags, and counts' },
        { id: 'status', label: 'Status', desc: 'Contextual message with four severity levels' },
        { id: 'notification', label: 'Notification', desc: 'Temporary toast that slides in from the top-right' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { id: 'tabs', label: 'Tabs', desc: 'Horizontal tab group for switching content sections' },
        { id: 'navbar', label: 'Navbar', desc: 'Top navigation bar with brand and links' },
        { id: 'accordion', label: 'Accordion', desc: 'Collapsible content sections with animation' },
        { id: 'pagination', label: 'Pagination', desc: 'Page controls with total count awareness' },
        { id: 'dropdown', label: 'Dropdown', desc: 'Floating menu anchored to a trigger button' },
        { id: 'sidebar', label: 'Sidebar', desc: 'Left-sliding panel with icon-driven navigation items' },
      ],
    },
    {
      category: 'Overlay',
      items: [
        { id: 'modal', label: 'Modal', desc: 'Focused dialog layered over content with a backdrop' },
        { id: 'drawer', label: 'Drawer', desc: 'Side panel that slides in from the right edge' },
      ],
    },
    {
      category: 'Data',
      items: [
        { id: 'data-table', label: 'Data Table', desc: 'Tabular data display with built-in pagination' },
        { id: 'calendar', label: 'Calendar', desc: 'Date picker with month and year dropdown navigation' },
        { id: 'transfer', label: 'Transfer', desc: 'Dual-column list for moving items between source and target' },
        { id: 'timeline', label: 'Timeline', desc: 'Vertical timeline with completion states and date tracking' },
      ],
    },
  ]

  updated() {
    if (this.darkMode) {
      this.setAttribute('dark', '')
      document.documentElement.style.background = '#0a0a0a'
      document.body.style.background = '#0a0a0a'
    } else {
      this.removeAttribute('dark')
      document.documentElement.style.background = '#f4f4f5'
      document.body.style.background = '#f4f4f5'
    }
    document.body.style.margin = '0'
    document.body.style.padding = '0'
  }

  private get currentComponent() {
    for (const group of this.componentGroups) {
      const item = group.items.find(i => i.id === this.activeTab)
      if (item) return { ...item, category: group.category }
    }
    return null
  }

  private toggleAccordion(id: string) {
    const newSet = new Set(this.accordionOpen)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    this.accordionOpen = newSet
  }

  private toggleCheckbox(id: string) {
    const newMap = new Map(this.checkboxStates)
    newMap.set(id, !newMap.get(id))
    this.checkboxStates = newMap
  }

  private tile(label: string, body: TemplateResult) {
    return html`
      <div class="demo-tile">
        <div class="demo-tile-header"><span class="demo-tile-label">${label}</span></div>
        <div class="demo-tile-body">${body}</div>
      </div>
    `
  }

  private renderButtonDemo() {
    return html`
      ${this.tile('Variants', html`
        <div class="demo-row">
          <showcase-button variant="primary" tooltip="Primary action">Primary</showcase-button>
          <showcase-button variant="secondary" tooltip="Secondary action">Secondary</showcase-button>
          <showcase-button variant="danger" tooltip="Destructive action">Danger</showcase-button>
          <showcase-button variant="ghost" tooltip="Minimal style">Ghost</showcase-button>
        </div>
      `)}
      ${this.tile('Floating Action Buttons', html`
        <div class="demo-row">
          <showcase-button circle variant="primary" tooltip="Add new item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </showcase-button>
          <showcase-button circle variant="secondary" tooltip="Edit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </showcase-button>
          <showcase-button circle variant="danger" tooltip="Delete">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </showcase-button>
          <showcase-button circle size="lg" variant="ghost" tooltip="Settings">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </showcase-button>
        </div>
      `)}
      ${this.tile('States', html`
        <div class="demo-row">
          <showcase-button ?disabled=${true}>Disabled</showcase-button>
          <showcase-button ?loading=${true}>Loading</showcase-button>
        </div>
      `)}
      ${this.tile('Button Group', html`
        <showcase-button-group .buttons=${[
          { label: 'Day', variant: 'primary' as const },
          { label: 'Week', icon: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
          { label: 'Month' },
          { label: 'Year', disabled: true },
        ]}></showcase-button-group>
      `)}
    `
  }

  private renderCardDemo() {
    return html`
      ${this.tile('Variants', html`
        <div class="demo-grid">
          <showcase-card variant="default" title="Default Card">
            <p style="margin:0 0 16px">Subtle border and background for general content.</p>
            <div style="display:flex;gap:8px">
              <showcase-button size="sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/></svg>
                Edit
              </showcase-button>
              <showcase-button size="sm" variant="outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View
              </showcase-button>
            </div>
          </showcase-card>
          <showcase-card variant="bordered" title="Bordered Card">
            <p style="margin:0 0 16px">Prominent border accent for emphasis.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <span style="padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;background:#eef2ff;color:#6366f1">React</span>
              <span style="padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;background:#ecfdf5;color:#10b981">TypeScript</span>
              <span style="padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;background:#fef3c7;color:#f59e0b">Lit</span>
            </div>
            <a href="#" style="display:inline-flex;align-items:center;gap:6px;margin-top:12px;font-size:13px;color:#6366f1;text-decoration:none">
              Learn more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </showcase-card>
          <showcase-card variant="elevated" title="Elevated Card" .hoverable=${true}>
            <p style="margin:0 0 12px">Drop shadow with lift animation on hover.</p>
            <div style="display:flex;gap:10px;margin-bottom:16px">
              <showcase-button circle size="sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              </showcase-button>
              <showcase-button circle size="sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </showcase-button>
              <showcase-button circle size="sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </showcase-button>
            </div>
            <showcase-button size="sm" style="width:100%">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Send Feedback
            </showcase-button>
          </showcase-card>
        </div>
      `)}
    `
  }

  private renderInputDemo() {
    return html`
      ${this.tile('Variants', html`
        <div class="demo-stack">
          <showcase-input
            label="Default"
            placeholder="Enter text..."
            .value=${this.inputValue}
            @input-change=${(e: CustomEvent) => this.inputValue = e.detail.value}
          ></showcase-input>
          <showcase-input label="Filled" variant="filled" placeholder="Filled style"></showcase-input>
          <showcase-input label="Outlined" variant="outlined" placeholder="Outlined style"></showcase-input>
        </div>
      `)}
      ${this.tile('Password', html`
        <showcase-input label="Password" type="password" placeholder="Enter password" .value=${this.pwValue} @input-change=${(e: CustomEvent) => this.pwValue = e.detail.value}></showcase-input>
      `)}
      ${this.tile('OTP Code', html`
        <div class="demo-stack">
          <showcase-otp .length=${6} .value=${this.otpValue} @otp-change=${(e: CustomEvent) => this.otpValue = e.detail.value}></showcase-otp>
          ${this.otpValue.length === 6 ? html`<p style="font-size:13px;color:var(--text-2);margin:4px 0 0">Code entered: ${this.otpValue}</p>` : ''}
        </div>
      `)}
      ${this.tile('States', html`
        <div class="demo-stack">
          <showcase-input
            label="Error"
            .error=${true}
            errorMessage="This field is required"
            placeholder="Invalid input"
          ></showcase-input>
          <showcase-input label="Disabled" .disabled=${true} value="Cannot edit"></showcase-input>
        </div>
      `)}
    `
  }

  private renderModalDemo() {
    return html`
      ${this.tile('Sign Up Modal', html`
        <showcase-button @click=${() => { this.modalOpen = true; this.signupSubmitted = false; this.signupName = ''; this.signupEmail = ''; this.signupPassword = ''; this.signupAccountType = 'personal'; this.signupAgreed = false }}>Open Sign Up</showcase-button>
        <showcase-modal
          ?open=${this.modalOpen}
          title="Create an Account"
          @close=${() => this.modalOpen = false}
        >
          ${this.signupSubmitted ? html`
            <div class="signup-success">
              <div class="signup-success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 class="signup-success-title">Welcome, ${this.signupName || 'friend'}!</h3>
              <p>Your account has been created. Check your inbox for a confirmation email.</p>
              <div class="modal-actions">
                <showcase-button @click=${() => this.modalOpen = false}>Got it</showcase-button>
              </div>
            </div>
          ` : html`
            <div class="signup-form">
              <div class="signup-field">
                <label class="signup-label">Full Name</label>
                <showcase-input
                  placeholder="Jane Doe"
                  .value=${this.signupName}
                  @input-change=${(e: CustomEvent) => this.signupName = e.detail.value}
                ></showcase-input>
              </div>
              <div class="signup-field">
                <label class="signup-label">Email</label>
                <showcase-input
                  placeholder="jane@example.com"
                  .value=${this.signupEmail}
                  @input-change=${(e: CustomEvent) => this.signupEmail = e.detail.value}
                ></showcase-input>
              </div>
              <div class="signup-field">
                <label class="signup-label">Password</label>
                <showcase-input
                  placeholder="Create a strong password"
                  .value=${this.signupPassword}
                  @input-change=${(e: CustomEvent) => this.signupPassword = e.detail.value}
                ></showcase-input>
              </div>
              <div class="signup-field">
                <label class="signup-label">Account Type</label>
                <div class="signup-radio-group">
                  <label class="signup-radio">
                    <input type="radio" name="accountType" value="personal" ?checked=${this.signupAccountType === 'personal'} @change=${() => this.signupAccountType = 'personal'}>
                    <span>Personal</span>
                  </label>
                  <label class="signup-radio">
                    <input type="radio" name="accountType" value="business" ?checked=${this.signupAccountType === 'business'} @change=${() => this.signupAccountType = 'business'}>
                    <span>Business</span>
                  </label>
                  <label class="signup-radio">
                    <input type="radio" name="accountType" value="enterprise" ?checked=${this.signupAccountType === 'enterprise'} @change=${() => this.signupAccountType = 'enterprise'}>
                    <span>Enterprise</span>
                  </label>
                </div>
              </div>
              <div class="signup-field">
                <showcase-checkbox
                  label="I agree to the Terms of Service and Privacy Policy"
                  .checked=${this.signupAgreed}
                  @change=${() => this.signupAgreed = !this.signupAgreed}
                ></showcase-checkbox>
              </div>
            </div>
            <div class="modal-actions">
              <showcase-button variant="ghost" @click=${() => this.modalOpen = false}>Cancel</showcase-button>
              <showcase-button
                @click=${() => this.signupSubmitted = true}
                ?disabled=${!this.signupName || !this.signupEmail || !this.signupPassword || !this.signupAgreed}
              >Create Account</showcase-button>
            </div>
          `}
        </showcase-modal>
      `)}
    `
  }

  private renderTabsDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <showcase-tabs
          .tabs=${this.tabsDemoTabs}
          .activeTab=${this.tabsDemoActive}
          .addable=${true}
          @tab-change=${(e: CustomEvent) => this.tabsDemoActive = e.detail.tab}
          @tab-close=${(e: CustomEvent) => {
            const id = e.detail.tab
            this.tabsDemoTabs = this.tabsDemoTabs.filter(t => t.id !== id)
            if (this.tabsDemoActive === id) {
              this.tabsDemoActive = this.tabsDemoTabs[0]?.id ?? ''
            }
          }}
          @tab-add=${() => {
            const id = `tab${this._tabCounter++}`
            this.tabsDemoTabs = [...this.tabsDemoTabs, { id, label: `Tab ${this._tabCounter - 1}`, closable: true }]
            this.tabsDemoActive = id
          }}
        ></showcase-tabs>
        <div class="tab-content">
          ${this.tabsDemoActive === 'tab1' ? html`
            <div class="tab-demo-flex">
              <div class="tab-stat"><span class="tab-stat-value">2,847</span><span class="tab-stat-label">Active Users</span></div>
              <div class="tab-stat"><span class="tab-stat-value">94%</span><span class="tab-stat-label">Uptime</span></div>
              <div class="tab-stat"><span class="tab-stat-value">12</span><span class="tab-stat-label">Projects</span></div>
            </div>
          ` : ''}
          ${this.tabsDemoActive === 'tab2' ? html`<p>Details panel with additional information about the selected item.</p>` : ''}
          ${this.tabsDemoActive === 'tab3' ? html`
            <div class="demo-stack">
              <showcase-toggle label="Email notifications"></showcase-toggle>
              <showcase-toggle label="Two-factor authentication" .checked=${true}></showcase-toggle>
            </div>
          ` : ''}
          ${this.tabsDemoTabs.filter(t => !['tab1', 'tab2', 'tab3'].includes(t.id)).map(t =>
            this.tabsDemoActive === t.id ? html`<p>Content for <strong>${t.label}</strong> — dynamically added tab.</p>` : ''
          )}
        </div>
      `)}
    `
  }

  private renderToggleDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <div class="demo-stack">
          <showcase-toggle
            label="Enable notifications"
            .checked=${this.toggleState}
            @toggle=${(e: CustomEvent) => this.toggleState = e.detail.checked}
          ></showcase-toggle>
          <showcase-toggle label="Disabled (on)" .checked=${true} disabled></showcase-toggle>
          <showcase-toggle label="Disabled (off)" disabled></showcase-toggle>
        </div>
      `)}
    `
  }

  private renderStatusDemo() {
    return html`
      ${this.tile('All Severity Levels', html`
        <div class="demo-stack">
          <showcase-alert type="info" title="Information">
            This is an informational alert message.
          </showcase-alert>
          <showcase-alert type="success" title="Success">
            Your changes have been saved successfully.
          </showcase-alert>
          <showcase-alert type="warning" title="Warning">
            Please review your input before proceeding.
          </showcase-alert>
          <showcase-alert type="error" title="Error">
            Something went wrong. Please try again.
          </showcase-alert>
        </div>
      `)}
    `
  }

  private renderBadgeDemo() {
    return html`
      ${this.tile('Color Variants', html`
        <div class="demo-row">
          <showcase-badge>Default</showcase-badge>
          <showcase-badge color="primary">Primary</showcase-badge>
          <showcase-badge color="success">Success</showcase-badge>
          <showcase-badge color="warning">Warning</showcase-badge>
          <showcase-badge color="danger">Danger</showcase-badge>
        </div>
      `)}
      ${this.tile('Tags', html`
        <div class="demo-row" style="flex-wrap:wrap">
          ${this.tagList.map((tag, i) => html`
            <showcase-badge type="tag" color="primary" .removable=${true} @remove=${() => this.tagList = this.tagList.filter((_, j) => j !== i)}>${tag}</showcase-badge>
          `)}
        </div>
      `)}
      ${this.tile('Count on Click', html`
        <div style="display:flex;align-items:center;gap:12px">
          <showcase-button @click=${() => this.badgeCount++} circle size="sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </showcase-button>
          <showcase-badge color="primary">${this.badgeCount}</showcase-badge>
          <span style="font-size:13px;color:var(--text-2)">click the + button</span>
        </div>
      `)}
    `
  }

  private renderDropdownDemo() {
    return html`
      ${this.tile('Click Dropdown', html`
        <showcase-dropdown
          label="Options"
          .open=${this.dropdownOpen}
          @toggle=${(e: CustomEvent) => this.dropdownOpen = e.detail.open}
        >
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false }}>Edit</showcase-dropdown-item>
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false }}>Duplicate</showcase-dropdown-item>
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false }}>Archive</showcase-dropdown-item>
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false }}>Delete</showcase-dropdown-item>
        </showcase-dropdown>
      `)}
      ${this.tile('Hover Dropdown', html`
        <showcase-dropdown
          label="Quick Actions"
          trigger="hover"
          icon="none"
        >
          <showcase-dropdown-item>View Profile</showcase-dropdown-item>
          <showcase-dropdown-item>Settings</showcase-dropdown-item>
          <showcase-dropdown-item>Help Center</showcase-dropdown-item>
          <showcase-dropdown-item>Logout</showcase-dropdown-item>
        </showcase-dropdown>
      `)}
    `
  }

  private renderAccordionDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <showcase-accordion>
          <showcase-accordion-item
            id="item-1"
            title="What is Lit?"
            ?open=${this.accordionOpen.has('item-1')}
            @toggle=${() => this.toggleAccordion('item-1')}
          >
            <p>Lit is a simple library for building fast, lightweight web components.</p>
          </showcase-accordion-item>
          <showcase-accordion-item
            id="item-2"
            title="How do I get started?"
            ?open=${this.accordionOpen.has('item-2')}
            @toggle=${() => this.toggleAccordion('item-2')}
          >
            <p>Install Lit via npm and start building your own web components today.</p>
          </showcase-accordion-item>
          <showcase-accordion-item
            id="item-3"
            title="Is it production ready?"
            ?open=${this.accordionOpen.has('item-3')}
            @toggle=${() => this.toggleAccordion('item-3')}
          >
            <p>Yes! Lit is used by many companies in production applications.</p>
          </showcase-accordion-item>
        </showcase-accordion>
      `)}
    `
  }

  private renderCalendarDemo() {
    const timezones = ['UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney', 'Pacific/Auckland']
    return html`
      ${this.tile('Date Picker', html`
        <div class="demo-stack">
          <showcase-calendar
            .value=${this.selectedDate?.getDate()}
            @change=${(e: CustomEvent) => this.selectedDate = e.detail.date}
          ></showcase-calendar>
          <p class="demo-note">
            ${this.selectedDate
              ? `Selected: ${this.selectedDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}`
              : 'Click a date to select it'
            }
          </p>
        </div>
      `)}
      ${this.tile('Date & Time', html`
        <div class="demo-stack">
          <showcase-calendar
            .value=${this.selectedDate?.getDate()}
            @change=${(e: CustomEvent) => this.selectedDate = e.detail.date}
          ></showcase-calendar>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <div style="flex:1;min-width:80px">
              <label style="display:block;font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:4px">Hour (24h)</label>
              <input type="number" min="0" max="23"
                .value=${String(this.selectedHour).padStart(2, '0')}
                @input=${(e: InputEvent) => {
                  const v = parseInt((e.target as HTMLInputElement).value)
                  if (!isNaN(v) && v >= 0 && v <= 23) this.selectedHour = v
                }}
                style="width:100%;padding:10px 12px;border:1px solid var(--input-border,#d1d5db);border-radius:8px;font-size:14px;background:var(--input-bg,#fff);color:var(--input-text,#374151);box-sizing:border-box"
              >
            </div>
            <div style="flex:1;min-width:80px">
              <label style="display:block;font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:4px">Minute</label>
              <input type="number" min="0" max="59"
                .value=${String(this.selectedMinute).padStart(2, '0')}
                @input=${(e: InputEvent) => {
                  const v = parseInt((e.target as HTMLInputElement).value)
                  if (!isNaN(v) && v >= 0 && v <= 59) this.selectedMinute = v
                }}
                style="width:100%;padding:10px 12px;border:1px solid var(--input-border,#d1d5db);border-radius:8px;font-size:14px;background:var(--input-bg,#fff);color:var(--input-text,#374151);box-sizing:border-box"
              >
            </div>
            <div style="flex:2;min-width:160px">
              <label style="display:block;font-size:12px;font-weight:600;color:var(--text-2);margin-bottom:4px">Timezone</label>
              <select
                .value=${this.selectedTimezone}
                @change=${(e: Event) => this.selectedTimezone = (e.target as HTMLSelectElement).value}
                style="width:100%;padding:10px 12px;border:1px solid var(--input-border,#d1d5db);border-radius:8px;font-size:14px;background:var(--input-bg,#fff);color:var(--input-text,#374151);box-sizing:border-box"
              >
                ${timezones.map(tz => html`
                  <option value="${tz}" ?selected=${tz === this.selectedTimezone}>${tz.replace(/_/g, ' ').replace(/\//g, ' / ')}</option>
                `)}
              </select>
            </div>
          </div>
          <p class="demo-note">
            Selected:
            ${this.selectedDate ? this.selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '--/--/----'}
            ${String(this.selectedHour).padStart(2, '0')}:${String(this.selectedMinute).padStart(2, '0')}
            ${this.selectedTimezone}
          </p>
        </div>
      `)}
    `
  }

  private _addColumn() {
    const name = this.newColName.trim()
    if (!name || this.editableTableCols.includes(name)) return
    this.editableTableCols = [...this.editableTableCols, name]
    this.editableTableRows = this.editableTableRows.map(row => ({ ...row, [name]: '-' }))
    this.newColName = ''
  }

  private renderDataTableDemo() {
    const columns = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role', render: (value: string) => html`<span class="role-badge">${value}</span>` },
    ]
    const data = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
      { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor' },
      { id: 5, name: 'Edward King', email: 'edward@example.com', role: 'User' },
      { id: 6, name: 'Fiona Green', email: 'fiona@example.com', role: 'Admin' },
      { id: 7, name: 'George Hill', email: 'george@example.com', role: 'User' },
      { id: 8, name: 'Hannah Lee', email: 'hannah@example.com', role: 'Editor' },
    ]
    return html`
      ${this.tile('Paginated Table', html`
        <showcase-data-table
          .columns=${columns}
          .data=${data}
          .pageSize=${5}
          .currentPage=${this.tablePage}
          @page-change=${(e: CustomEvent) => this.tablePage = e.detail.page}
        ></showcase-data-table>
      `)}
      ${this.tile('Editable Table', html`
        <div class="editable-table-wrap">
          <showcase-data-table
            .columns=${this.editableTableCols.map(col => ({
              key: col,
              header: col,
              render: (_: string, row: any) => {
                const idx = this.editableTableRows.indexOf(row)
                const cellKey = `${idx}-${col}`
                const isEditing = this.editingCell === cellKey
                const isHovered = this.hoveredCell === cellKey
                if (isEditing) {
                  return html`
                    <span style="display:inline-flex;align-items:center;gap:4px;width:100%">
                      <input
                        .value=${row[col] || ''}
                        @input=${(e: InputEvent) => {
                          const v = (e.target as HTMLInputElement).value
                          this.editableTableRows = this.editableTableRows.map((r, i) =>
                            i === idx ? { ...r, [col]: v } : r
                          )
                        }}
                        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this.editingCell = null }}
                        style="flex:1;min-width:0;padding:4px 6px;border:1px solid var(--table-accent,#6366f1);border-radius:4px;font-size:13px;background:var(--input-bg,#fff);color:var(--input-text,#374151);outline:none"
                      >
                      <span
                        @click=${() => this.editingCell = null}
                        style="display:flex;align-items:center;cursor:pointer;color:var(--table-accent,#6366f1);flex-shrink:0"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                    </span>
                  `
                }
                return html`
                  <span
                    style="display:inline-flex;align-items:center;gap:4px;width:100%;cursor:pointer"
                    @mouseenter=${() => this.hoveredCell = cellKey}
                    @mouseleave=${() => { if (this.hoveredCell === cellKey) this.hoveredCell = null }}
                    @click=${() => this.editingCell = cellKey}
                  >
                    <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${row[col] || ''}</span>
                    <span style="display:flex;align-items:center;flex-shrink:0;color:var(--table-accent,#6366f1);${isHovered ? 'opacity:1' : 'opacity:0.25'};transition:opacity 0.15s">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </span>
                  </span>
                `
              }
            }))}
            .data=${this.editableTableRows}
            .pageSize=${5}
            .currentPage=${this.editableTablePage}
            @page-change=${(e: CustomEvent) => this.editableTablePage = e.detail.page}
          ></showcase-data-table>
          <div style="border-top:1px solid var(--border,#e5e7eb);padding-top:12px">
            <div style="font-size:13px;font-weight:600;color:var(--text-2);margin-bottom:8px">Add Row</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${this.editableTableCols.filter(c => c !== 'ID').map(col => html`
                <input
                  placeholder="${col}"
                  .value=${this.newRowInputs[col] || ''}
                  @input=${(e: InputEvent) => {
                    const val = (e.target as HTMLInputElement).value
                    this.newRowInputs = { ...this.newRowInputs, [col]: val }
                  }}
                  style="flex:1;min-width:100px;padding:8px 10px;border:1px solid var(--input-border,#d1d5db);border-radius:6px;font-size:13px;background:var(--input-bg,#fff);color:var(--input-text,#374151)"
                >
              `)}
              <showcase-button size="sm" @click=${() => {
                const hasValue = Object.values(this.newRowInputs).some(v => v?.trim())
                if (!hasValue) return
                const nextId = String(Math.max(0, ...this.editableTableRows.map(r => parseInt(r.ID) || 0)) + 1)
                this.editableTableRows = [...this.editableTableRows, { ID: nextId, ...this.newRowInputs }]
                this.newRowInputs = {}
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </showcase-button>
            </div>
          </div>
          <div style="border-top:1px solid var(--border,#e5e7eb);padding-top:12px">
            <div style="font-size:13px;font-weight:600;color:var(--text-2);margin-bottom:8px">Add Column</div>
            <div style="display:flex;gap:8px">
              <input
                placeholder="Column name"
                .value=${this.newColName}
                @input=${(e: InputEvent) => this.newColName = (e.target as HTMLInputElement).value}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._addColumn() }}
                style="flex:1;padding:8px 10px;border:1px solid var(--input-border,#d1d5db);border-radius:6px;font-size:13px;background:var(--input-bg,#fff);color:var(--input-text,#374151)"
              >
              <showcase-button size="sm" @click=${() => this._addColumn()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </showcase-button>
            </div>
          </div>
        </div>
      `)}
    `
  }

  private renderNavbarDemo() {
    return html`
      ${this.tile('Navigation Bar', html`
        <div class="demo-stack">
          <showcase-navbar
            brand="MyApp"
            .search=${true}
            .links=${[
              { label: 'Home', href: '#', icon: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
              { label: 'Explore', href: '#', icon: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`, badge: 'New' },
              { label: 'Docs', href: '#', icon: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>` },
            ]}
            .actions=${[
              { type: 'notification', badge: 'true' },
              { type: 'avatar' },
            ]}
          ></showcase-navbar>
        </div>
      `)}
    `
  }

  private renderCheckboxDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <div class="demo-stack">
          <showcase-checkbox
            label="Accept terms and conditions"
            .checked=${this.checkboxStates.get('terms') || true}
            @change=${() => this.toggleCheckbox('terms')}
          ></showcase-checkbox>
          <showcase-checkbox
            label="Subscribe to newsletter"
            .checked=${this.checkboxStates.get('newsletter') || false}
            @change=${() => this.toggleCheckbox('newsletter')}
          ></showcase-checkbox>
          <showcase-checkbox label="Disabled (checked)" .checked=${true} disabled></showcase-checkbox>
        </div>
      `)}
      ${this.tile('Checkbox Group', html`
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          <div style="width:100%;font-size:13px;font-weight:600;color:var(--text-2)">Select your interests</div>
          <showcase-checkbox
            label="Technology"
            .checked=${this.checkboxStates.get('tech') || false}
            @change=${() => this.toggleCheckbox('tech')}
          ></showcase-checkbox>
          <showcase-checkbox
            label="Design"
            .checked=${this.checkboxStates.get('design') || false}
            @change=${() => this.toggleCheckbox('design')}
          ></showcase-checkbox>
          <showcase-checkbox
            label="Business"
            .checked=${this.checkboxStates.get('business') || false}
            @change=${() => this.toggleCheckbox('business')}
          ></showcase-checkbox>
          <showcase-checkbox
            label="Science"
            .checked=${this.checkboxStates.get('science') || false}
            @change=${() => this.toggleCheckbox('science')}
          ></showcase-checkbox>
        </div>
      `)}
    `
  }

  private renderSliderDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <div class="demo-stack">
          <showcase-slider
            label="Volume"
            .value=${this.sliderValue}
            .min=${0}
            .max=${100}
            @change=${(e: CustomEvent) => this.sliderValue = e.detail.value}
          ></showcase-slider>
          <showcase-slider
            label="Brightness"
            .value=${this.brightnessValue}
            .min=${0}
            .max=${100}
            .step=${10}
            .icon=${html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`}
            @change=${(e: CustomEvent) => this.brightnessValue = e.detail.value}
          ></showcase-slider>
          <showcase-range-slider
            label="Price Range"
            prefix="$"
            .min=${0}
            .max=${500}
            .step=${10}
            .valueMin=${this.rangeMin}
            .valueMax=${this.rangeMax}
            @change=${(e: CustomEvent) => { this.rangeMin = e.detail.valueMin; this.rangeMax = e.detail.valueMax }}
          ></showcase-range-slider>
        </div>
      `)}
    `
  }

  private renderDrawerDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <showcase-button @click=${() => this.drawerOpen = true}>Open Settings</showcase-button>

        <showcase-drawer
          ?open=${this.drawerOpen}
          title="User Settings"
          @close=${() => this.drawerOpen = false}
        >
          <div class="drawer-section">
            <div class="drawer-profile">
              <div class="drawer-avatar">AS</div>
              <div class="drawer-profile-info">
                <div class="drawer-profile-name">Alex Smith</div>
                <showcase-badge color="primary">Pro Plan</showcase-badge>
              </div>
            </div>
          </div>
          <div class="drawer-divider"></div>
          <div class="drawer-section">
            <div class="drawer-section-title">Account</div>
            <showcase-input label="Display Name" value="Alex Smith" variant="outlined"></showcase-input>
            <showcase-input label="Email" value="alex@example.com" variant="outlined"></showcase-input>
          </div>
          <div class="drawer-divider"></div>
          <div class="drawer-section">
            <div class="drawer-section-title">Notifications</div>
            <showcase-toggle
              label="Email notifications"
              .checked=${this.drawerEmailNotif}
              @toggle=${(e: CustomEvent) => this.drawerEmailNotif = e.detail.checked}
            ></showcase-toggle>
            <showcase-toggle
              label="Push notifications"
              .checked=${this.drawerPushNotif}
              @toggle=${(e: CustomEvent) => this.drawerPushNotif = e.detail.checked}
            ></showcase-toggle>
          </div>
          <div class="drawer-divider"></div>
          <div class="drawer-section">
            <div class="drawer-section-title">Preferences</div>
            <showcase-checkbox
              label="Weekly digest emails"
              .checked=${this.drawerWeeklyDigest}
              @change=${() => this.drawerWeeklyDigest = !this.drawerWeeklyDigest}
            ></showcase-checkbox>
            <showcase-checkbox
              label="Auto-update application"
              .checked=${this.drawerAutoUpdate}
              @change=${() => this.drawerAutoUpdate = !this.drawerAutoUpdate}
            ></showcase-checkbox>
          </div>
          <div class="drawer-footer">
            <showcase-button variant="ghost" @click=${() => this.drawerOpen = false}>Cancel</showcase-button>
            <showcase-button variant="primary">Save Changes</showcase-button>
          </div>
        </showcase-drawer>
      `)}
    `
  }

  private renderPaginationDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <div class="demo-stack">
          <showcase-pagination
            .totalItems=${100}
            .pageSize=${10}
            .currentPage=${this.paginationPage}
            @page-change=${(e: CustomEvent) => this.paginationPage = e.detail.page}
          ></showcase-pagination>
          <p class="demo-note">Current page: ${this.paginationPage} of 10</p>
        </div>
      `)}
    `
  }

  private renderSidebarDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <showcase-button @click=${() => this.sidebarDemoOpen = true}>Open Sidebar</showcase-button>
        <showcase-sidebar
          ?open=${this.sidebarDemoOpen}
          title="Navigation"
          @close=${() => this.sidebarDemoOpen = false}
        >
          <showcase-sidebar-item label="Dashboard" .active=${true} .icon=${html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`}></showcase-sidebar-item>
          <showcase-sidebar-item label="Inbox" badge="12" .icon=${html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`}></showcase-sidebar-item>
          <showcase-sidebar-item label="Analytics" .icon=${html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`}></showcase-sidebar-item>
          <showcase-sidebar-item label="Settings" .icon=${html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`}></showcase-sidebar-item>
          <div style="height:8px"></div>
          <showcase-sidebar-item label="Help & Support" .icon=${html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`}></showcase-sidebar-item>
        </showcase-sidebar>
      `)}
    `
  }

  private renderUploadDemo() {
    return html`
      ${this.tile('Single Upload', html`
        <showcase-upload
          label="Upload an image"
          hint="PNG, JPG or WebP"
          accept="image/*"
        ></showcase-upload>
      `)}
      ${this.tile('Multiple Upload', html`
        <showcase-upload
          label="Upload files"
          hint="Drag & drop or click to browse"
          ?multiple=${true}
        ></showcase-upload>
      `)}
    `
  }

  private renderTransferDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <showcase-transfer
          .source=${this.transferSource}
          .target=${this.transferTarget}
          @transfer-change=${(e: CustomEvent) => {
            this.transferSource = e.detail.source
            this.transferTarget = e.detail.target
          }}
        ></showcase-transfer>
      `)}
    `
  }

  private renderTimelineDemo() {
    return html`
      ${this.tile('Project Milestones', html`
        <showcase-timeline .items=${this.timelineItems}></showcase-timeline>
      `)}
    `
  }

  private renderNotificationDemo() {
    return html`
      ${this.tile('Trigger Notification', html`
        <showcase-button @click=${() => this.showNotification = true}>Show Notification</showcase-button>
        <showcase-notification
          .open=${this.showNotification}
          title="Update Available"
          message="Version 2.4.1 is ready to install. Restart the app to apply the latest changes."
          @close=${() => this.showNotification = false}
        ></showcase-notification>
      `)}
    `
  }

  private renderContent() {
    switch (this.activeTab) {
      case 'button': return this.renderButtonDemo()
      case 'card': return this.renderCardDemo()
      case 'input': return this.renderInputDemo()
      case 'modal': return this.renderModalDemo()
      case 'tabs': return this.renderTabsDemo()
      case 'toggle': return this.renderToggleDemo()
      case 'status': return this.renderStatusDemo()
      case 'badge': return this.renderBadgeDemo()
      case 'notification': return this.renderNotificationDemo()
      case 'dropdown': return this.renderDropdownDemo()
      case 'accordion': return this.renderAccordionDemo()
      case 'calendar': return this.renderCalendarDemo()
      case 'data-table': return this.renderDataTableDemo()
      case 'navbar': return this.renderNavbarDemo()
      case 'checkbox': return this.renderCheckboxDemo()
      case 'slider': return this.renderSliderDemo()
      case 'drawer': return this.renderDrawerDemo()
      case 'pagination': return this.renderPaginationDemo()
      case 'sidebar': return this.renderSidebarDemo()
      case 'upload': return this.renderUploadDemo()
      case 'transfer': return this.renderTransferDemo()
      case 'timeline': return this.renderTimelineDemo()
      default: return this.renderButtonDemo()
    }
  }

  render() {
    const comp = this.currentComponent
    const totalComponents = this.componentGroups.reduce((n, g) => n + g.items.length, 0)

    return html`
      <div class="shell">

        <!-- ── Top Navbar ── -->
        <nav class="navbar">
          <div class="nav-left">
            <button class="hamburger" @click=${() => this.sidebarOpen = !this.sidebarOpen} title="Toggle menu" aria-label="Toggle navigation menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-logo" width="20" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 320"><path fill="#00E8FF" d="m64 192l25.926-44.727l38.233-19.114l63.974 63.974l10.833 61.754L192 320l-64-64l-38.074-25.615z"></path><path fill="#283198" d="M128 256V128l64-64v128l-64 64ZM0 256l64 64l9.202-60.602L64 192l-37.542 23.71L0 256Z"></path><path fill="#324FFF" d="M64 192V64l64-64v128l-64 64Zm128 128V192l64-64v128l-64 64ZM0 256V128l64 64l-64 64Z"></path><path fill="#0FF" d="M64 320V192l64 64z"></path></svg>
            <span class="nav-brand">Lit UI Kit</span>
            <span class="nav-tag">Component Library</span>
          </div>
          <div class="nav-right">
            <span class="nav-stat">${totalComponents} components</span>
            <button
              class="theme-btn"
              @click=${() => this.darkMode = !this.darkMode}
              title="${this.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}"
            >
              ${this.darkMode
                ? html`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
                : html`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
              }
            </button>
          </div>
        </nav>

        <!-- ── Body: Sidebar + Content ── -->
        <div class="body">

          <div class="sidebar-overlay ${this.sidebarOpen ? 'visible' : ''}" @click=${() => this.sidebarOpen = false}></div>
          <aside class="sidebar ${this.sidebarOpen ? 'open' : ''}">
              ${this.componentGroups.map(group => html`
              <div class="sidebar-group">
                <div class="sidebar-category">${group.category}</div>
                ${group.items.map(item => html`
                  <button
                    class="sidebar-item ${this.activeTab === item.id ? 'active' : ''}"
                    @click=${() => { this.activeTab = item.id; this.sidebarOpen = false }}
                  >
                    <span class="sidebar-dot"></span>
                    ${item.label}
                  </button>
                `)}
              </div>
            `)}
          </aside>

          <main class="content">
            ${comp ? html`
              <div class="content-header">
                <div class="breadcrumb">${comp.category} / ${comp.label}</div>
                <h1 class="content-title">${comp.label}</h1>
                <p class="content-desc">${comp.desc}</p>
              </div>
            ` : ''}
            <div class="demo-area">
              ${this.renderContent()}
            </div>
          </main>

        </div>
      </div>
    `
  }

  static styles = css`
    /* ── Theme tokens ── */
    :host {
      display: block;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

      --bg:           #f4f4f5;
      --surface:      #ffffff;
      --surface-2:    #f8f8f9;
      --text-1:       #09090b;
      --text-2:       #52525b;
      --text-3:       #a1a1aa;
      --border:       #e4e4e7;
      --accent:       #6366f1;
      --accent-bg:    #eef2ff;
      --accent-dim:   #c7d2fe;
      --nav-bg:       #ffffff;
      --sidebar-bg:   #fafafa;
      --navbar-bg:    #ffffff;
      --navbar-border: #e5e7eb;
      --navbar-accent: #6366f1;
      --navbar-link:  #64748b;
      --navbar-hover: #f1f5f9;
      --navbar-text: #1f2937;
      --navbar-search-bg: #f1f5f9;
      --navbar-search-border: transparent;
      --pagination-bg: #ffffff;
      --pagination-border: #e5e7eb;
      --pagination-text: #374151;
      --pagination-hover-bg: #f1f5f9;
      --pagination-accent: #6366f1;
      --pagination-muted: #64748b;
      --btn-primary-bg: #6366f1;
      --btn-primary-hover: #4f46e5;
      --btn-primary-text: #ffffff;
      --btn-secondary-bg: #e5e7eb;
      --btn-secondary-hover: #d1d5db;
      --btn-secondary-text: #1f2937;
      --btn-danger-bg: #ef4444;
      --btn-danger-hover: #dc2626;
      --btn-danger-text: #ffffff;
      --btn-ghost-text: #6366f1;
      --btn-ghost-hover: #eef2ff;
      --btn-tooltip-bg: #1f2937;
      --btn-tooltip-text: #ffffff;
      --btn-group-bg: #ffffff;
      --btn-group-text: #374151;
      --btn-group-border: #d1d5db;
      --btn-group-hover-bg: #f3f4f6;
      --card-bg: #f9fafb;
      --card-bg-accent: #ffffff;
      --card-border: #e5e7eb;
      --card-accent: #6366f1;
      --card-title: #111827;
      --card-body: #4b5563;
      --input-label: #374151;
      --input-border: #d1d5db;
      --input-bg: #ffffff;
      --input-text: #111827;
      --input-focus-border: #6366f1;
      --input-disabled-bg: #f3f4f6;
      --input-error: #ef4444;
      --input-filled-bg: #f3f4f6;
      --input-filled-focus-bg: #ffffff;
      --modal-bg: #ffffff;
      --modal-title: #1e293b;
      --modal-close: #64748b;
      --modal-close-hover: #f1f5f9;
      --modal-body: #475569;
      --tabs-border: #e2e8f0;
      --tabs-bar-bg: #f1f5f9;
      --tabs-text: #64748b;
      --tabs-hover-text: #334155;
      --tabs-hover-bg: rgba(255,255,255,0.6);
      --tabs-active-text: #6366f1;
      --tabs-active-border: #6366f1;
      --tabs-active-bg: #ffffff;
      --tabs-active-shadow: 0 1px 3px rgba(0,0,0,0.1);
      --toggle-off: #d1d5db;
      --toggle-on: #6366f1;
      --toggle-thumb: #ffffff;
      --toggle-label: #374151;
      --alert-info-bg: #eff6ff;
      --alert-info-border: #bfdbfe;
      --alert-info-text: #1e40af;
      --alert-success-bg: #f0fdf4;
      --alert-success-border: #bbf7d0;
      --alert-success-text: #166534;
      --alert-warning-bg: #fffbeb;
      --alert-warning-border: #fde68a;
      --alert-warning-text: #92400e;
      --alert-error-bg: #fef2f2;
      --alert-error-border: #fecaca;
      --alert-error-text: #991b1b;
      --badge-default-bg: #f3f4f6;
      --badge-default-text: #4b5563;
      --badge-primary-bg: #eef2ff;
      --badge-primary-text: #6366f1;
      --badge-success-bg: #f0fdf4;
      --badge-success-text: #16a34a;
      --badge-warning-bg: #fffbeb;
      --badge-warning-text: #d97706;
      --badge-danger-bg: #fef2f2;
      --badge-danger-text: #dc2626;
      --badge-tag-border: #e5e7eb;
      --dropdown-trigger-bg: #ffffff;
      --dropdown-trigger-border: #d1d5db;
      --dropdown-trigger-text: #374151;
      --dropdown-trigger-hover: #f5f3ff;
      --dropdown-arrow: #6b7280;
      --dropdown-menu-bg: #ffffff;
      --dropdown-menu-border: #e5e7eb;
      --dropdown-accent: #6366f1;
      --dropdown-item-text: #374151;
      --dropdown-item-hover: #f3f4f6;
      --accordion-border: #e5e7eb;
      --accordion-header-bg: #f9fafb;
      --accordion-header-hover: #f3f4f6;
      --accordion-header-text: #374151;
      --accordion-body-text: #4b5563;
      --cal-bg: #ffffff;
      --cal-border: #e5e7eb;
      --cal-nav-color: #64748b;
      --cal-nav-hover: #f1f5f9;
      --cal-weekday: #64748b;
      --cal-day-text: #374151;
      --cal-day-hover: #f1f5f9;
      --cal-today: #6366f1;
      --cal-selected-bg: #6366f1;
      --cal-selected-text: #ffffff;
      --cal-other-month: #d1d5db;
      --table-header-bg: #f8fafc;
      --table-header-text: #475569;
      --table-border: #e2e8f0;
      --table-text: #1e293b;
      --table-row-hover: #f8fafc;
      --table-page-info: #64748b;
      --table-btn-bg: #ffffff;
      --table-btn-hover: #f1f5f9;
      --table-accent: #6366f1;
      --table-btn-active-text: #ffffff;
      --checkbox-border: #d1d5db;
      --checkbox-checked-bg: #6366f1;
      --checkbox-checkmark: #ffffff;
      --checkbox-label: #374151;
      --slider-label: #374151;
      --slider-value: #6366f1;
      --slider-track: #e5e7eb;
      --slider-thumb: #6366f1;
      --slider-thumb-border: #ffffff;
      --upload-border: #d1d5db;
      --upload-bg: #fafafa;
      --upload-accent: #6366f1;
      --upload-active-bg: #eef2ff;
      --upload-border-has: #e5e7eb;
      --upload-bg-has: #ffffff;
      --upload-label-color: #374151;
      --upload-hint-color: #9ca3af;
      --upload-file-bg: #f9fafb;
      --upload-file-border: #e5e7eb;
      --upload-file-name: #1f2937;
      --upload-file-meta: #9ca3af;
      --upload-remove: #9ca3af;
      --upload-remove-hover: #ef4444;
      --upload-remove-bg: #fef2f2;
      --xfer-border: #e5e7eb;
      --xfer-header-bg: #f9fafb;
      --xfer-header-text: #374151;
      --xfer-meta: #9ca3af;
      --xfer-count-bg: #f3f4f6;
      --xfer-item-text: #1f2937;
      --xfer-item-hover: #f9fafb;
      --xfer-item-selected-bg: #eef2ff;
      --xfer-check-border: #d1d5db;
      --xfer-accent: #6366f1;
      --xfer-btn-border: #d1d5db;
      --xfer-btn-bg: #ffffff;
      --xfer-btn-text: #6b7280;
      --xfer-btn-hover: #eef2ff;
      --tl-line: #e5e7eb;
      --tl-icon-bg: #ffffff;
      --tl-accent: #6366f1;
      --tl-card-bg: #ffffff;
      --tl-card-border: #e5e7eb;
      --tl-title: #1f2937;
      --tl-title-done: #16a34a;
      --tl-desc: #6b7280;
      --tl-date: #64748b;
      --tl-time: #94a3b8;
      --notif-bg: #ffffff;
      --notif-border: #e5e7eb;
      --notif-shadow: 0 6px 24px rgba(0,0,0,0.12);
      --notif-accent-bg: #eef2ff;
      --notif-accent: #6366f1;
      --notif-title: #1f2937;
      --notif-message: #6b7280;
      --notif-close: #9ca3af;
      --notif-close-hover: #374151;
      --drawer-bg: #ffffff;
      --drawer-border: #e5e7eb;
      --drawer-title: #1e293b;
      --drawer-close: #64748b;
      --drawer-close-hover: #f1f5f9;
      --drawer-body: #475569;
      --sidebar-bg: #ffffff;
      --sidebar-shadow: 4px 0 24px rgba(0,0,0,0.15);
      --sidebar-title: #1e293b;
      --sidebar-close: #64748b;
      --sidebar-close-hover: #f1f5f9;
      --sidebar-divider: #e5e7eb;
      --sidebar-item-text: #475569;
      --sidebar-item-hover: #f1f5f9;
      --sidebar-item-hover-text: #1e293b;
      --sidebar-item-active-bg: #eef2ff;
      --sidebar-item-active-text: #6366f1;
      --sidebar-badge-bg: #e5e7eb;
      --sidebar-badge-text: #4b5563;
      --sidebar-badge-active-bg: #c7d2fe;
      --sidebar-badge-active-text: #4338ca;

      background: var(--bg);
      color: var(--text-1);
    }

    :host([dark]) {
      --bg:           #0a0a0a;
      --surface:      #141414;
      --surface-2:    #1c1c1c;
      --text-1:       #fafafa;
      --text-2:       #a1a1aa;
      --text-3:       #52525b;
      --border:       #27272a;
      --accent:       #818cf8;
      --accent-bg:    #1e1b4b;
      --accent-dim:   #3730a3;
      --nav-bg:       #0d0d0d;
      --sidebar-bg:   #0d0d0d;
      --navbar-bg:    #141414;
      --navbar-border: #27272a;
      --navbar-accent: #818cf8;
      --navbar-link:  #a1a1aa;
      --navbar-hover: #1c1c1c;
      --navbar-text: #e4e4e7;
      --navbar-search-bg: #27272a;
      --navbar-search-border: transparent;
      --pagination-bg: #1c1c1c;
      --pagination-border: #27272a;
      --pagination-text: #d4d4d8;
      --pagination-hover-bg: #27272a;
      --pagination-accent: #818cf8;
      --pagination-muted: #52525b;
      --btn-primary-bg: #818cf8;
      --btn-primary-hover: #6366f1;
      --btn-primary-text: #ffffff;
      --btn-secondary-bg: #27272a;
      --btn-secondary-hover: #3f3f46;
      --btn-secondary-text: #d4d4d8;
      --btn-danger-bg: #ef4444;
      --btn-danger-hover: #dc2626;
      --btn-danger-text: #ffffff;
      --btn-ghost-text: #818cf8;
      --btn-ghost-hover: #1e1b4b;
      --btn-tooltip-bg: #fafafa;
      --btn-tooltip-text: #1f2937;
      --btn-group-bg: #1c1c1c;
      --btn-group-text: #e4e4e7;
      --btn-group-border: #3f3f46;
      --btn-group-hover-bg: #27272a;
      --card-bg: #141414;
      --card-bg-accent: #1c1c1c;
      --card-border: #27272a;
      --card-accent: #818cf8;
      --card-title: #fafafa;
      --card-body: #a1a1aa;
      --input-label: #a1a1aa;
      --input-border: #3f3f46;
      --input-bg: #1c1c1c;
      --input-text: #e4e4e7;
      --input-focus-border: #818cf8;
      --input-disabled-bg: #18181b;
      --input-error: #f87171;
      --input-filled-bg: #18181b;
      --input-filled-focus-bg: #1c1c1c;
      --modal-bg: #141414;
      --modal-title: #fafafa;
      --modal-close: #a1a1aa;
      --modal-close-hover: #27272a;
      --modal-body: #a1a1aa;
      --tabs-border: #27272a;
      --tabs-bar-bg: #18181b;
      --tabs-text: #a1a1aa;
      --tabs-hover-text: #fafafa;
      --tabs-hover-bg: rgba(255,255,255,0.05);
      --tabs-active-text: #818cf8;
      --tabs-active-border: #818cf8;
      --tabs-active-bg: #1c1c1c;
      --tabs-active-shadow: 0 1px 3px rgba(0,0,0,0.3);
      --toggle-off: #3f3f46;
      --toggle-on: #818cf8;
      --toggle-thumb: #ffffff;
      --toggle-label: #a1a1aa;
      --alert-info-bg: #0f172a;
      --alert-info-border: #1e40af;
      --alert-info-text: #93c5fd;
      --alert-success-bg: #052e16;
      --alert-success-border: #166534;
      --alert-success-text: #86efac;
      --alert-warning-bg: #451a03;
      --alert-warning-border: #92400e;
      --alert-warning-text: #fcd34d;
      --alert-error-bg: #450a0a;
      --alert-error-border: #991b1b;
      --alert-error-text: #fca5a5;
      --badge-default-bg: #27272a;
      --badge-default-text: #a1a1aa;
      --badge-primary-bg: #1e1b4b;
      --badge-primary-text: #818cf8;
      --badge-success-bg: #052e16;
      --badge-success-text: #22c55e;
      --badge-warning-bg: #451a03;
      --badge-warning-text: #f59e0b;
      --badge-danger-bg: #450a0a;
      --badge-danger-text: #ef4444;
      --badge-tag-border: #3f3f46;
      --dropdown-trigger-bg: #1c1c1c;
      --dropdown-trigger-border: #3f3f46;
      --dropdown-trigger-text: #d4d4d8;
      --dropdown-trigger-hover: #18181b;
      --dropdown-arrow: #a1a1aa;
      --dropdown-menu-bg: #1c1c1c;
      --dropdown-menu-border: #27272a;
      --dropdown-accent: #818cf8;
      --dropdown-item-text: #d4d4d8;
      --dropdown-item-hover: #27272a;
      --accordion-border: #27272a;
      --accordion-header-bg: #141414;
      --accordion-header-hover: #1c1c1c;
      --accordion-header-text: #d4d4d8;
      --accordion-body-text: #a1a1aa;
      --cal-bg: #141414;
      --cal-border: #27272a;
      --cal-nav-color: #a1a1aa;
      --cal-nav-hover: #27272a;
      --cal-weekday: #a1a1aa;
      --cal-day-text: #d4d4d8;
      --cal-day-hover: #27272a;
      --cal-today: #818cf8;
      --cal-selected-bg: #818cf8;
      --cal-selected-text: #ffffff;
      --cal-other-month: #3f3f46;
      --table-header-bg: #141414;
      --table-header-text: #a1a1aa;
      --table-border: #27272a;
      --table-text: #d4d4d8;
      --table-row-hover: #141414;
      --table-page-info: #52525b;
      --table-btn-bg: #1c1c1c;
      --table-btn-hover: #27272a;
      --table-accent: #818cf8;
      --table-btn-active-text: #ffffff;
      --checkbox-border: #3f3f46;
      --checkbox-checked-bg: #818cf8;
      --checkbox-checkmark: #ffffff;
      --checkbox-label: #d4d4d8;
      --slider-label: #a1a1aa;
      --slider-value: #818cf8;
      --slider-track: #3f3f46;
      --slider-thumb: #818cf8;
      --slider-thumb-border: #1c1c1c;
      --upload-border: #3f3f46;
      --upload-bg: #141414;
      --upload-accent: #818cf8;
      --upload-active-bg: #1e1b4b;
      --upload-border-has: #27272a;
      --upload-bg-has: #1c1c1c;
      --upload-label-color: #d4d4d8;
      --upload-hint-color: #52525b;
      --upload-file-bg: #141414;
      --upload-file-border: #27272a;
      --upload-file-name: #e4e4e7;
      --upload-file-meta: #52525b;
      --upload-remove: #52525b;
      --upload-remove-hover: #f87171;
      --upload-remove-bg: #450a0a;
      --xfer-border: #27272a;
      --xfer-header-bg: #141414;
      --xfer-header-text: #d4d4d8;
      --xfer-meta: #52525b;
      --xfer-count-bg: #1c1c1c;
      --xfer-item-text: #e4e4e7;
      --xfer-item-hover: #141414;
      --xfer-item-selected-bg: #1e1b4b;
      --xfer-check-border: #3f3f46;
      --xfer-accent: #818cf8;
      --xfer-btn-border: #3f3f46;
      --xfer-btn-bg: #1c1c1c;
      --xfer-btn-text: #a1a1aa;
      --xfer-btn-hover: #1e1b4b;
      --tl-line: #27272a;
      --tl-icon-bg: #1c1c1c;
      --tl-accent: #818cf8;
      --tl-card-bg: #1c1c1c;
      --tl-card-border: #27272a;
      --tl-title: #e4e4e7;
      --tl-title-done: #4ade80;
      --tl-desc: #a1a1aa;
      --tl-date: #a1a1aa;
      --tl-time: #71717a;
      --notif-bg: #1c1c1c;
      --notif-border: #27272a;
      --notif-shadow: 0 6px 24px rgba(0,0,0,0.4);
      --notif-accent-bg: #1e1b4b;
      --notif-accent: #818cf8;
      --notif-title: #e4e4e7;
      --notif-message: #a1a1aa;
      --notif-close: #71717a;
      --notif-close-hover: #e4e4e7;
      --drawer-bg: #141414;
      --drawer-border: #27272a;
      --drawer-title: #fafafa;
      --drawer-close: #a1a1aa;
      --drawer-close-hover: #27272a;
      --drawer-body: #a1a1aa;
      --sidebar-bg: #141414;
      --sidebar-shadow: 4px 0 24px rgba(0,0,0,0.4);
      --sidebar-title: #fafafa;
      --sidebar-close: #a1a1aa;
      --sidebar-close-hover: #27272a;
      --sidebar-divider: #27272a;
      --sidebar-item-text: #a1a1aa;
      --sidebar-item-hover: #1c1c1c;
      --sidebar-item-hover-text: #fafafa;
      --sidebar-item-active-bg: #1e1b4b;
      --sidebar-item-active-text: #818cf8;
      --sidebar-badge-bg: #27272a;
      --sidebar-badge-text: #a1a1aa;
      --sidebar-badge-active-bg: #3730a3;
      --sidebar-badge-active-text: #c7d2fe;
    }

    /* ── Shell ── */
    .shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* ── Navbar ── */
    .navbar {
      position: sticky;
      top: 0;
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 52px;
      padding: 0 24px;
      background: var(--nav-bg);
      border-bottom: 1px solid var(--border);
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-logo {
      width: 20px;
      height: 25px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    .nav-brand {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--text-1);
    }

    .nav-tag {
      font-size: 11px;
      color: var(--text-3);
      padding: 2px 8px;
      border: 1px solid var(--border);
      border-radius: 4px;
      letter-spacing: 0.01em;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-stat {
      font-size: 12px;
      color: var(--text-3);
    }

    .theme-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      color: var(--text-2);
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }

    .theme-btn:hover {
      background: var(--accent-bg);
      color: var(--accent);
      border-color: var(--accent-dim);
    }

    /* ── Body layout ── */
    .body {
      display: flex;
      flex: 1;
    }

    /* ── Sidebar ── */
    .sidebar {
      width: 216px;
      flex-shrink: 0;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--border);
      padding: 16px 0 40px;
      height: calc(100vh - 52px);
      position: sticky;
      top: 52px;
      overflow-y: auto;
    }

    .sidebar-group {
      margin-bottom: 4px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }
    .sidebar-group:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .sidebar-category {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-3);
      padding: 12px 18px 4px;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 7px 18px;
      border: none;
      border-left: 2px solid transparent;
      background: transparent;
      color: var(--text-2);
      font-size: 13px;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      transition: background 0.1s, color 0.1s, border-color 0.1s;
    }

    .sidebar-item:hover {
      background: var(--surface);
      color: var(--text-1);
    }

    .sidebar-item.active {
      background: var(--accent-bg);
      color: var(--accent);
      border-left-color: var(--accent);
      font-weight: 600;
    }

    .sidebar-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.35;
      flex-shrink: 0;
      transition: opacity 0.1s;
    }

    .sidebar-item.active .sidebar-dot {
      opacity: 1;
    }

    /* ── Main content ── */
    .content {
      flex: 1;
      padding: 36px 44px 60px;
      min-width: 0;
      overflow-y: auto;
    }

    .content-header {
      margin-bottom: 28px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border);
    }

    .breadcrumb {
      font-size: 11.5px;
      color: var(--text-3);
      margin-bottom: 10px;
      letter-spacing: 0.01em;
    }

    .content-title {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--text-1);
      margin: 0 0 8px;
    }

    .content-desc {
      font-size: 14px;
      color: var(--text-2);
      margin: 0;
      line-height: 1.6;
    }

    /* ── Demo tiles ── */
    .demo-area {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .demo-tile {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: visible;
    }

    .demo-tile-header {
      padding: 10px 20px;
      border-bottom: 1px solid var(--border);
      background: var(--surface-2);
      border-radius: 8px 8px 0 0;
    }

    .demo-tile-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--text-3);
    }

    .demo-tile-body {
      padding: 24px 20px;
    }

    /* ── Demo layout helpers ── */
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .demo-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-width: 400px;
    }

    .editable-table-wrap {
      width: 100%;
      min-width: 0;
    }

    .demo-note {
      font-size: 13px;
      color: var(--text-3);
      margin: 0;
    }

    .tab-content {
      margin-top: 14px;
      padding: 20px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 10px;
      font-size: 14px;
      color: var(--text-2);
    }

    .tab-content p { margin: 0; }

    .tab-demo-flex {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .tab-stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .tab-stat-value {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-1);
      letter-spacing: -0.03em;
    }

    .tab-stat-label {
      font-size: 12px;
      color: var(--text-3);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .modal-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 20px;
    }

    /* ── Sign up modal ── */
    .signup-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .signup-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .signup-label {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-2);
      letter-spacing: 0.01em;
    }

    .signup-radio-group {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .signup-radio {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      font-size: 13px;
      color: var(--text-1);
    }

    .signup-radio input[type="radio"] {
      accent-color: var(--accent);
      margin: 0;
    }

    .signup-success {
      text-align: center;
      padding: 16px 0;
    }

    .signup-success-icon {
      color: #22c55e;
      margin-bottom: 8px;
    }

    .signup-success-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 8px;
      color: var(--text-1);
    }

    .signup-success p {
      font-size: 14px;
      color: var(--text-2);
      margin: 0 0 4px;
      line-height: 1.6;
    }

    /* ── Drawer content ── */
    .drawer-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .drawer-profile {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .drawer-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
      flex-shrink: 0;
    }

    .drawer-profile-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .drawer-profile-name {
      font-weight: 600;
      color: var(--text-1);
      font-size: 15px;
    }

    .drawer-section-title {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: var(--text-3);
    }

    .drawer-divider {
      height: 1px;
      background: var(--border);
      margin: 4px 0;
    }

    .drawer-footer {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding-top: 8px;
      margin-top: 8px;
    }

    /* ── Hamburger ── */
    .hamburger {
      display: none;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      color: var(--text-2);
      margin-right: -4px;
      flex-shrink: 0;
    }

    .hamburger:hover {
      background: var(--surface-2);
      color: var(--text-1);
    }

    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 150;
      background: rgba(0, 0, 0, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .hamburger { display: flex; }
      .nav-tag { display: none; }
      .nav-stat { display: none; }

      .body {
        min-height: 0;
      }

      .sidebar {
        position: fixed;
        top: 52px;
        left: 0;
        z-index: 160;
        height: calc(100vh - 52px);
        transform: translateX(-100%);
        transition: transform 0.25s ease;
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar-overlay.visible {
        display: block;
        opacity: 1;
        pointer-events: auto;
      }

      .content {
        padding: 24px 16px 80px;
        overflow-y: visible;
        -webkit-overflow-scrolling: touch;
      }

      .content-title {
        font-size: 22px;
      }

      .demo-tile-body {
        padding: 16px 14px;
      }

      .demo-grid {
        grid-template-columns: 1fr;
      }

      .demo-stack {
        max-width: 100%;
      }
    }

    @media (max-width: 600px) {
      .content {
        padding: 16px 12px 60px;
        overflow-y: visible;
      }

      .content-title {
        font-size: 20px;
      }

      .demo-tile-body {
        padding: 12px;
      }
    }

    /* ── Misc ── */
    .role-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      background: #eef2ff;
      color: #6366f1;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'showcase-app': ShowcaseApp
  }
}

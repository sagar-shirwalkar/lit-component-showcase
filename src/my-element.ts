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
  @state() private selectedDate?: number
  @state() private sliderValue = 50
  @state() private checkboxStates = new Map<string, boolean>()
  @state() private tablePage = 1
  @state() private paginationPage = 1
  @state() private tabsDemoActive = 'tab1'
  @state() private drawerEmailNotif = true
  @state() private drawerPushNotif = false
  @state() private drawerWeeklyDigest = false
  @state() private drawerAutoUpdate = true

  private componentGroups = [
    {
      category: 'Form Controls',
      items: [
        { id: 'button', label: 'Button', desc: 'Versatile button with variants, sizes, and states' },
        { id: 'input', label: 'Input', desc: 'Text input with labels, validation, and multiple styles' },
        { id: 'checkbox', label: 'Checkbox', desc: 'Checkbox with label and disabled state support' },
        { id: 'toggle', label: 'Toggle', desc: 'Binary on/off switch for boolean settings' },
        { id: 'slider', label: 'Slider', desc: 'Range input with configurable min, max, and step' },
      ],
    },
    {
      category: 'Display',
      items: [
        { id: 'card', label: 'Card', desc: 'Content container with default, bordered, and elevated variants' },
        { id: 'badge', label: 'Badge', desc: 'Compact label for statuses, tags, and counts' },
        { id: 'alert', label: 'Alert', desc: 'Contextual message with four severity levels' },
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
          <showcase-button variant="primary">Primary</showcase-button>
          <showcase-button variant="secondary">Secondary</showcase-button>
          <showcase-button variant="danger">Danger</showcase-button>
          <showcase-button variant="ghost">Ghost</showcase-button>
        </div>
      `)}
      ${this.tile('Sizes', html`
        <div class="demo-row">
          <showcase-button size="sm">Small</showcase-button>
          <showcase-button size="md">Medium</showcase-button>
          <showcase-button size="lg">Large</showcase-button>
        </div>
      `)}
      ${this.tile('States', html`
        <div class="demo-row">
          <showcase-button ?disabled=${true}>Disabled</showcase-button>
          <showcase-button ?loading=${true}>Loading</showcase-button>
        </div>
      `)}
    `
  }

  private renderCardDemo() {
    return html`
      ${this.tile('Variants', html`
        <div class="demo-grid">
          <showcase-card variant="default" title="Default Card">
            <p>Subtle border and background for general content.</p>
          </showcase-card>
          <showcase-card variant="bordered" title="Bordered Card">
            <p>Prominent border accent for emphasis.</p>
          </showcase-card>
          <showcase-card variant="elevated" title="Elevated Card" .hoverable=${true}>
            <p>Drop shadow with lift animation on hover.</p>
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
      ${this.tile('Interactive Demo', html`
        <showcase-button @click=${() => this.modalOpen = true}>Open Modal</showcase-button>
        <showcase-modal
          ?open=${this.modalOpen}
          title="Example Modal"
          @close=${() => this.modalOpen = false}
        >
          <p>This is the modal content. You can put any Lit components here.</p>
          <div class="modal-actions">
            <showcase-button variant="ghost" @click=${() => this.modalOpen = false}>Cancel</showcase-button>
            <showcase-button @click=${() => this.modalOpen = false}>Confirm</showcase-button>
          </div>
        </showcase-modal>
      `)}
    `
  }

  private renderTabsDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <showcase-tabs
          .activeTab=${this.tabsDemoActive}
          @tab-change=${(e: CustomEvent) => this.tabsDemoActive = e.detail.tab}
        >
          <showcase-tab tab="tab1" label="Overview"></showcase-tab>
          <showcase-tab tab="tab2" label="Details"></showcase-tab>
          <showcase-tab tab="tab3" label="Settings"></showcase-tab>
        </showcase-tabs>
        <div class="tab-content">
          ${this.tabsDemoActive === 'tab1' ? html`<p>Overview content goes here.</p>` : ''}
          ${this.tabsDemoActive === 'tab2' ? html`<p>Details content goes here.</p>` : ''}
          ${this.tabsDemoActive === 'tab3' ? html`<p>Settings content goes here.</p>` : ''}
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

  private renderAlertDemo() {
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
    `
  }

  private renderDropdownDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
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
    return html`
      ${this.tile('Date Picker', html`
        <div class="demo-stack">
          <showcase-calendar
            .value=${this.selectedDate}
            @change=${(e: CustomEvent) => this.selectedDate = e.detail.date.getDate()}
          ></showcase-calendar>
          <p class="demo-note">
            ${this.selectedDate
              ? `Selected: Day ${this.selectedDate} of the current month`
              : 'Click a date to select it'
            }
          </p>
        </div>
      `)}
    `
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
    `
  }

  private renderNavbarDemo() {
    return html`
      ${this.tile('Navigation Bar', html`
        <showcase-navbar
          brand="MyApp"
          .links=${[
            { label: 'Home', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Services', href: '#' },
            { label: 'Contact', href: '#' },
          ]}
        ></showcase-navbar>
      `)}
    `
  }

  private renderCheckboxDemo() {
    return html`
      ${this.tile('Interactive Demo', html`
        <div class="demo-stack">
          <showcase-checkbox
            label="Accept terms and conditions"
            .checked=${this.checkboxStates.get('terms') || false}
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
            label="Price Range"
            .value=${75}
            .min=${0}
            .max=${500}
            .step=${25}
          ></showcase-slider>
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

  private renderContent() {
    switch (this.activeTab) {
      case 'button': return this.renderButtonDemo()
      case 'card': return this.renderCardDemo()
      case 'input': return this.renderInputDemo()
      case 'modal': return this.renderModalDemo()
      case 'tabs': return this.renderTabsDemo()
      case 'toggle': return this.renderToggleDemo()
      case 'alert': return this.renderAlertDemo()
      case 'badge': return this.renderBadgeDemo()
      case 'dropdown': return this.renderDropdownDemo()
      case 'accordion': return this.renderAccordionDemo()
      case 'calendar': return this.renderCalendarDemo()
      case 'data-table': return this.renderDataTableDemo()
      case 'navbar': return this.renderNavbarDemo()
      case 'checkbox': return this.renderCheckboxDemo()
      case 'slider': return this.renderSliderDemo()
      case 'drawer': return this.renderDrawerDemo()
      case 'pagination': return this.renderPaginationDemo()
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
            <div class="nav-logo"></div>
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

          <aside class="sidebar">
            ${this.componentGroups.map(group => html`
              <div class="sidebar-group">
                <div class="sidebar-category">${group.category}</div>
                ${group.items.map(item => html`
                  <button
                    class="sidebar-item ${this.activeTab === item.id ? 'active' : ''}"
                    @click=${() => this.activeTab = item.id}
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
      width: 22px;
      height: 22px;
      background: var(--accent);
      border-radius: 4px;
      flex-shrink: 0;
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

    .demo-note {
      font-size: 13px;
      color: var(--text-3);
      margin: 0;
    }

    .tab-content {
      margin-top: 14px;
      padding: 16px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 14px;
      color: var(--text-2);
    }

    .tab-content p { margin: 0; }

    .modal-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 20px;
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
      color: #1e293b;
      font-size: 15px;
    }

    .drawer-section-title {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: #94a3b8;
    }

    .drawer-divider {
      height: 1px;
      background: #e5e7eb;
      margin: 4px 0;
    }

    .drawer-footer {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding-top: 8px;
      margin-top: 8px;
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

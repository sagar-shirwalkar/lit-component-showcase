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
  @state() private sidebarOpen = false
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
            <button class="hamburger" @click=${() => this.sidebarOpen = !this.sidebarOpen} title="Toggle menu" aria-label="Toggle navigation menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
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
      --tabs-text: #64748b;
      --tabs-hover-text: #1e293b;
      --tabs-hover-bg: #f8fafc;
      --tabs-active-text: #6366f1;
      --tabs-active-border: #6366f1;
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
      --drawer-bg: #ffffff;
      --drawer-border: #e5e7eb;
      --drawer-title: #1e293b;
      --drawer-close: #64748b;
      --drawer-close-hover: #f1f5f9;
      --drawer-body: #475569;

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
      --tabs-text: #a1a1aa;
      --tabs-hover-text: #fafafa;
      --tabs-hover-bg: #18181b;
      --tabs-active-text: #818cf8;
      --tabs-active-border: #818cf8;
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
      --drawer-bg: #141414;
      --drawer-border: #27272a;
      --drawer-title: #fafafa;
      --drawer-close: #a1a1aa;
      --drawer-close-hover: #27272a;
      --drawer-body: #a1a1aa;
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
        padding: 24px 16px 40px;
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
        padding: 16px 12px 36px;
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

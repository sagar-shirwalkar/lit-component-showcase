import { LitElement, html, css } from 'lit'
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

  private tabs = [
    { id: 'button', label: 'Button' },
    { id: 'card', label: 'Card' },
    { id: 'input', label: 'Input' },
    { id: 'modal', label: 'Modal' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'toggle', label: 'Toggle' },
    { id: 'alert', label: 'Alert' },
    { id: 'badge', label: 'Badge' },
    { id: 'dropdown', label: 'Dropdown' },
    { id: 'accordion', label: 'Accordion' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'data-table', label: 'Data Table' },
    { id: 'navbar', label: 'Navbar' },
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'slider', label: 'Slider' },
    { id: 'drawer', label: 'Drawer' },
    { id: 'pagination', label: 'Pagination' },
  ]

  private toggleAccordion(id: string) {
    const newSet = new Set(this.accordionOpen)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    this.accordionOpen = newSet
  }

  private toggleCheckbox(id: string) {
    const newMap = new Map(this.checkboxStates)
    newMap.set(id, !newMap.get(id))
    this.checkboxStates = newMap
  }

  private renderButtonDemo() {
    return html`
      <div class="demo-section">
        <h2>Button Variants</h2>
        <div class="demo-row">
          <showcase-button variant="primary">Primary</showcase-button>
          <showcase-button variant="secondary">Secondary</showcase-button>
          <showcase-button variant="danger">Danger</showcase-button>
          <showcase-button variant="ghost">Ghost</showcase-button>
        </div>
        
        <h2>Button Sizes</h2>
        <div class="demo-row">
          <showcase-button size="sm">Small</showcase-button>
          <showcase-button size="md">Medium</showcase-button>
          <showcase-button size="lg">Large</showcase-button>
        </div>
        
        <h2>States</h2>
        <div class="demo-row">
          <showcase-button ?disabled=${true}>Disabled</showcase-button>
          <showcase-button ?loading=${true}>Loading</showcase-button>
        </div>
      </div>
    `
  }

  private renderCardDemo() {
    return html`
      <div class="demo-section">
        <h2>Card Variants</h2>
        <div class="demo-grid">
          <showcase-card variant="default" title="Default Card">
            <p>This is a default card with a subtle border and background.</p>
          </showcase-card>
          <showcase-card variant="bordered" title="Bordered Card">
            <p>This card has a prominent border accent.</p>
          </showcase-card>
          <showcase-card variant="elevated" title="Elevated Card" .hoverable=${true}>
            <p>This card has a shadow effect and hover animation.</p>
          </showcase-card>
        </div>
      </div>
    `
  }

  private renderInputDemo() {
    return html`
      <div class="demo-section">
        <h2>Input Variants</h2>
        <div class="demo-stack">
          <showcase-input 
            label="Default Input" 
            placeholder="Enter text..."
            .value=${this.inputValue}
            @input-change=${(e: CustomEvent) => this.inputValue = e.detail.value}
          ></showcase-input>
          <showcase-input 
            label="Filled Input" 
            variant="filled"
            placeholder="Filled style"
          ></showcase-input>
          <showcase-input 
            label="Outlined Input" 
            variant="outlined"
            placeholder="Outlined style"
          ></showcase-input>
          <showcase-input 
            label="Error State" 
            .error=${true}
            errorMessage="This field is required"
            placeholder="Invalid input"
          ></showcase-input>
          <showcase-input 
            label="Disabled Input" 
            .disabled=${true}
            value="Cannot edit"
          ></showcase-input>
        </div>
      </div>
    `
  }

  private renderModalDemo() {
    return html`
      <div class="demo-section">
        <h2>Modal Dialog</h2>
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
      </div>
    `
  }

  private renderTabsDemo() {
    return html`
      <div class="demo-section">
        <h2>Tabs Component</h2>
        <showcase-tabs .activeTab=${this.activeTab} @tab-change=${(e: CustomEvent) => this.activeTab = e.detail.tab}>
          <showcase-tab tab="tab1" label="Overview"></showcase-tab>
          <showcase-tab tab="tab2" label="Details"></showcase-tab>
          <showcase-tab tab="tab3" label="Settings"></showcase-tab>
        </showcase-tabs>
        <div class="tab-content">
          ${this.activeTab === 'tab1' ? html`<p>Overview content goes here.</p>` : ''}
          ${this.activeTab === 'tab2' ? html`<p>Details content goes here.</p>` : ''}
          ${this.activeTab === 'tab3' ? html`<p>Settings content goes here.</p>` : ''}
        </div>
      </div>
    `
  }

  private renderToggleDemo() {
    return html`
      <div class="demo-section">
        <h2>Toggle Switch</h2>
        <div class="demo-stack">
          <showcase-toggle 
            label="Enable notifications" 
            .checked=${this.toggleState}
            @toggle=${(e: CustomEvent) => this.toggleState = e.detail.checked}
          ></showcase-toggle>
          <showcase-toggle 
            label="Dark mode" 
            .checked=${true}
            disabled
          ></showcase-toggle>
        </div>
      </div>
    `
  }

  private renderAlertDemo() {
    return html`
      <div class="demo-section">
        <h2>Alert Messages</h2>
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
      </div>
    `
  }

  private renderBadgeDemo() {
    return html`
      <div class="demo-section">
        <h2>Badges</h2>
        <div class="demo-row">
          <showcase-badge>Default</showcase-badge>
          <showcase-badge color="primary">Primary</showcase-badge>
          <showcase-badge color="success">Success</showcase-badge>
          <showcase-badge color="warning">Warning</showcase-badge>
          <showcase-badge color="danger">Danger</showcase-badge>
        </div>
      </div>
    `
  }

  private renderDropdownDemo() {
    return html`
      <div class="demo-section">
        <h2>Dropdown Menu</h2>
        <showcase-dropdown 
          label="Options"
          .open=${this.dropdownOpen}
          @toggle=${(e: CustomEvent) => this.dropdownOpen = e.detail.open}
        >
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false; console.log('Edit') }}>Edit</showcase-dropdown-item>
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false; console.log('Duplicate') }}>Duplicate</showcase-dropdown-item>
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false; console.log('Archive') }}>Archive</showcase-dropdown-item>
          <showcase-dropdown-item @click=${() => { this.dropdownOpen = false; console.log('Delete') }}>Delete</showcase-dropdown-item>
        </showcase-dropdown>
      </div>
    `
  }

  private renderAccordionDemo() {
    return html`
      <div class="demo-section">
        <h2>Accordion</h2>
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
      </div>
    `
  }

  private renderCalendarDemo() {
    return html`
      <div class="demo-section">
        <h2>Date Picker Calendar</h2>
        <div class="demo-stack">
          <showcase-calendar 
            .value=${this.selectedDate}
            @change=${(e: CustomEvent) => this.selectedDate = e.detail.date.getDate()}
          ></showcase-calendar>
          ${this.selectedDate ? html`<p>Selected: Day ${this.selectedDate} of the current month</p>` : html`<p>Click a date to select it</p>`}
        </div>
      </div>
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
      <div class="demo-section">
        <h2>Data Table</h2>
        <showcase-data-table 
          .columns=${columns}
          .data=${data}
          .pageSize=${5}
          .currentPage=${this.tablePage}
          @page-change=${(e: CustomEvent) => this.tablePage = e.detail.page}
        ></showcase-data-table>
      </div>
    `
  }

  private renderNavbarDemo() {
    return html`
      <div class="demo-section">
        <h2>Navigation Bar</h2>
        <showcase-navbar 
          brand="MyApp"
          .links=${[
            { label: 'Home', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Services', href: '#' },
            { label: 'Contact', href: '#' },
          ]}
        ></showcase-navbar>
      </div>
    `
  }

  private renderCheckboxDemo() {
    return html`
      <div class="demo-section">
        <h2>Checkboxes</h2>
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
          <showcase-checkbox 
            label="Disabled option"
            .checked=${true}
            disabled
          ></showcase-checkbox>
        </div>
      </div>
    `
  }

  private renderSliderDemo() {
    return html`
      <div class="demo-section">
        <h2>Range Slider</h2>
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
      </div>
    `
  }

  private renderDrawerDemo() {
    return html`
      <div class="demo-section">
        <h2>Right Drawer</h2>
        <showcase-button @click=${() => this.drawerOpen = true}>Open Drawer</showcase-button>
        
        <showcase-drawer 
          ?open=${this.drawerOpen}
          title="Settings"
          @close=${() => this.drawerOpen = false}
        >
          <div class="drawer-content">
            <p>This is the drawer content. It slides in from the right side.</p>
            <br>
            <showcase-checkbox label="Enable notifications"></showcase-checkbox>
            <br>
            <showcase-checkbox label="Dark mode"></showcase-checkbox>
            <br>
            <showcase-checkbox label="Auto-update"></showcase-checkbox>
          </div>
        </showcase-drawer>
      </div>
    `
  }

  private renderPaginationDemo() {
    return html`
      <div class="demo-section">
        <h2>Pagination</h2>
        <div class="demo-stack">
          <showcase-pagination 
            .totalItems=${100}
            .pageSize=${10}
            .currentPage=${this.paginationPage}
            @page-change=${(e: CustomEvent) => this.paginationPage = e.detail.page}
          ></showcase-pagination>
          <p>Current page: ${this.paginationPage}</p>
        </div>
      </div>
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
    return html`
      <div class="app">
        <header class="header">
          <h1>Lit Component Showcase</h1>
          <p>A collection of interactive UI components built with Lit & TypeScript</p>
        </header>
        
        <nav class="nav">
          ${this.tabs.map(tab => html`
            <button 
              class="nav-btn ${this.activeTab === tab.id ? 'active' : ''}"
              @click=${() => this.activeTab = tab.id}
            >
              ${tab.label}
            </button>
          `)}
        </nav>
        
        <main class="main">
          ${this.renderContent()}
        </main>
        
        <footer class="footer">
          <p>Built with Lit, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f8fafc;
    }
    .app {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 {
      font-size: 36px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 12px;
    }
    .header p {
      font-size: 18px;
      color: #64748b;
      margin: 0;
    }
    .nav {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: center;
      margin-bottom: 40px;
      padding: 8px;
      background: #f1f5f9;
      border-radius: 12px;
    }
    .nav-btn {
      padding: 10px 20px;
      border: none;
      background: transparent;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-btn:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
    .nav-btn.active {
      background: white;
      color: #6366f1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .main {
      background: white;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .demo-section {
      margin-bottom: 40px;
    }
    .demo-section:last-child {
      margin-bottom: 0;
    }
    .demo-section h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
    }
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-bottom: 24px;
    }
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .demo-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
    }
    .tab-content {
      margin-top: 20px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
    }
    .modal-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
      color: #64748b;
    }
    .drawer-content {
      color: #475569;
    }
    .role-badge {
      display: inline-block;
      padding: 4px 12px;
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
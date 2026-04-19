# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is **SIMRS (Sistem Informasi Rumah Sakit)** - a comprehensive Hospital Information System built with Vue.js 2.7. The application is designed for Indonesian healthcare facilities and includes patient management, clinical services, billing, and regulatory compliance features.

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot reload
- `npm run start` - Alias for `npm run dev`
- `npm run host` - Start development server (alternative command)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks

### Deployment
- `npm run deploy` - Build and deploy to Google Cloud Platform

## Application Architecture

### Core Technology Stack
- **Frontend**: Vue.js 2.7 with Webpack 3.x
- **UI Framework**: Bootstrap Vue 2.21.2
- **State Management**: Vuex 3.6.2
- **Routing**: Vue Router 3.0.1
- **HTTP Client**: Axios 0.21.1
- **Validation**: VeeValidate 3.4.9
- **Charts**: ApexCharts, Highcharts, Chart.js
- **Date Handling**: Moment.js 2.29.1 with Indonesian locale

### Module Structure

The application uses a **dynamic modular architecture** with auto-discovery:

1. **Dynamic Module Registration**: Modules are automatically discovered via webpack's `require.context()` in `src/modules/_registration.js`
2. **Module Configuration**: Each module has an `_index.js` file defining routes and configuration
3. **Shared Components**: Common components in `src/modules/_shared/`

### Main Application Modules

#### Core System
- **Dashboard** - Analytics and system overview
- **Registrasi** - Central hub for patient workflows (contains most clinical services)
- **Master Data** - Diagnosis, polyclinics, specialists management
- **Patients** - Medical records and patient history
- **Queue Management** - Patient queuing systems with audio announcements
- **Billing** - Financial management and payment processing

#### Clinical Services (Integrated within Registration Module)
- **Laboratory** (`/lab/`) - Test ordering and results management
- **Radiology** (`/radiologi/`) - Imaging services and results
- **Emergency** (`/layanan_igd/`) - Emergency department workflows
- **Outpatient** (`/layanan_rjalan/`) - Clinic visit management
- **Inpatient** (`/layanan_ranap/`) - Hospital admission management

#### Support Systems
- **Pharmacy** - Medication management and dispensing
- **CSSD** - Central Sterile Supply Department
- **Asset Management** - Hospital equipment tracking
- **Bed Management** - Hospital bed allocation and status
- **Warehouse** - Inventory and supply chain management
- **BPJS Integration** - Indonesian health insurance system compliance

## API and Service Layer

### Service Configuration
- **Base Configuration**: `src/config.js` - Server endpoints and application settings
- **Environment Mode**: `src/mode.js` - Sets environment (development/staging/production)
- **HTTP Service**: `src/utils/service.js` - Axios-based API client with authentication

### API Patterns
The service layer provides these main methods:
- `get()` - Standard GET requests
- `post()` - Standard POST requests
- `list()` - Paginated data retrieval
- `create()` - Resource creation
- `update()` - Resource updates
- `delete()` - Resource deletion
- `single()` - Single resource by ID
- `uploadFile()` - File upload with progress tracking

### Authentication
- **Token-based**: Uses localStorage for token storage
- **Auto-refresh**: Token validation on API calls
- **Redirect handling**: Automatic logout on 401/201 responses

## Component Architecture

### Global Components
Located in `src/base/` and globally registered in `src/main.js`:
- `main-form-custom.vue` - Standardized form wrapper
- `main-table.vue` - Data table with pagination
- `main-card.vue` - Card layout component
- `lookup-input.vue` - Data lookup with search
- `table-input.vue` - Inline table editing

### Vue Plugins in Use
- **Bootstrap Vue** - UI components and layouts
- **Vue I18n** - Internationalization (Indonesian default)
- **Vue SweetAlert2** - Alert dialogs
- **Vue Multiselect** - Dropdown selections
- **Vue2 Date Picker** - Date/time selection
- **Vuelidate** - Form validation
- **Perfect Scrollbar** - Custom scrollbars
- **ApexCharts/Highcharts** - Data visualization

### Custom Directives
- `v-img-fb` - Image fallback handling
- `v-number-input` - Numeric input formatting

## Development Patterns

### Module Creation Pattern
When creating new modules:

1. Create module directory: `src/modules/[module-name]/`
2. Add `_index.js` with module configuration:
```javascript
const module = {
  config: {
    name: 'module-name',
    icon: 'ri-icon-class',
    desc: 'Module description',
    layout: true
  },
  routes: [
    {
      name: 'route-name',
      label: 'Display Label',
      path: '/module/path',
      component: () => import('./component.vue')
    }
  ]
}
export default module
```
3. Components will be auto-registered with the router

### Form Development Patterns
- Use `main-form-custom.vue` for standardized form layouts
- Implement Vuelidate for form validation
- Use `v-model` for data binding
- Implement loading states with `this.$_api.progress()`

### Data Table Patterns
- Use `main-table.vue` for standardized tables
- Implement pagination via API `list()` method
- Include action buttons for CRUD operations
- Use `multiselect` for filter dropdowns

## File Organization

### Key Directories
- `src/modules/` - Feature modules (auto-registered)
- `src/components/` - Global UI components
- `src/base/` - Base reusable components
- `src/utils/` - Utility functions and services
- `static/assets/` - Static assets (CSS, images, sounds)
- `src/pages/` - Default/error pages

### Audio System
The application includes an extensive audio system for queue announcements in `src/assets/sound/sound/`:
- Indonesian number pronunciation files
- Department-specific announcement files
- Queue calling system integration

## Configuration

### Environment Setup
- Development server: `http://serova.id:8020/`
- Local development: Change URLs in `src/config.js`
- Mode setting: Update `src/mode.js`

### Hospital Configuration
- Hospital name and details in `src/config.js`
- Logo assets in `static/img/logo/`
- Custom CSS variables in `static/assets/sass/components/_variables.demo.scss`

## Testing and Quality

### Code Quality
- ESLint configuration for Vue.js standards
- Run `npm run lint` before commits
- Follow Vue.js style guide for component naming

### Common Issues to Check
- Token validation in API calls
- Proper loading state management
- Error handling for API failures
- Indonesian locale formatting for dates and numbers
- BPJS integration compliance when working with patient data
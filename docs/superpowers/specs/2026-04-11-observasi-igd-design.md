# Observasi IGD Module - Design Specification

**Date:** 2026-04-11
**Module:** Layanan IGD - Observasi
**Status:** Approved for Implementation
**Approach:** Replicate Visum Pattern

---

## 1. Overview

### 1.1 Purpose
Create a new Emergency Department Observation module for monitoring patients during short-term observation periods (typically 6-24 hours) before admission/discharge decisions.

### 1.2 Scope
- Patient observation session management (one-to-many relationship with registrations)
- Vital signs monitoring with timestamped records
- Therapy documentation during observation (infus, medications, procedures)
- Doctor's comprehensive assessment notes
- Final disposition decisions (pulang, rawat inap, rujuk)

### 1.3 Clinical Context
Emergency Department Observation for patients who need extended evaluation but don't require immediate admission. Doctors can monitor vital signs, document therapies provided, and make informed disposition decisions.

---

## 2. Architecture

### 2.1 Component Structure
```
src/modules/registrasi/layanan_igd/
├── observasi.vue                    # Main page component
└── _components/
    └── card_registrasi_igd.vue      # Reused patient selector

src/modules/_shared/
└── observasi_form.vue               # Shared observation form component
```

### 2.2 Route Configuration
- **Path:** `/layanan_igd/observasi`
- **Component:** `observasi.vue`
- **Add to:** `src/modules/registrasi/_index.js`

### 2.3 State Management Approach
**Component-level state** (similar to Visum module):
- `observationList`: Array of observation sessions
- `selectedObservation`: Currently selected session
- `isFormMode`: Boolean flag (true = show form, false = show list)
- `currentTab`: 'monitoring' | 'catatan_dokter'
- `loading`: API call tracking

### 2.4 Data Flow
1. User selects patient from CardRegistrasiIgd (left panel)
2. Patient selection triggers loading of observation sessions
3. Right panel shows observation list (one-to-many relationship)
4. User clicks "Tambah Observasi" or "Update" to enter form mode
5. State management hides observation list, shows detailed form
6. Form has 2 tabs: Monitoring & Catatan Dokter
7. Save returns to observation list view

---

## 3. User Interface Design

### 3.1 Main Layout (List View)
```
┌─────────────────────────────────────────────────────────────────┐
│                      LAYANAN IGD - OBSERVASI                    │
├──────────────────────┬──────────────────────────────────────────┤
│                      │                                           │
│  CARD REGISTRASI     │           PATIENT INFO CARD              │
│   - Patient List     │   ┌─────────────────────────────────┐   │
│   - Search & Filter  │   │ Patient Name / Age / Gender     │   │
│                      │   │ RM Number / Date / Doctor       │   │
│  [Patient 1]         │   │ KNJ: 001                        │   │
│  [Patient 2]         │   └─────────────────────────────────┘   │
│  [Patient 3]         │                                           │
│     ...              │   ┌─────────────────────────────────┐   │
│                      │   │     DAFTAR OBSERVASI (3)         │   │
│                      │   │  [+ Tambah Observasi]            │   │
│                      │   └─────────────────────────────────┘   │
│                      │                                           │
│                      │   ┌─────────────────────────────────┐   │
│                      │   │ Observasi Table                  │   │
│                      │   │ # | Mulai   | Selesai  | Status │   │
│                      │   │ 1 | 08:00   | -        | Aktif  │   │
│                      │   │ 2 | 10/05   | 11:30    | Selesai│   │
│                      │   └─────────────────────────────────┘   │
│                      │                                           │
└──────────────────────┴──────────────────────────────────────────┘
```

### 3.2 Form Layout (Hidden Patient Info, Shows Form)
```
┌─────────────────────────────────────────────────────────────────┐
│                      LAYANAN IGD - OBSERVASI                    │
├──────────────────────┬──────────────────────────────────────────┤
│                      │                                           │
│  CARD REGISTRASI     │           FORM OBSERVASI                 │
│   - Patient List     │   ┌─────────────────────────────────┐   │
│   - Search & Filter  │   │ [Monitoring] [Catatan Dokter]    │   │
│                      │   ├─────────────────────────────────┤   │
│  [Patient 1]         │   │          MONITORING TAB           │   │
│  [Patient 2]         │   ├─────────────────────────────────┤   │
│  [Patient 3]         │   │                                  │   │
│     ...              │   │ OBSERVASI VITAL (Left)           │   │
│                      │   │ ┌─────────────────────────────┐ │   │
│                      │   │ │ [+ Tambah Vital]            │ │   │
│                      │   │ │ Table: TD|Nadi|RR|Suhu|Kesadaran│ │   │
│                      │   │ │ 08:00|120/80|80|20|36.5|CM   │ │   │
│                      │   │ │ 09:00|118/78|78|18|36.8|CM   │ │   │
│                      │   │ └─────────────────────────────┘ │   │
│                      │   │                                  │   │
│                      │   │ TERAPI SELAMA OBSERVASI (Right)  │   │
│                      │   │ ┌─────────────────────────────┐ │   │
│                      │   │ │ Infus: [RL, NaCl] [+ Edit]  │ │   │
│                      │   │ │ Obat:  [uuid1, uuid2] [+Edit]│ │   │
│                      │   │ │ Tindakan: [uuid1] [+ Edit]   │ │   │
│                      │   │ └─────────────────────────────┘ │   │
│                      │   │                                  │   │
│                      │   │ KEPUTUSAN AKHIR                 │   │
│                      │   │ ○ Pulang (pengobatan selesai)   │   │
│                      │   │ ○ Rawat Inap                    │   │
│                      │   │ ○ Rujuk Internal                │   │
│                      │   │ ○ Rujuk Eksternal               │   │
│                      │   │                                  │   │
│                      │   │         [Batal] [Simpan]         │   │
│                      │   └─────────────────────────────────┘   │
│                      │                                           │
└──────────────────────┴──────────────────────────────────────────┘
```

### 3.3 State Flow
- **Initial State**: `isFormMode = false` → Show observation list
- **Click "Tambah/Update"**: `isFormMode = true` → Hide list, show form
- **Click "Batal"**: `isFormMode = false` → Return to list
- **Click "Simpan"**: Save data, `isFormMode = false` → Return to list

---

## 4. Database Schema (Backend Already Implemented)

### 4.1 Main Table: `observasi`
```sql
CREATE TABLE observasi (
  id VARCHAR PRIMARY KEY,
  registrasi_id VARCHAR NOT NULL,
  durasi INTEGER NOT NULL,
  jam_start TIMESTAMP NOT NULL,
  jam_end TIMESTAMP NULL,
  interval_vital_sign INTEGER NULL,
  catatan_dokter TEXT,
  infus TEXT,
  obat TEXT,
  tindakan TEXT,
  keputusan_akhir TEXT,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP,
  "deletedAt" TIMESTAMP
);
```

### 4.2 Related Table: `observasi_vital`
```sql
CREATE TABLE observasi_vital (
  id VARCHAR PRIMARY KEY,
  observasi_id VARCHAR NOT NULL,
  jam TIMESTAMP NOT NULL,
  td VARCHAR,
  nadi VARCHAR,
  rr VARCHAR,
  suhu VARCHAR,
  kesadaran VARCHAR,
  catatan TEXT,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP,
  "deletedAt" TIMESTAMP
);
```

---

## 5. API Integration

### 5.1 Observation Endpoints
- `POST /observasi/register` - Create new observation
- `POST /observasi/update` - Update observation
- `POST /observasi/list` - List observations by registrasi_id
- `POST /observasi/detailsById` - Get observation details
- `POST /observasi/delete` - Delete observation (soft delete)

### 5.2 Vital Signs Endpoints
- `POST /observasiVital/register` - Add vital sign record
- `POST /observasiVital/update` - Update vital sign
- `POST /observasiVital/list` - List vital signs by observasi_id
- `POST /observasiVital/detailsById` - Get vital sign details
- `POST /observasiVital/delete` - Delete vital sign (soft delete)

### 5.3 Data Format Specifications
- **obat** and **tindakan**: Comma-separated UUID strings - `"uuid1,uuid2,uuid3"`
- **infus**: Comma-separated text strings - `"RL,NaCl,Dextrose"`
- **All datetime fields**: ISO 8601 format - `YYYY-MM-DDTHH:mm:ss.sssZ`
- **Sorting**: Observations by `createdAt` DESC, Vital signs by `jam` ASC

---

## 6. Form Specifications

### 6.1 Tab 1: Monitoring Form Fields

#### Observation Header Fields
- `durasi` (number, required) - Duration in hours (1-72)
- `jam_start` (datetime, required) - Observation start time
- `jam_end` (datetime, optional) - Observation end time
- `interval_vital_sign` (number, optional) - Vital sign monitoring interval

#### Vital Signs Table (Left Side - CRUD Operations)
- `jam` (datetime, required) - Time of vital sign recording
- `td` (string, optional) - Blood pressure format: "120/80"
- `nadi` (string, optional) - Pulse format: "80 bpm"
- `rr` (string, optional) - Respiration rate format: "20 x/menit"
- `suhu` (string, optional) - Temperature format: "36.5°C"
- `kesadaran` (string, optional) - Consciousness level options: "Compos Mentis", "Somnolen", "Sopor", "Koma"
- `catatan` (text, optional) - Additional notes

#### Therapy Section (Right Side - Simple Text Entry)
- `infus` (text repeater) - Comma-separated: "RL, NaCl, Dextrose"
- `obat` (text repeater) - Comma-separated UUIDs: "uuid1,uuid2,uuid3"
- `tindakan` (text repeater) - Comma-separated UUIDs: "uuid1,uuid2"

#### Final Decision Section (Bottom of Tab 1)
- `keputusan_akhir` (radio buttons, required) - Options:
  - `Pulang (pengobatan selesai)`
  - `Rawat Inap`
  - `Rujuk Internal`
  - `Rujuk Eksternal`

### 6.2 Tab 2: Catatan Dokter Form Fields
- `catatan_dokter` (textarea, optional) - Single comprehensive doctor's assessment note

### 6.3 Form Validation Rules
- `durasi`: Required, min 1 hour, max 72 hours
- `jam_start`: Required, must be after registration time
- `jam_end`: Optional, must be after jam_start if provided
- All vital signs: Optional individually, but at least one field required if adding record
- `jam` in vital signs: Required, must be within observation period
- `keputusan_akhir`: Required when completing observation

---

## 7. Implementation Phases

### 7.1 Phase 1: Core Structure (Priority: High)
- [ ] Create `observasi.vue` main page component
- [ ] Add route to `_index.js`
- [ ] Implement patient selection and observation list view
- [ ] Basic CRUD for observations (create, read, update, delete)

### 7.2 Phase 2: Monitoring Tab (Priority: High)
- [ ] Implement vital signs table with CRUD operations
- [ ] Add therapy section (infus, obat, tindakan) with text repeaters
- [ ] Implement final decision radio buttons
- [ ] Form validation and error handling

### 7.3 Phase 3: Catatan Dokter Tab (Priority: Medium)
- [ ] Implement doctor's notes textarea
- [ ] Integrate with observation save/update operations

### 7.4 Phase 4: Polish & UX (Priority: Medium)
- [ ] Loading states and spinners
- [ ] Empty state designs
- [ ] Confirmation dialogs for delete operations
- [ ] Success/error messaging
- [ ] Responsive design considerations

---

## 8. Testing Checklist

### 8.1 Functional Testing
- [ ] Patient selection loads correct observation list
- [ ] Can create new observation session
- [ ] Can update existing observation session
- [ ] Vital signs CRUD works correctly
- [ ] Therapy repeaters save comma-separated values correctly
- [ ] Catatan dokter saves properly
- [ ] Final decision radio buttons work
- [ ] Delete operations require confirmation

### 8.2 Integration Testing
- [ ] API endpoints respond correctly
- [ ] API errors show user-friendly messages
- [ ] Form validation prevents invalid submissions
- [ ] Data persistence across page refreshes

### 8.3 State Management Testing
- [ ] State correctly switches between list/form views
- [ ] Patient list remains visible during form editing
- [ ] Form data clears correctly on cancel
- [ ] Multiple observation sessions display correctly

### 8.4 UX Testing
- [ ] Loading states display during API calls
- [ ] Success messages appear after save operations
- [ ] Empty states show appropriate messages
- [ ] Confirmation dialogs prevent accidental deletions

---

## 9. Component Props & Events

### 9.1 observasi.vue → ObservasiForm
```javascript
props: {
  dataRegistrasi: Object,
  registrasiId: String
}
```

### 9.2 ObservasiForm Internal State
```javascript
data() {
  return {
    isFormMode: false,
    activeTab: 'monitoring',
    observationList: [],
    selectedObservation: null,
    vitalSignsList: [],
    formData: {
      id: null,
      registrasi_id: '',
      durasi: 24,
      jam_start: '',
      jam_end: null,
      interval_vital_sign: 1,
      catatan_dokter: '',
      infus: '',
      obat: '',
      tindakan: '',
      keputusan_akhir: ''
    }
  }
}
```

---

## 10. Error Handling Strategy

### 10.1 API Error Handling
- **Network Failures**: Show "Gagal terhubung ke server" with retry option
- **Validation Errors**: Display field-level validation errors
- **Data Conflicts**: Handle concurrent editing scenarios gracefully
- **404 Errors**: Show "Data tidak ditemukan" message
- **500 Errors**: Show "Terjadi kesalahan pada server" message

### 10.2 User Feedback
- **Loading States**: Disable buttons during API calls, show spinners
- **Success Messages**: "Observasi berhasil disimpan", "Data vital berhasil ditambahkan"
- **Error Messages**: User-friendly Indonesian error messages
- **Confirmation Dialogs**: "Apakah Anda yakin ingin menghapus data ini?"

---

## 11. Design Decisions & Rationale

### 11.1 Replicate Visum Pattern
**Decision:** Use same component structure as Visum module
**Rationale:** Consistency with existing codebase, familiar UX for doctors, easier maintenance

### 11.2 Component-Level State Management
**Decision:** Use reactive component data instead of Vuex
**Rationale:** Self-contained workflow, no cross-component sharing needed, simpler implementation

### 11.3 Simple Text Entry for Therapy
**Decision:** Text repeaters instead of integrated pharmacy/system
**Rationale:** Focused on documentation, reduces complexity, faster development

### 11.4 One-to-Many Relationship with Timestamps
**Decision:** Each registration can have multiple observation sessions
**Rationale:** Complete patient history, accurate timestamp tracking, clinical decision support

---

## 12. Future Enhancements (Out of Scope)

### 12.1 Potential Features
- Automated vital sign reminders based on interval settings
- Integration with pharmacy system for medication requests
- PDF export of observation summary
- Vital signs trend visualization (charts)
- Integration with nursing station for vital sign entry
- Automated alerts for abnormal vital signs

### 12.2 Multi-Department Expansion
- Extend to Rawat Jalan (outpatient observation)
- Extend to Rawat Inap (inpatient monitoring)
- Shared observasi_form.vue component for reusability

---

## 13. Approval & Sign-Off

**Design Status:** ✅ Approved for Implementation
**Approach:** Replicate Visum Pattern
**Date Approved:** 2026-04-11
**Next Step:** Implementation Planning via writing-plans skill

---

## 14. References

- Backend API Documentation: `/Users/baagas0/Documents/serova/simrs/simrs-be-2/documentation_observasi.md`
- Visum Module: `src/modules/registrasi/layanan_igd/visum.vue`
- Visum Form: `src/modules/_shared/visum_form.vue`
- Medical Planning: `src/modules/registrasi/layanan_igd/_components/assesmen_medis/medis_planning.vue`
- Routes: `src/modules/registrasi/_index.js`
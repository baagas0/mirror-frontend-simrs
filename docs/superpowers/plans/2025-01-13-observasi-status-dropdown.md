# Observasi Status Dropdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an editable status dropdown to the observasi form that updates via API, appearing in both the list view table and edit form.

**Architecture:**
- Add status field to data model with 4 predefined values
- Replace static status badge with editable dropdown in table
- Add status dropdown field in edit form (Monitoring tab)
- Implement API handler with error rollback
- Update form submission to include status field

**Tech Stack:** Vue.js 2.7, Bootstrap Vue 2.21.2, Axios API client

---

### Task 1: Add Status Data Properties

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:826-894`

Add status options and status field to the component data model.

- [ ] **Step 1: Add status options array and status field to data()**

Find the `data()` return object and add these properties:

```javascript
data() {
  return {
    loading: false,
    isFormMode: false,
    activeTab: "monitoring",
    observasiList: [],
    selectedObservasi: null,
    vitalSignsList: [],
    // ... existing data properties
    statusOptions: [
      'Belum Selesai',
      'Berjalan',
      'Perlu Evaluasi',
      'Selesai'
    ],
    formData: {
      id: null,
      registrasi_id: this.registrasiId,
      durasi: 3,
      jam_start: "",
      jam_end: null,
      interval_vital_sign: 1,
      catatan_dokter: "",
      infus: "",
      obat: "",
      tindakan: "",
      keputusan_akhir: "",
      status: "Belum Selesai", // Add this line
    },
    // ... rest of data properties
  };
},
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat: add status options and status field to observasi data model"
```

---

### Task 2: Replace Static Status Badge with Dropdown in Table

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:52-54`

Replace the static badge with an editable dropdown that calls the API on change.

- [ ] **Step 1: Replace status badge with dropdown**

Find the status column in the table (around line 52) and replace the static badge with:

```vue
<td>
  <div class="d-flex align-items-center">
    <select
      v-model="item.status"
      @change="updateStatus(item)"
      :disabled="item.updatingStatus"
      class="form-control form-control-sm status-dropdown"
    >
      <option v-for="status in statusOptions" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
    <span v-if="item.updatingStatus" class="spinner-border spinner-border-sm ml-2"></span>
  </div>
</td>
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat: replace static status badge with editable dropdown in observasi table"
```

---

### Task 3: Implement updateStatus API Handler Method

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:906-1680`

Add the method that calls the updateStatus API endpoint with error handling and rollback.

- [ ] **Step 1: Add updateStatus method to methods object**

Add this method after the `loadObservasiData` method (around line 935):

```javascript
async updateStatus(item) {
  if (!item || !item.id) {
    this.$_alert.error({}, "Tidak ada data untuk diperbarui");
    return;
  }

  // Store previous value for rollback
  const previousStatus = item.status;
  item.updatingStatus = true;

  try {
    const response = await this.$_api.post("observasi/updateStatus", {
      id: item.id,
      status: item.status
    });

    this.$_alert.success({}, response.message || "Status berhasil diperbarui");

    // Refresh list to get updated data
    await this.loadObservasiData();
  } catch (error) {
    console.error("Error updating status:", error);

    // Rollback to previous value
    item.status = previousStatus;

    let message = "Gagal memperbarui status";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }

    this.$_alert.error({}, message);
  } finally {
    item.updatingStatus = false;
  }
},
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat: add updateStatus API handler with error rollback"
```

---

### Task 4: Add Status Dropdown to Edit Form (Monitoring Tab)

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:179-187`

Add a status dropdown field in the Monitoring tab after the Interval Vital Sign field.

- [ ] **Step 1: Add status dropdown form field**

After the Interval Vital Sign field (around line 187), add a new row with the status field:

```vue
<div class="row">
  <div class="col-md-6">
    <div class="form-group">
      <label class="font-weight-bold">Status Observasi <span class="text-danger">*</span></label>
      <select v-model="formData.status" class="form-control">
        <option value="">- Pilih Status -</option>
        <option v-for="status in statusOptions" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
      <small class="text-muted">Status observasi saat ini</small>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat: add status dropdown field to monitoring tab in edit form"
```

---

### Task 5: Update resetForm Method to Include Status

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:1360-1374`

Update the resetForm method to initialize the status field.

- [ ] **Step 1: Add status to resetForm method**

Find the `resetForm()` method and update it to include status:

```javascript
resetForm() {
  this.formData = {
    id: null,
    registrasi_id: this.registrasiId,
    durasi: 24,
    jam_start: "",
    jam_end: null,
    interval_vital_sign: 1,
    catatan_dokter: "",
    infus: "",
    obat: "",
    tindakan: "",
    keputusan_akhir: "",
    status: "Belum Selesai", // Add this line
  };
},
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat: include status in resetForm method"
```

---

### Task 6: Update editRecord Method to Load Status

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:978-1021`

Update the editRecord method to load the status value when editing an existing observasi.

- [ ] **Step 1: Add status to formData in editRecord method**

Find the `editRecord` method and update the formData assignment to include status:

```javascript
async editRecord(item) {
  this.loading = true;
  try {
    const response = await this.$_api.post("observasi/detailsById", {
      id: item.id,
    });

    if (response.data) {
      const observasi = response.data;
      this.selectedObservasi = observasi;
      this.formData = {
        id: observasi.id,
        registrasi_id: observasi.registrasi_id,
        durasi: observasi.durasi || 24,
        jam_start: (observasi.jam_start || "").replace(":00.000Z", ""),
        jam_end: (observasi.jam_end || "").replace(":00.000Z", ""),
        interval_vital_sign: observasi.interval_vital_sign || 1,
        catatan_dokter: observasi.catatan_dokter || "",
        infus: observasi.infus || "",
        obat: observasi.obat || "",
        tindakan: observasi.tindakan || "",
        keputusan_akhir: observasi.keputusan_akhir || "",
        status: observasi.status || "Belum Selesai", // Add this line
      };
      this.isFormMode = true;
      // Load vital signs for this observation
      await this.loadVitalSigns();
      // Parse therapy data from backend
      await this.parseTherapyFromBackend(observasi.infus, observasi.obat, observasi.tindakan);
      // Load evaluasi list
      await this.loadEvaluasiList();
    }
  } catch (error) {
    console.error("Error loading observasi for edit:", error);
    let message = "Gagal memuat data observasi untuk edit";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    this.$_alert.error({}, message);
  } finally {
    this.loading = false;
  }
},
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat: load status value when editing observasi"
```

---

### Task 7: Update submitForm Method to Include Status

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:1286-1358`

Update the submitForm method to include status in both update and create API calls.

- [ ] **Step 1: Add status to update API call**

Find the update block in submitForm method (around line 1311) and add status:

```javascript
if (this.formData.id) {
  // Update existing
  response = await this.$_api.post("observasi/update", {
    id: this.formData.id,
    registrasi_id: this.formData.registrasi_id,
    durasi: this.formData.durasi,
    jam_start: this.formData.jam_start || null,
    jam_end: this.formData.jam_end || null,
    interval_vital_sign: this.formData.interval_vital_sign || null,
    catatan_dokter: this.formData.catatan_dokter || null,
    infus: this.formData.infus || null,
    obat: this.formData.obat || null,
    tindakan: this.formData.tindakan || null,
    keputusan_akhir: this.formData.keputusan_akhir || null,
    status: this.formData.status || null, // Add this line
  });
}
```

- [ ] **Step 2: Add status to create API call**

Find the create block in submitForm method (around line 1326) and add status:

```javascript
else {
  // Create new
  response = await this.$_api.post("observasi/register", {
    registrasi_id: this.registrasiId,
    durasi: this.formData.durasi,
    jam_start: this.formData.jam_start || null,
    interval_vital_sign: this.formData.interval_vital_sign || null,
    catatan_dokter: this.formData.catatan_dokter || null,
    infus: this.formData.infus || null,
    obat: this.formData.obat || null,
    tindakan: this.formData.tindakan || null,
    keputusan_akhir: this.formData.keputusan_akhir || null,
    status: this.formData.status || "Belum Selesai", // Add this line
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "feat: include status in observasi create and update API calls"
```

---

### Task 8: Add Status Dropdown Styling

**Files:**
- Modify: `src/modules/_shared/observasi_form.vue:1684-1716`

Add CSS styling for the status dropdown to make it visually appealing.

- [ ] **Step 1: Add status dropdown styles**

Add these styles to the `<style scoped>` section at the end of the file:

```css
.status-dropdown {
  min-width: 150px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-dropdown:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  border-color: #80bdff;
}

.status-dropdown:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "style: add status dropdown styling"
```

---

### Task 9: Test the Implementation

**Files:**
- Test: Manual testing in browser

- [ ] **Step 1: Start development server**

```bash
npm run dev
```

- [ ] **Step 2: Test list view status dropdown**

1. Navigate to a patient registration with observasi data
2. Verify status dropdown appears in the table (not a static badge)
3. Select a different status from the dropdown
4. Verify loading spinner appears during API call
5. Verify success message appears
6. Verify dropdown shows the new status value
7. Verify the list refreshes with updated data

- [ ] **Step 3: Test error handling**

1. Open browser DevTools Network tab
2. Block the `/observasi/updateStatus` API call
3. Try changing the status
4. Verify error message appears
5. Verify dropdown rolls back to previous value
6. Verify loading state clears

- [ ] **Step 4: Test edit form status field**

1. Click "Edit" button on an observasi record
2. Verify Monitoring tab shows the status dropdown
3. Verify current status is pre-selected
4. Change the status to a different value
5. Click "Simpan Perubahan"
6. Verify form submits successfully
7. Verify status is saved correctly

- [ ] **Step 5: Test create form status field**

1. Click "Buat Data Observasi" button
2. Fill in required fields (durasi, jam_start)
3. Verify status dropdown shows "Belum Selesai" as default
4. Change status to a different value
5. Click "Buat Observasi"
6. Verify form submits successfully
7. Verify new observasi has the selected status

- [ ] **Step 6: Test all status values**

Test transitioning between all status values:
- Belum Selesai → Berjalan
- Berjalan → Perlu Evaluasi
- Perlu Evaluasi → Selesai
- Selesai → Belum Selesai (if allowed)
- And all other combinations

- [ ] **Step 7: Run linting**

```bash
npm run lint
```

Fix any linting errors if present.

- [ ] **Step 8: Commit any fixes**

```bash
git add src/modules/_shared/observasi_form.vue
git commit -m "fix: address issues found during testing"
```

---

### Task 10: Final Verification

**Files:**
- Verification: Complete feature review

- [ ] **Step 1: Verify all requirements are met**

Check against the design spec:
- [x] Status dropdown in list view table
- [x] Status dropdown in edit form (Monitoring tab)
- [x] API integration with `/observasi/updateStatus`
- [x] Error handling with rollback
- [x] Loading state during API call
- [x] All 4 status values available
- [x] Status included in form submission
- [x] Status loaded when editing

- [ ] **Step 2: Create summary commit**

```bash
git add .
git commit -m "feat: complete observasi status dropdown implementation

- Add editable status dropdown in list view table
- Add status dropdown field in edit form Monitoring tab
- Implement updateStatus API handler with error rollback
- Support 4 status values: Belum Selesai, Berjalan, Perlu Evaluasi, Selesai
- Add loading state and error handling
- Include status in create and update operations
- Add dropdown styling"
```

---

## Self-Review Checklist

- [x] **Spec coverage**: All requirements from design spec are implemented
  - [x] Table status dropdown ✓ (Task 2)
  - [x] Edit form status field ✓ (Task 4)
  - [x] API integration ✓ (Task 3)
  - [x] Error handling with rollback ✓ (Task 3)
  - [x] All 4 status values ✓ (Task 1)
  - [x] Form submission integration ✓ (Task 7)

- [x] **Placeholder scan**: No TBD, TODO, or incomplete steps found
- [x] **Type consistency**: All property names match (status, statusOptions, updateStatus)
- [x] **Code completeness**: All code blocks are complete and ready to implement

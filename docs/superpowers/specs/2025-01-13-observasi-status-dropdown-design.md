# Observasi Status Dropdown Feature Design

**Date:** 2025-01-13
**Component:** `src/modules/_shared/observasi_form.vue`
**API Endpoint:** `/observasi/updateStatus`

## Overview

Add an editable status dropdown to the observasi form that allows users to update the observation status via API. The dropdown appears in both the list view table and the edit form (Monitoring tab).

## Requirements

### Functional Requirements

1. **List View Status Dropdown**
   - Replace static status badge with editable dropdown
   - Update status via API when value changes
   - Show loading state during API call
   - Handle errors gracefully with rollback

2. **Edit Form Status Field**
   - Add status dropdown in Monitoring tab
   - Include status in form data when submitting
   - Validate as required field

3. **API Integration**
   - Endpoint: `/observasi/updateStatus`
   - Method: POST
   - Payload: `{ id: string, status: string }`

### Status Values

The dropdown should support these status values:
- `Belum Selesai` (Not Completed)
- `Berjalan` (In Progress)
- `Perlu Evaluasi` (Needs Evaluation)
- `Selesai` (Completed)

## Implementation Design

### 1. Data Model Changes

**Add to `data()`:**
```javascript
statusOptions: [
  'Belum Selesai',
  'Berjalan',
  'Perlu Evaluasi',
  'Selesai'
],

formData: {
  // ... existing fields
  status: 'Belum Selesai' // Add this field
}
```

### 2. Table Status Column (Line ~52-53)

**Replace static badge with:**
```vue
<td>
  <div class="d-flex align-items-center">
    <select
      v-model="item.status"
      @change="updateStatus(item)"
      :disabled="item.updatingStatus"
      class="form-control form-control-sm status-dropdown"
      :class="getStatusClass(item.status)"
    >
      <option v-for="status in statusOptions" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
    <span v-if="item.updatingStatus" class="spinner-border spinner-border-sm ml-2"></span>
  </div>
</td>
```

### 3. Edit Form - Monitoring Tab (Line ~177, after Interval Vital Sign)

**Add new form field:**
```vue
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
```

### 4. API Handler Method

**Add to `methods`:**
```javascript
async updateStatus(item) {
  if (!item || !item.id) return;

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
}
```

### 5. Status Helper Method (Optional)

**Add visual styling helper:**
```javascript
getStatusClass(status) {
  const statusMap = {
    'Belum Selesai': 'badge-secondary',
    'Berjalan': 'badge-warning',
    'Perlu Evaluasi': 'badge-info',
    'Selesai': 'badge-success'
  };
  return statusMap[status] || 'badge-secondary';
}
```

### 6. Form Integration

**Update `resetForm()` method:**
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
    status: "Belum Selesai" // Add this
  };
}
```

**Update `editRecord()` method to load status:**
```javascript
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
  status: observasi.status || "Belum Selesai" // Add this
};
```

**Update `submitForm()` to include status:**
```javascript
// In update block
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
  status: this.formData.status || null // Add this
});

// In create block
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
  status: this.formData.status || "Belum Selesai" // Add this
});
```

### 7. Styling

**Add to `<style scoped>`:**
```css
.status-dropdown {
  min-width: 150px;
  font-weight: 500;
}

.status-dropdown.badge-secondary {
  background-color: #6c757d;
  color: white;
}

.status-dropdown.badge-warning {
  background-color: #ffc107;
  color: #212529;
}

.status-dropdown.badge-info {
  background-color: #17a2b8;
  color: white;
}

.status-dropdown.badge-success {
  background-color: #28a745;
  color: white;
}
```

## Error Handling

1. **API Failure**: Rollback dropdown to previous value and show error alert
2. **Network Error**: Show user-friendly error message with retry option
3. **Validation**: Ensure status is not empty before calling API
4. **Loading State**: Disable dropdown during API call to prevent duplicate requests

## User Experience

### List View
- User sees current status in dropdown
- Clicking dropdown shows all status options
- Selecting new value immediately triggers API update
- Loading spinner shows during update
- Success message displays on completion
- Error message shows if update fails (with rollback)

### Edit Form
- Status field appears in Monitoring tab after Interval Vital Sign
- Dropdown shows current status value
- Status is validated as required field
- Status is saved when form is submitted

## Testing Considerations

1. Test all status value transitions
2. Test API failure scenarios
3. Test rapid dropdown changes (debouncing if needed)
4. Test form validation with empty status
5. Test concurrent updates from multiple users
6. Test loading state behavior
7. Test error rollback functionality

## Future Enhancements

- Add status transition validation (e.g., can't go from Selesai back to Berjalan)
- Add audit trail for status changes
- Add status change notifications
- Add bulk status update functionality

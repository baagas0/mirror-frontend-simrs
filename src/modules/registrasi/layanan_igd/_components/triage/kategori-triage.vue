<template>
	<b-card no-body class="card-custom mb-1" style="border-radius: 10px 10px 0px 0px;">
		<b-card-header header-tag="div" class="p-1" role="tab" v-b-toggle.kategori-triage style="min-height: 0px; background-color: #87bf6d; border-radius: 10px 10px 0px 0px;">
			<div class="card-title" style="padding: 0.7rem 1rem;">
				<h4 class="card-label">
					Kategori Triage
				</h4>
			</div>
			<div class="card-toolbar" style="margin: .5rem 1rem;">
				<i class="ri-arrow-down-double-line text-white" v-if="collapse"></i>
				<i class="ri-arrow-right-double-line text-white" v-else></i>
		</div>
		</b-card-header>
		<b-collapse id="kategori-triage" v-model="collapse" accordion="accordion-kategori-triage" role="tabpanel">
			<b-card-body>
				<div class="row">
					<div class="col-12">
						<s-input v-model="mData.kategori_triage" :item="{
							label: '',
							id: 'kategori_triage',
							data: 'kategori_triage',
							type: 'lookup-button',
							validation: [],
							value: mData.kategori_triage,
							pointer: {
								label: 'label',
								code: 'code',
								display: ['label'],
								list: [
									{ label: 'Dewasa', code: 'Dewasa' },
									{ label: 'Anak', code: 'Anak' },
								]
							},
							param: {},
						}" :valuee="mData.kategori_triage" />
					</div>

					<template v-if="mData.kategori_triage === 'Dewasa'">
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Jalan Nafas</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">

										<b-form-radio v-model="mData.jalan_nafas_kategori" name="jalan-nafas-dewasa" size="lg" value="Terhambat - Kategori 1">Terhambat</b-form-radio>
										<s-input v-model="mData.jalan_nafas_kategori_text" class="mt-2" v-if="mData.jalan_nafas_kategori == 'Terhambat - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'jalan_nafas_kategori_text',
											data: 'jalan_nafas_kategori_text',
											type: 'text',
											validation: [],
											value: mData.jalan_nafas_kategori_text,
										}" :valuee="mData.jalan_nafas_kategori_text" />
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.jalan_nafas_kategori" name="jalan-nafas-dewasa" size="lg" value="Bebas - Kategori 2">Bebas</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.jalan_nafas_kategori" name="jalan-nafas-dewasa" size="lg" value="Bebas - Kategori 3">Bebas</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.jalan_nafas_kategori" name="jalan-nafas-dewasa" size="lg" value="Bebas - Kategori 4">Bebas</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.jalan_nafas_kategori" name="jalan-nafas-dewasa" size="lg" value="Bebas - Kategori 5">Bebas</b-form-radio>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Ke Tidak Mampuan Fisik</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.ketidakmampuan_fisik_kategori" name="ketidakmampuan-fisik-dewasa" size="lg" value="GCS < 9 - Kategori 1">GCS < 9</b-form-radio>
										<s-input v-model="mData.ketidakmampuan_fisik_kategori_text" class="mt-2" v-if="mData.ketidakmampuan_fisik_kategori == 'GCS < 9 - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'ketidakmampuan_fisik_kategori_text',
											data: 'ketidakmampuan_fisik_kategori_text',
											type: 'text',
											validation: [],
											value: mData.ketidakmampuan_fisik_kategori_text,
										}" :valuee="mData.ketidakmampuan_fisik_kategori_text" />
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.ketidakmampuan_fisik_kategori" name="ketidakmampuan-fisik-dewasa" size="lg" value="GCS < 9 - 12 - Kategori 2">GCS < 9 - 12</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.ketidakmampuan_fisik_kategori" name="ketidakmampuan-fisik-dewasa" size="lg" value="GCS < 9 > 12 - Kategori 3">GCS < 9 > 12</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.ketidakmampuan_fisik_kategori" name="ketidakmampuan-fisik-dewasa" size="lg" value="Normal GCS - Kategori 4">Normal GCS</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.ketidakmampuan_fisik_kategori" name="ketidakmampuan-fisik-dewasa" size="lg" value="Normal GCS - Kategori 5">Normal GCS</b-form-radio>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Pengecekan Nadi Carotis</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.nadi_carotis_kategori" name="nadi-carotis-dewasa" size="lg" value="Gangguan Hemodinamik Berat / Tidak ada sirkulasi - Kategori 1">Gangguan Hemodinamik Berat / Tidak ada sirkulasi</b-form-radio>
										<s-input v-model="mData.nadi_carotis_kategori_text" class="mt-2" v-if="mData.nadi_carotis_kategori == 'Gangguan Hemodinamik Berat / Tidak ada sirkulasi - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'nadi_carotis_kategori_text',
											data: 'nadi_carotis_kategori_text',
											type: 'text',
											validation: [],
											value: mData.nadi_carotis_kategori_text,
										}" :valuee="mData.nadi_carotis_kategori_text" />

										<b-form-group v-slot="{ ariaDescribedby }">
											<b-form-checkbox-group
												id="nadi_carotis_kategori_1_check"
												v-model="mData.nadi_carotis_kategori_1_check"
												:options="[
													{ text: 'Pendarahan tidak terkontrol', value: 'Pendarahan tidak terkontrol' },
													{ text: 'Nadi tidak terbaca', value: 'Nadi tidak terbaca' },
												]"
												:aria-describedby="ariaDescribedby"
												name="nadi_carotis_kategori_1_check"
											></b-form-checkbox-group>
										</b-form-group>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.nadi_carotis_kategori" name="nadi-carotis-dewasa" size="lg" value="Gangguan Hemodinamik Sedang - Kategori 2">Gangguan Hemodinamik Sedang</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.nadi_carotis_kategori" name="nadi-carotis-dewasa" size="lg" value="Gangguan Hemodinamik Ringan - Kategori 3">Gangguan Hemodinamik Ringan</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.nadi_carotis_kategori" name="nadi-carotis-dewasa" size="lg" value="Tidak Ada Gangguan Hemodinamik - Kategori 4">Tidak Ada Gangguan Hemodinamik</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.nadi_carotis_kategori" name="nadi-carotis-dewasa" size="lg" value="Tidak Ada Gangguan Hemodinamik - Kategori 5">Tidak Ada Gangguan Hemodinamik</b-form-radio>
										
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Pernafasan</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.pernafasan_kategori" name="pernafasan-dewasa" size="lg" value="Henti Nafas - Kategori 1">Henti Nafas</b-form-radio>
										<s-input v-model="mData.pernafasan_kategori_text" class="mt-2" v-if="mData.pernafasan_kategori == 'Henti Nafas - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'pernafasan_kategori_text',
											data: 'pernafasan_kategori_text',
											type: 'text',
											validation: [],
											value: mData.pernafasan_kategori_text,
										}" :valuee="mData.pernafasan_kategori_text" />

										<b-form-group v-slot="{ ariaDescribedby }">
											<b-form-checkbox-group
												id="pernafasan_kategori_1_check"
												v-model="mData.pernafasan_kategori_1_check"
												:options="[
													{ text: 'Sianosis', value: 'Sianosis' },
												]"
												:aria-describedby="ariaDescribedby"
												name="pernafasan_kategori_1_check"
											></b-form-checkbox-group>
										</b-form-group>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.pernafasan_kategori" name="pernafasan-dewasa" size="lg" value="Gangguan Pernafasan Sedang - Kategori 2">Gangguan Pernafasan Sedang</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.pernafasan_kategori" name="pernafasan-dewasa" size="lg" value="Gangguan Pernafasan Ringan - Kategori 3">Gangguan Pernafasan Ringan</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.pernafasan_kategori" name="pernafasan-dewasa" size="lg" value="Tidak Ada Gangguan Pernafasan - Kategori 4">Tidak Ada Gangguan Pernafasan</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.pernafasan_kategori" name="pernafasan-dewasa" size="lg" value="Tidak Ada Gangguan Pernafasan - Kategori 5">Tidak Ada Gangguan Pernafasan</b-form-radio>

									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Assesmen Triage</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-dewasa" size="lg" value="Resusitasi segera - Kategori 1">Resusitasi segera</b-form-radio>
										<s-input v-model="mData.assesmen_triage_kategori_text" class="mt-2" v-if="mData.assesmen_triage_kategori == 'Resusitasi segera - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'assesmen_triage_kategori_text',
											data: 'assesmen_triage_kategori_text',
											type: 'text',
											validation: [],
											value: mData.assesmen_triage_kategori_text,
										}" :valuee="mData.assesmen_triage_kategori_text" />
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-dewasa" size="lg" value="Emergensi Sedang - Kategori 2">Emergensi Sedang</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-dewasa" size="lg" value="Gawat - Kategori 3">Gawat</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-dewasa" size="lg" value="Sedikit gawat - Kategori 4">Sedikit gawat</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-dewasa" size="lg" value="Tidak gawat - Kategori 5">Tidak gawat</b-form-radio>

									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else-if="mData.kategori_triage === 'Anak'">
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Jalan Nafas</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.jalan_nafas_kategori_anak" name="jalan-nafas-anak" size="lg" value="Terhambat - Kategori 1">Terhambat</b-form-radio>
										<s-input v-model="mData.jalan_nafas_kategori_anak_text" class="mt-2" v-if="mData.jalan_nafas_kategori_anak == 'Terhambat - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'jalan_nafas_kategori_anak_text',
											data: 'jalan_nafas_kategori_anak_text',
											type: 'text',
											validation: [],
											value: mData.jalan_nafas_kategori_anak_text,
										}" :valuee="mData.jalan_nafas_kategori_anak_text" />
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.jalan_nafas_kategori_anak" name="jalan-nafas-anak" size="lg" value="Bebas - Kategori 2">Bebas</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.jalan_nafas_kategori_anak" name="jalan-nafas-anak" size="lg" value="Bebas - Kategori 3">Bebas</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.jalan_nafas_kategori_anak" name="jalan-nafas-anak" size="lg" value="Bebas - Kategori 4">Bebas</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.jalan_nafas_kategori_anak" name="jalan-nafas-anak" size="lg" value="Bebas - Kategori 5">Bebas</b-form-radio>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Pernafasan</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.pernafasan_anak" name="pernafasan-anak" size="lg" value="Henti Nafas - Kategori 1">Henti Nafas</b-form-radio>
										<s-input v-model="mData.pernafasan_anak_text" class="mt-2" v-if="mData.pernafasan_anak == 'Henti Nafas - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'pernafasan_anak_text',
											data: 'pernafasan_anak_text',
											type: 'text',
											validation: [],
											value: mData.pernafasan_anak_text,
										}" :valuee="mData.pernafasan_anak_text" />

										<b-form-group v-slot="{ ariaDescribedby }">
											<b-form-checkbox-group
												id="pernafasan_kategori_1_check"
												v-model="mData.pernafasan_kategori_1_check_anak"
												:options="[
													{ text: 'Sianosis', value: 'Sianosis' },
												]"
												:aria-describedby="ariaDescribedby"
												name="pernafasan_kategori_1_check"
											></b-form-checkbox-group>
										</b-form-group>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.pernafasan_anak" name="pernafasan-anak" size="lg" value="Pernafasan Ada - Kategori 2">Pernafasan Ada</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.pernafasan_anak" name="pernafasan-anak" size="lg" value="Pernafasan Ada - Kategori 3">Pernafasan Ada</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.pernafasan_anak" name="pernafasan-anak" size="lg" value="Pernafasan Ada - Kategori 4">Pernafasan Ada</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.pernafasan_anak" name="pernafasan-anak" size="lg" value="Pernafasan Ada - Kategori 5">Pernafasan Ada</b-form-radio>

									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Sirkulasi dan Dehidrasi LOC / Activity cap refull < 2 sec Mukosa Mulut kering, mata cekung - Turgor jaringan tidak ada air mata - Pernafasan dalam <br> denyut nadi lebah / Tachcardia - Mengeluarkan Urin</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.sirkulasi_dehidrasi_anak" name="sirkulasi-dehidrasi-anak" size="lg" value="Gangguan Pernafasan berat, e.g. berat menggunakan tambahan otot Retraksi Parah Sianosis Akut - Kategori 1">Gangguan Pernafasan berat, e.g. berat menggunakan tambahan otot Retraksi Parah Sianosis Akut</b-form-radio>
										<s-input v-model="mData.sirkulasi_dehidrasi_anak_text" class="mt-2" v-if="mData.sirkulasi_dehidrasi_anak == 'Gangguan Pernafasan berat, e.g. berat menggunakan tambahan otot Retraksi Parah Sianosis Akut - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'sirkulasi_dehidrasi_anak_text',
											data: 'sirkulasi_dehidrasi_anak_text',
											type: 'text',
											validation: [],
											value: mData.sirkulasi_dehidrasi_anak_text,
										}" :valuee="mData.sirkulasi_dehidrasi_anak_text" />

										<b-form-group v-slot="{ ariaDescribedby }">
											<b-form-checkbox-group
												id="sirkulasi_dehidrasi_kategori_1_check"
												v-model="mData.sirkulasi_dehidrasi_kategori_1_check_anak"
												:options="[
													{ text: 'Tidak ada Sirkulasi bradikardia signifikan HR < 60 pada bayi', value: 'Tidak ada Sirkulasi bradikardia signifikan HR < 60 pada bayi' },
													{ text: 'Gangguan Hemodinaik berat', value: 'Gangguan Hemodinaik berat' },
													{ text: 'Denyut nadi tidak ada', value: 'Denyut nadi tidak ada' },
													{ text: 'Kulit pucat, dingin, lembab, belang', value: 'Kulit pucat, dingin, lembab, belang' },
													{ text: 'Tackikardia Signifikan Kapiler Refill > 4 sec', value: 'Tackikardia Signifikan Kapiler Refill > 4 sec' },
													{ text: 'Pendarahan tidak tercontrol', value: 'Pendarahan tidak tercontrol' },
												]"
												:aria-describedby="ariaDescribedby"
												name="sirkulasi_dehidrasi_kategori_1_check"
											></b-form-checkbox-group>
										</b-form-group>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.sirkulasi_dehidrasi_anak" name="sirkulasi-dehidrasi-anak" size="lg" value="Gangguan Pernafasan Sedang - Kategori 2">Gangguan Pernafasan Sedang</b-form-radio>

										<b-form-group v-slot="{ ariaDescribedby }">
											<b-form-checkbox-group
												id="sirkulasi_dehidrasi_kategori_1_check"
												v-model="mData.sirkulasi_dehidrasi_kategori_1_check_anak"
												:options="[
													{ text: 'Gangguan hemodinaik sedang', value: 'Gangguan hemodinaik sedang' },
												]"
												:aria-describedby="ariaDescribedby"
												name="sirkulasi_dehidrasi_kategori_1_check"
											></b-form-checkbox-group>
										</b-form-group>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.sirkulasi_dehidrasi_anak" name="sirkulasi-dehidrasi-anak" size="lg" value="Gangguan Pernafasan Ringan - Kategori 3">Gangguan Pernafasan Ringan</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.sirkulasi_dehidrasi_anak" name="sirkulasi-dehidrasi-anak" size="lg" value="Tidak Ada Gangguan Pernafasan - Kategori 4">Tidak Ada Gangguan Pernafasan</b-form-radio>
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.sirkulasi_dehidrasi_anak" name="sirkulasi-dehidrasi-anak" size="lg" value="Tidak Ada Gangguan Pernafasan - Kategori 5">Tidak Ada Gangguan Pernafasan</b-form-radio>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<p class="font-weight-bolder">Assesmen Triage</p>
	
							<div class="d-flex gap-3">
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 1</p>
									</div>
									<div class="simple-card-body bg-danger">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-anak" size="lg" value="Resusitasi segera - Kategori 1">Resusitasi segera</b-form-radio>
										<s-input v-model="mData.assesmen_triage_kategori_text" class="mt-2" v-if="mData.assesmen_triage_kategori == 'Resusitasi segera - Kategori 1'" :item="{
											label: '',
											placeholder: 'Keterangan',
											id: 'assesmen_triage_kategori_text',
											data: 'assesmen_triage_kategori_text',
											type: 'text',
											validation: [],
											value: mData.assesmen_triage_kategori_text,
										}" :valuee="mData.assesmen_triage_kategori_text" />
									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 2</p>
									</div>
									<div class="simple-card-body bg-warning">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-anak" size="lg" value="Emergensi Sedang - Kategori 2">Emergensi Sedang</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 3</p>
									</div>
									<div class="simple-card-body bg-success">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-anak" size="lg" value="Gawat - Kategori 3">Gawat</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 4</p>
									</div>
									<div class="simple-card-body bg-primary">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-anak" size="lg" value="Sedikit gawat - Kategori 4">Sedikit gawat</b-form-radio>

									</div>
								</div>
	
								<div class="simple-card">
									<div class="simple-card-header">
										<p class="mb-0">Kategori 5</p>
									</div>
									<div class="simple-card-body bg-secondary">
										<b-form-radio v-model="mData.assesmen_triage_kategori" name="assesmen_triage-anak" size="lg" value="Tidak gawat - Kategori 5">Tidak gawat</b-form-radio>

									</div>
								</div>
							</div>
						</div>
					</template>

					<div class="col-12">
						<s-input v-model="mData.kesimpulan_triage" :item="{
							label: 'Kesimpulan Triage',
							id: 'kesimpulan_triage',
							data: 'kesimpulan_triage',
							type: 'textarea',
							validation: [],
							value: mData.kesimpulan_triage,
							param: {},
						}" :valuee="mData.kesimpulan_triage" />
					</div>

				</div>
			</b-card-body>
		</b-collapse>
	</b-card>
</template>
	
<script>
	import moment from 'moment'
	moment.locale('id')
	
	export default {
		name: 'kategori-triage',
		props: {
			objectDataAssesmen: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			},
			mData: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			}
		},
		data () {
			return {
				// mData: {}
				collapse: true
			}
		},
		watch: {
			mData: {
				deep: true,
				immediate: false,
				handler (to, from) {
					this.$emit('dataChange', true)
				}
			}
		},
		mounted () {
		},
		methods: {
			onSubmit () {
				this.$emit('submit', { key: 'subjective', data: this.mData })
			}
		}
	}
</script>

<style scoped>
	.simple-card {
		flex-grow: 1;
		border: 1px solid #b7b7b7;

		display: flex;
		flex-direction: column;
	}
	.simple-card > .simple-card-header {
		color: #ffff;
		background-color: #5e5e5e;
		border-bottom: 1px solid #b7b7b7;

		display: flex !important;
		-webkit-box-pack: center !important;
		-ms-flex-pack: center !important;
		justify-content: center !important;
		
		-webkit-box-align: center !important;
		-ms-flex-align: center !important;
		align-items: center !important;
	}

	.simple-card > .simple-card-body {
		padding: 5px !important;
		flex-grow: 1;
	}

	.d-flex > .simple-card {
		flex-basis: 20%;
	}
</style>
<style>
.custom-control-label {
	font-size: 1rem !important;
}
</style>
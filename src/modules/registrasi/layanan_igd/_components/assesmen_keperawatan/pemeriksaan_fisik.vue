<template>
	<div class="card card-custom card-sticky">
		<div class="card-header">
			<div class="card-title">
				<h3 class="card-label">
					Pemeriksaan Fisik <i class="mr-2"></i>
					<small class="">{{ dataRegistrasi.nama_lengkap }}</small>
				</h3>
			</div>
			<div class="card-toolbar">
				<div class="btn-group">
					<button type="button" class="btn btn-primary" @click="$parent.updateAssesmen({key:'pemeriksaan_fisik', data:mData})" :disabled="objectDataAssesmen.is_validasi">
						<i class="ri-save-line"></i>
						Simpan
					</button>
				</div>
			</div>
		</div>
		<div class="card-body">
			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
					<div class="row">
            
            <!-- <div class="col-12">
              <s-input v-model="mData.kepala" :item="{
                label: 'Kepala',
                id: 'kepala',
                data: 'kepala',
                value: mData.kepala,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.kepala" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.kulit" :item="{
                label: 'Kulit',
                id: 'kulit',
                data: 'kulit',
                value: mData.kulit,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.kulit" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.jantung" :item="{
                label: 'Jantung',
                id: 'jantung',
                data: 'jantung',
                value: mData.jantung,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.jantung" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.dada" :item="{
                label: 'Dada',
                id: 'dada',
                data: 'dada',
                value: mData.dada,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.dada" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.ekstremitas" :item="{
                label: 'Ekstremitas',
                id: 'ekstremitas',
                data: 'ekstremitas',
                value: mData.ekstremitas,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.ekstremitas" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.kekuatan_otot_tangan" :item="{
                label: 'Kekuatan Otot Tangan',
                id: 'kekuatan_otot_tangan',
                data: 'kekuatan_otot_tangan',
                value: mData.kekuatan_otot_tangan,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.kekuatan_otot_tangan" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.kekuatan_otot_kaki" :item="{
                label: 'Kekuatan Otot Kaki',
                id: 'kekuatan_otot_kaki',
                data: 'kekuatan_otot_kaki',
                value: mData.kekuatan_otot_kaki,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.kekuatan_otot_kaki" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.genitalia_dan_anus" :item="{
                label: 'Genitalia dan Anus',
                id: 'genitalia_dan_anus',
                data: 'genitalia_dan_anus',
                value: mData.genitalia_dan_anus,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.genitalia_dan_anus" />
            </div>
						<div class="col-12">
              <s-input v-model="mData.pemeriksaan_lain" :item="{
                label: 'Pemeriksaan Lain',
                id: 'pemeriksaan_lain',
                data: 'pemeriksaan_lain',
                value: mData.pemeriksaan_lain,
                type: 'text',
                validation: [],
                rows: 1,
              }" :disabled="objectDataAssesmen.is_validasi" :valuee="mData.pemeriksaan_lain" />
            </div> -->
            
            <!-- START DARI COPY SIMPUS -->
						<div class="col-12">
							<!-- <p class="font-weight-bolder">Keadaan Fisik</p> -->
						</div>
						<b-col cols="6" v-if="mData.pemeriksaan_kulit">
							<div class="">
								<div class="mt-2">
									<b-form-checkbox
										id="kulit"
										:disabled="is_validasi" v-model="mData.pemeriksaan_kulit.status"
										name="kulit"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan kulit</b-form-checkbox>
									<div v-if="mData.pemeriksaan_kulit.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kulit.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kulit.palpasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="kuku"
										:disabled="is_validasi" v-model="mData.pemeriksaan_kuku.status"
										name="kuku"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan kuku</b-form-checkbox>
									<div v-if="mData.pemeriksaan_kuku.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kuku.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kuku.palpasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="kepala"
										:disabled="is_validasi" v-model="mData.pemeriksaan_kepala.status"
										name="kepala"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan kepala</b-form-checkbox>
									<div v-if="mData.pemeriksaan_kepala.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kepala.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kepala.palpasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="wajah"
										:disabled="is_validasi" v-model="mData.pemeriksaan_wajah.status"
										name="wajah"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan wajah</b-form-checkbox>
									<div v-if="mData.pemeriksaan_wajah.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_wajah.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_wajah.palpasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="mata"
										:disabled="is_validasi" v-model="mData.pemeriksaan_mata.status"
										name="mata"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan mata</b-form-checkbox>
									<div v-if="mData.pemeriksaan_mata.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_mata.inspeksi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="telinga"
										:disabled="is_validasi" v-model="mData.pemeriksaan_telinga.status"
										name="telinga"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan telinga</b-form-checkbox>
									<div v-if="mData.pemeriksaan_telinga.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_telinga.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_telinga.palpasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="hidung_sinus"
										:disabled="is_validasi" v-model="mData.pemeriksaan_hidung_dan_sinus.status"
										name="hidung_sinus"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan hidung dan sinus</b-form-checkbox>
									<div v-if="mData.pemeriksaan_hidung_dan_sinus.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_hidung_dan_sinus.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_hidung_dan_sinus.palpasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="mulut_bibir"
										:disabled="is_validasi" v-model="mData.pemeriksaan_mulut_dan_bibir.status"
										name="mulut_bibir"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan mulut dan bibir</b-form-checkbox>
									<div v-if="mData.pemeriksaan_mulut_dan_bibir.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_mulut_dan_bibir.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_mulut_dan_bibir.palpasi"
										></b-form-textarea>
									</div>
								</div>
							</div>
						</b-col>
						<b-col cols="6">
							<div class="">
								<div class="mt-2">
									<b-form-checkbox
										id="leher"
										:disabled="is_validasi" v-model="mData.pemeriksaan_leher.status"
										name="leher"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan leher</b-form-checkbox>
									<div v-if="mData.pemeriksaan_leher.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi leher</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_leher.inspeksi"
										></b-form-textarea>
										<label for="inspeksi_aukultasi" class="mt-1 mb-0 p-0">inspeksi dan auskultasi arteri karotis</label>
										<b-form-textarea
											id="inspeksi_aukultasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_leher.inspeksi_aukultasi"
										></b-form-textarea>
										<label for="inspeksi_palpas" class="mt-1 mb-0 p-0">inspeksi dan palpasi kelenjer tiroid</label>
										<b-form-textarea
											id="inspeksi_palpas"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_leher.inspeksi_palpas"
										></b-form-textarea>
										<label for="akultulasi" class="mt-1 mb-0 p-0">auskultasi (bising pembuluh darah)</label>
										<b-form-textarea
											id="akultulasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_leher.akultulasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="dada_punggung"
										:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.status"
										name="dada_punggung"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan dada punggung</b-form-checkbox>
									<div v-if="mData.pemeriksaan_dada_dan_punggung.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.palpasi"
										></b-form-textarea>
										<label for="perkusi" class="mt-1 mb-0 p-0">perkusi</label>
										<b-form-textarea
											id="perkusi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.perkusi"
										></b-form-textarea>
										<label for="auskultasi" class="mt-1 mb-0 p-0">auskultasi</label>
										<b-form-textarea
											id="auskultasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_punggung.auskultasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="kardiovaskuler"
										:disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.status"
										name="kardiovaskuler"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan kardiovaskuler</b-form-checkbox>
									<div v-if="mData.pemeriksaan_kardiovaskuler.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.palpasi"
										></b-form-textarea>
										<label for="perkusi" class="mt-1 mb-0 p-0">perkusi</label>
										<b-form-textarea
											id="perkusi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.perkusi"
										></b-form-textarea>
										<label for="auskultasi" class="mt-1 mb-0 p-0">auskultasi</label>
										<b-form-textarea
											id="auskultasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_kardiovaskuler.auskultasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="dada_aksila"
										:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.status"
										name="dada_aksila"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan dada aksila</b-form-checkbox>
									<div v-if="mData.pemeriksaan_dada_dan_aksila.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi dada</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi dada</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.palpasi"
										></b-form-textarea>
										<label for="inspeksi_palpasi" class="mt-1 mb-0 p-0">inspeksi dan palpasi aksila</label>
										<b-form-textarea
											id="inspeksi_palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_dada_dan_aksila.inspeksi_palpasi"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="abdomen_perut"
										:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.status"
										name="abdomen_perut"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan abdomen perut</b-form-checkbox>
									<div v-if="mData.pemeriksaan_abdomen_perut.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.inspeksi"
										></b-form-textarea>
										<label for="auskultasi" class="mt-1 mb-0 p-0">auskultasi</label>
										<b-form-textarea
											id="auskultasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.auskultasi"
										></b-form-textarea>
										<label for="perkusi_semua_kuadran" class="mt-1 mb-0 p-0">perkusi semua kuadran</label>
										<b-form-textarea
											id="perkusi_semua_kuadran"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_semua_kuadran"
										></b-form-textarea>
										<label for="perkusi_hepar" class="mt-1 mb-0 p-0">perkusi hepar</label>
										<b-form-textarea
											id="perkusi_hepar"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_hepar"
										></b-form-textarea>
										<label for="perkusi_limfa" class="mt-1 mb-0 p-0">perkusi limfa</label>
										<b-form-textarea
											id="perkusi_limfa"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_limfa"
										></b-form-textarea>
										<label for="perkusi_ginjal" class="mt-1 mb-0 p-0">perkusi ginjal</label>
										<b-form-textarea
											id="perkusi_ginjal"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.perkusi_ginjal"
										></b-form-textarea>
										<label for="palpasi_semua_kuadran" class="mt-1 mb-0 p-0">palpasi semua kuadran</label>
										<b-form-textarea
											id="palpasi_semua_kuadran"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_abdomen_perut.palpasi_semua_kuadran"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="ekstermitas_atas"
										:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.status"
										name="ekstermitas_atas"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan ekstermitas atas</b-form-checkbox>
									<div v-if="mData.pemeriksaan_ekstermitas_atas.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi struktur muskuloskletal</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.palpasi"
										></b-form-textarea>
										<label for="tes_reflex" class="mt-1 mb-0 p-0">tes reflex</label>
										<b-form-textarea
											id="tes_reflex"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_atas.tes_reflex"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2">
									<b-form-checkbox
										id="ekstermitas_bawah"
										:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.status"
										name="ekstermitas_bawah"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan ekstermitas bawah</b-form-checkbox>
									<div v-if="mData.pemeriksaan_ekstermitas_bawah.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi struktur muskuloskletal</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.inspeksi"
										></b-form-textarea>
										<label for="palpasi" class="mt-1 mb-0 p-0">palpasi</label>
										<b-form-textarea
											id="palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.palpasi"
										></b-form-textarea>
										<label for="tes_reflex" class="mt-1 mb-0 p-0">tes reflex</label>
										<b-form-textarea
											id="tes_reflex"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_ekstermitas_bawah.tes_reflex"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2" v-if="dataRegistrasi.jenis_kelamin == 'L'">
									<b-form-checkbox
										id="genitalia_pria"
										:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.status"
										name="genitalia_pria"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan genitalia pria</b-form-checkbox>
									<div v-if="mData.pemeriksaan_genitalia_pria.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi dan palpasi penis</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.inspeksi"
										></b-form-textarea>
										<label for="inspeksi_palpasi" class="mt-1 mb-0 p-0">inspeksi dan palpasi skrotum</label>
										<b-form-textarea
											id="inspeksi_palpasi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.inspeksi_palpasi"
										></b-form-textarea>
										<label for="pemeriksaan_anus_rectum" class="mt-1 mb-0 p-0">pemeriksaan anus dan rectum</label>
										<b-form-textarea
											id="pemeriksaan_anus_rectum"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_pria.pemeriksaan_anus_rectum"
										></b-form-textarea>
									</div>
								</div>
								<div class="mt-2" v-if="dataRegistrasi.jenis_kelamin == 'P'">
									<b-form-checkbox
										id="genitalia_wanita"
										:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.status"
										name="genitalia_wanita"
										:value="true"
										:unchecked-value="false"
									>Pemeriksaan genitalia wanita</b-form-checkbox>
									<div v-if="mData.pemeriksaan_genitalia_wanita.status" class="ml-4">
										<label for="inspeksi" class="mt-1 mb-0 p-0">inspeksi genitalia eksternal</label>
										<b-form-textarea
											id="inspeksi"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.inspeksi"
										></b-form-textarea>
										<label for="inspeksi_vagina_servik" class="mt-1 mb-0 p-0">inspeksi vagina dan servik</label>
										<b-form-textarea
											id="inspeksi_vagina_servik"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.inspeksi_vagina_servik"
										></b-form-textarea>
										<label for="inspeksi_vagina_uterus_ovarium" class="mt-1 mb-0 p-0">palpasi vagina, uterus, dan ovarium</label>
										<b-form-textarea
											id="inspeksi_vagina_uterus_ovarium"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.inspeksi_vagina_uterus_ovarium"
										></b-form-textarea>
										<label for="pemeriksaan_anus_rectum" class="mt-1 mb-0 p-0">pemeriksaan anus dan rectum</label>
										<b-form-textarea
											id="pemeriksaan_anus_rectum"
											type="text"
											:disabled="is_validasi" v-model="mData.pemeriksaan_genitalia_wanita.pemeriksaan_anus_rectum"
										></b-form-textarea>
									</div>
								</div>
							</div>
						</b-col>
						<!-- END DARI COPY SIMPUS -->
          </div>
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>
	
<script>
	import moment from 'moment'
	moment.locale('id')
	
	export default {
		name: 'pemeriksaan_fisik',
		props: {
			is_validasi: {
				type: Boolean,
				required: true,
				default () {
					return false
				}
			},
			objectDataAssesmen: {
				type: Object,
				required: true,
				default () {
					return {}
				}
			},
			dataRegistrasi: {
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
				defaultValue: {
					pemeriksaan_kulit: {
            inspeksi: 'Normal : kulit tidak ada ikterik/pucat/sianosis',
            palpasi: 'Normal : lembab, turgor baik/elastic, tidak ada edema',
          },
          pemeriksaan_kuku: {
            inspeksi: 'Normal : bersih, bentuk normal tidak ada tanda-tanda jari tabuh (clubbing finger), tidak ikterik/sianosis',
            palpasi: 'Normal : aliran darah kuku akan kembali < 3 detik',
          },
          pemeriksaan_kepala: {
            inspeksi: 'Normal : simetris, bersih, tidak ada lesi, tidak menunjukkan tanda-tanda kekurangan gizi(rambut jagung dan kering)',
            palpasi: 'Normal : tidak ada penonjolan /pembengkakan, rambut lebat dan kuat/tidak rapuh',
          },
          pemeriksaan_wajah: {
            inspeksi: 'Normal : warna sama dengan bagian tubuh lain,  tidak pucat/ikterik, simetris',
            palpasi: 'Normal : tidak ada nyeri tekan dan edema',
          },
          pemeriksaan_mata: {
            inspeksi: 'Normal : simetris mata kika, simetris bola mata kika, warna konjungtiva pink, dan sclera berwarna putih',
          },
          pemeriksaan_telinga: {
            inspeksi: 'Normal : bentuk dan posisi simetris kika, integritas kulit bagus, warna sama dengan kulit lain, tidak ada tanda-tanda infeksi, dan alat bantu dengar',
            palpasi: 'Normal : tidak ada nyeri tekan',
          },
          pemeriksaan_hidung_dan_sinus: {
            inspeksi: 'Normal : simetris kika, warna sama dengan warna kulit lain, tidak ada lesi, tidak ada sumbatan, perdarahan dan tanda-tanda infeksi',
            palpasi: 'Normal : tidak ada bengkak dan nyeri tekan',
          },
          pemeriksaan_mulut_dan_bibir: {
            inspeksi: 'Normal : warna mukosa mulut dan bibir pink, lembab, tidak ada lesi dan stomatitis ',
            palpasi: 'Normal : gigi lengkap, tidak ada tanda-tanda gigi berlobang atau kerusakan gigi, tidak ada perdarahan atau radang gusi, lidah simetris, warna pink, langit2 utuh dan tidak ada tanda infeksi',
          },
          pemeriksaan_leher: {
            inspeksi: 'Normal : warna sama dengan kulit lain, integritas kulit baik, bentuk simetris, tidak ada pembesaran kelenjer gondok',
            inspeksi_aukultasi: 'Normal : arteri karotis terdengar',
            inspeksi_palpas: 'Normal : tidak teraba pembesaran kel.gondok, tidak ada nyeri, tidak ada  pembesaran kel.limfe, tidak ada nyeri',
            akultulasi: 'Normal',
          },
          pemeriksaan_dada_dan_punggung: {
            inspeksi: 'Normal : simetris, bentuk dan postur normal, tidak ada tanda-tanda distress pernapasan, warna kulit sama dengan warna kulit lain, tidak ikterik/sianosis, tidak ada pembengkakan/penonjolan/edema',
            palpasi: 'Normal : integritas kulit baik, tidak ada nyeri tekan/massa/tanda-tanda peradangan, ekspansi simetris, taktil vremitus cendrung sebelah kanan lebih teraba jelas',
            perkusi: 'Normal : resonan (“dug dug dug”), jika bagian padat lebih daripada bagian udara = pekak (“bleg bleg bleg”), jika bagian udara lebih besar dari bagian padat=hiperesonan (“deng deng deng”), batas jantung=bunyi rensonan----hilang>>redup',
            auskultasi: 'Normal : bunyi napas vesikuler, bronchovesikuler, brochial, tracheal ',
          },
          pemeriksaan_kardiovaskuler: {
            inspeksi: 'Normal : denyutan aorta teraba',
            palpasi: 'Normal : denyutan aorta teraba',
            perkusi: 'Normal : batas jantung, tidak lebih dari 4,7,10 cm ke arah kiri dari garis mid sterna, pada RIC 4,5,dan 8',
            auskultasi: 'Normal : terdengar bunyi jantung I/S1 (lub) dan bunyi jantung II/S2 (dub), tidak ada bunyi jantung tambahan (S3 atau S4)',
          },
          pemeriksaan_dada_dan_aksila: {
            inspeksi: 'Normal',
            palpasi: 'Normal',
            inspeksi_palpasi: 'Normal',
          },
          pemeriksaan_abdomen_perut: {
            inspeksi: 'Normal : simetris kika, warna dengan warna kulit lain, tidak ikterik tidak terdapat ostomy, distensi, tonjolan, pelebaran vena, kelainan umbilicus',
            auskultasi: 'Normal :  suara peristaltic terdengar setiap 5-20x/dtk, terdengar denyutan arteri renalis, arteri iliaka dan aorta',
            perkusi_semua_kuadran: 'Normal',
            perkusi_hepar: 'Normal',
            perkusi_limfa: 'Normal',
            perkusi_ginjal: 'Normal',
            palpasi_semua_kuadran: 'Normal : tidak teraba penonjolan tidak ada nyeri tekan, tidak ada massa dan penumpukan cairan',
          },
          pemeriksaan_ekstermitas_atas: {
            inspeksi: 'Normal : simetris kika, integritas kulit baik, ROM aktif, kekuatan otot penuh',
            palpasi: 'Normal : teraba jelas',
            tes_reflex: 'Normal : reflek bisep dan trisep positif',
          },
          pemeriksaan_ekstermitas_bawah: {
            inspeksi: 'Normal : simetris kika, integritas kulit baik, ROM aktif, kekuatan otot penuh',
            palpasi: 'Normal : teraba jelas',
            tes_reflex: 'Normal : reflex patella dan archiles positif',
              },
          pemeriksaan_genitalia_pria: {
            inspeksi: 'Normal : integritas kulit baik, tidak ada masa atau pembengkakan, tidak ada pengeluaran pus atau darah',
            inspeksi_palpasi: 'Normal ',
            pemeriksaan_anus_rectum: 'Normal :  tidak ada nyeri , tidak terdapat edema / hemoroid / polip/ tanda-tanda infeksi dan pendarahan',
          },
          pemeriksaan_genitalia_wanita: {
            inspeksi: 'Normal : bersih, mukosa lembab, integritas kulit baik, semetris tidak ada edema dan tanda-tanda infeksi (pengeluaran pus /bau)',
            inspeksi_vagina_servik: 'Normal ',
            inspeksi_vagina_uterus_ovarium: 'Normal ',
            pemeriksaan_anus_rectum: 'Normal : tidak ada nyeri, tidak terdapat edema / hemoroid / polip/ tanda-tanda infeksi dan pendarahan',
          },
				}
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
			// INIT DEFAULT VALUE
			console.log('start init value multiorgan')
			for (const lv1 of Object.keys(this.defaultValue)) {
				for (const lv2 of Object.keys(this.defaultValue[lv1])) {
					if (!this.mData[lv1][lv2]) this.mData[lv1][lv2] = this.defaultValue[lv1][lv2]
				}
			}
			console.log('end init value multiorgan')
		},
		methods: {
			onSubmitEvaluasi () {
				this.$emit('submit', { key: 'subjective', data: this.mData })
			}
		}
	}
</script>
<template>
  <div class="card card-custom">
    <!-- <pre>{{objectPenjualan}}</pre> -->
    <div class="card-body p-4">
      <div class="accordion accordion-solid accordion-toggle-plus">
        <!-- PROSEDUR -------------------------------------------------------------------------- -->
        <div class="card">
          <div class="card-header" @click="accordionActive = accordionActive === 'procedure' ? '' : 'procedure'">
            <div class="card-title" :class="{ collapsed: accordionActive !== 'procedure' }">Prosedur</div>
          </div>
          <div class="collapse" :class="{ show: accordionActive === 'procedure' }">
            <div class="card-body">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmitEvaluasiProcedure)" autocomplete="off">
                  <div class="row">
                    <div class="col-4">
                      <s-input
                        v-model="fProcedure.tipe_procedure"
                        :key="'tipe_procedure'"
                        :id="'tipe_procedure'"
                        :item="{
                          label: 'Tipe Procedure',
                          id: 'tipe_procedure',
                          data: 'tipe_procedure',
                          type: 'lookup-radio',
                          validation: ['required'],
                          value: fProcedure.tipe_procedure,
                          pointer: {
                            label: 'label',
                            code: 'code',
                            display: ['label'],
                            list: [
                              { label: 'ICD', code: 'ICD' },
                              { label: 'Non ICD', code: 'Non ICD' },
                            ],
                          },
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fProcedure.tipe_procedure" />
                    </div>
                    <div class="col-4">
                      <s-input
                        v-model="fProcedure.tindakan"
                        :key="'tindakan'"
                        :id="'tindakan'"
                        :item="{
                          label: 'Tindakan',
                          id: 'tindakan',
                          data: 'tindakan',
                          type: 'lookup-radio',
                          validation: ['required'],
                          value: fProcedure.tindakan,
                          api: 'msJasa',
                          return_object: true,
                          pointer: {
                            label: 'nama_jasa',
                            code: 'ms_jasa_id',
                            display: ['nama_jasa'],
                          },
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fProcedure.tindakan" />
                    </div>
                    <div class="col-4">
                      <s-input
                        v-model="fProcedure.qty"
                        :key="'qty'"
                        :id="'qty'"
                        :item="{
                          label: 'Quantity',
                          id: 'qty',
                          data: 'qty',
                          type: 'number',
                          validation: ['required'],
                          value: fProcedure.qty,
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fProcedure.qty" />
                    </div>

                    <div class="col-6" v-if="fProcedure.tipe_procedure === 'ICD'">
                      <s-input
                        v-model="fProcedure.procedure"
                        :key="'procedure'"
                        :id="'procedure'"
                        :item="{
                          label: 'Procedure',
                          id: 'procedure',
                          data: 'procedure',
                          type: 'lookup-radio',
                          validation: fProcedure.tipe_procedure === 'ICD' ? ['required'] : [],
                          value: fProcedure.procedure,
                          return_object: true,
                          api: 'msProsedur',
                          pointer: {
                            label: 'nama_prosedur',
                            code: 'id',
                            display: ['kode_prosedur', 'nama_prosedur'],
                          },
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fProcedure.procedure_medis" />
                    </div>
                    <div class="col-6" v-else>
                      <s-input
                        v-model="fProcedure.procedure"
                        :key="'procedure'"
                        :id="'procedure'"
                        :item="{
                          label: 'Procedure',
                          id: 'procedure',
                          data: 'procedure',
                          type: 'text',
                          validation: fProcedure.tipe_procedure === 'Non ICD' ? ['required'] : [],
                          value: fProcedure.procedure,
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fProcedure.procedure" />
                    </div>
                    <!-- <div class="col-6">
                        <s-input v-model="fProcedure.procedure" :key="'procedure'" :id="'procedure'" :item="{
                          label: 'Procedure',
                          id: 'procedure',
                          data: 'procedure',
                          type: 'text',
                          validation: ['required'],
                          value: fProcedure.procedure,
                          param: {},
                        }" :disabled="objectDataAssesmen.is_validasi" :valuee="fProcedure.procedure" />
                      </div> -->
                    <div class="col-6">
                      <s-input
                        v-model="fProcedure.keterangan"
                        :key="'keterangan'"
                        :id="'keterangan'"
                        :item="{
                          label: 'Keterangan',
                          id: 'keterangan',
                          data: 'keterangan',
                          type: 'text',
                          validation: ['required'],
                          value: fProcedure.keterangan,
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fProcedure.keterangan" />
                    </div>
                    <div class="col-12 align-self-center">
                      <button type="reset" class="btn btn-light-danger mr-3">
                        <i class="ri-loop-right-fill"></i>
                        Reset
                      </button>
                      <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                        <i class="ri-save-line"></i>
                        {{ $t("global.submit") }}
                      </button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
              <div class="row">
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tipe Prosedur</th>
                          <th>Prosedur</th>
                          <th>Tindakan</th>
                          <th>Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) in mData.prosedur" :key="'table-prosedur' + i">
                          <td>
                            <a href="#" @click="onDelete(i, 'prosedur')" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ disabled: objectDataAssesmen.is_validasi }">
                              <i class="ri-delete-bin-line"></i>
                            </a>
                          </td>
                          <td>{{ item.tipe_procedure || "-" }}</td>
                          <!-- <td>{{ item.procedure || '-'  }}</td> -->
                          <td>
                            {{ typeof item.procedure == "object" ? (item.procedure && item.procedure.nama_prosedur ? `${item.procedure.kode_prosedur} - ${item.procedure.nama_prosedur}` : "-") : item.procedure }}
                          </td>
                          <td>{{ item.tindakan && item.tindakan.nama_jasa ? item.tindakan.nama_jasa : "-" }} (x{{ item.qty || 1 }})</td>
                          <td>{{ item.keterangan || "-" }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- OBAT -------------------------------------------------------------------------- -->
        <div class="card">
          <div class="card-header" @click="accordionActive = accordionActive === 'obat' ? '' : 'obat'">
            <div class="card-title" :class="{ collapsed: accordionActive !== 'obat' }">Obat</div>
          </div>
          <div class="collapse" :class="{ show: accordionActive === 'obat' }">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <ul class="nav nav-tabs nav-tabs-line mb-5">
                    <li class="nav-item">
                      <a class="nav-link pointer" @click="switchTab('obat_jadi')" :class="{ active: tabActive === 'obat_jadi' }">
                        <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                        <span class="nav-text">Obat Jadi</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link pointer" @click="switchTab('obat_racikan')" :class="{ active: tabActive === 'obat_racikan' }">
                        <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                        <span class="nav-text">Obat Racikan</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- FORM -->
              <!-- OBAT JADI ------------------------------------------------------------------------------------------- -->
              <ValidationObserver v-slot="{ handleSubmit }" v-if="tabActive === 'obat_jadi'">
                <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitEvaluasiObat)" autocomplete="off">
                  <div class="row">
                    <div class="col-12">
                      <div class="row">
                        <!-- <div class="col-6">
                              <s-input v-model="fData.tipe" :key="'tipe'" :id="'tipe'" :item="{
                                label: 'Tipe',
                                id: 'tipe',
                                data: 'tipe',
                                type: 'lookup-radio',
                                validation: ['required'],
                                value: fData.tipe,
                                pointer: {
                                  label: 'label',
                                  code: 'code',
                                  display: ['label'],
                                  list: [
                                    { label: 'Kandungan', code: 'Kandungan' },
                                    { label: 'Obat', code: 'Obat' },
                                  ]
                                },
                                param: {},
                              }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.tipe" />
                            </div>
                            <div class="col-12">
                              <s-input v-model="fData.jenis_obat" :key="'jenis_obat'" :id="'jenis_obat'" :item="{
                                label: 'Jenis Obat',
                                id: 'jenis_obat',
                                data: 'jenis_obat',
                                type: 'text',
                                validation: ['required'],
                                value: fData.jenis_obat,
                                param: {},
                              }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.jenis_obat || 'Obat Jadi'" />
                            </div> -->
                        <div class="col-12">
                          <s-input
                            v-model="fData.nama_obat"
                            :key="'nama_obat'"
                            :id="'nama_obat'"
                            :item="{
                              label: 'Obat',
                              id: 'nama_obat',
                              data: 'nama_obat',
                              type: 'lookup-radio',
                              validation: ['required'],
                              value: fData.nama_obat,
                              api: 'msBarang',
                              return_object: true,
                              pointer: {
                                label: 'nama_barang',
                                code: 'ms_barang_id',
                                display: ['nama_barang'],
                              },
                              param: {
                                type: 'OBAT',
                              },
                            }"
                            :disabled="objectDataAssesmen.is_validasi"
                            :valuee="fData.nama_obat" />
                        </div>
                        <!-- <div class="col-12">
                              <s-input v-model="fData.nama_obat" :key="'nama_obat'" :id="'nama_obat'" :item="{
                                label: 'Obat',
                                id: 'nama_obat',
                                data: 'nama_obat',
                                type: 'text',
                                validation: ['required'],
                                value: fData.nama_obat,
                                param: {},
                              }" :disabled="objectDataAssesmen.is_validasi" :valuee="fData.nama_obat" />
                            </div> -->
                        <div class="col-12">
                          <div class="row">
                            <div class="col-6">
                              <div class="row">
                                <div class="col-12">
                                  <s-input
                                    v-model="fData.jumlah"
                                    :key="'jumlah'"
                                    :id="'jumlah'"
                                    :item="{
                                      label: 'Jumlah',
                                      id: 'jumlah',
                                      data: 'jumlah',
                                      hint: '',
                                      type: 'number',
                                      validation: ['required'],
                                      value: fData.jumlah,
                                      param: {},
                                    }"
                                    :disabled="objectDataAssesmen.is_validasi"
                                    :valuee="fData.jumlah" />
                                </div>
                                <div class="col-12">
                                  <s-input
                                    v-model="fData.signa"
                                    :key="'signa'"
                                    :id="'signa'"
                                    :item="{
                                      label: 'Signa',
                                      id: 'signa',
                                      data: 'signa',
                                      hint: '',
                                      type: 'text',
                                      validation: ['required'],
                                      value: fData.signa,
                                      param: {},
                                    }"
                                    :disabled="objectDataAssesmen.is_validasi"
                                    :valuee="fData.signa" />
                                </div>
                                <div class="col-6 d-flex gap-6">
                                  <s-input
                                    v-model="fData.aturan_pakai"
                                    :key="'aturan_pakai'"
                                    :id="'aturan_pakai'"
                                    :item="{
                                      label: 'Aturan Pakai',
                                      id: 'aturan_pakai',
                                      data: 'aturan_pakai',
                                      type: 'lookup-radio',
                                      validation: ['required'],
                                      value: fData.aturan_pakai,
                                      api: 'msAturanPakai',
                                      return_object: false,
                                      pointer: {
                                        label: 'name',
                                        code: 'name',
                                        display: ['name'],
                                      },
                                      param: {
                                        type: 'OBAT',
                                      },
                                    }"
                                    :disabled="objectDataAssesmen.is_validasi"
                                    :valuee="fData.aturan_pakai" />
                                  <div>
                                    <label for="asda">&ensp;</label>
                                    <ms-aturan-pakai />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="row">
                                <div class="col-12">
                                  <s-input
                                    v-model="fData.satuan_jual"
                                    :key="'satuan_jual'"
                                    :id="'satuan_jual'"
                                    :item="{
                                      label: 'Satuan Jual',
                                      id: 'satuan_jual',
                                      data: 'satuan_jual',
                                      type: 'lookup-radio',
                                      validation: ['required'],
                                      value: fData.satuan_jual,
                                      api: 'msSatuanBarang',
                                      pointer: {
                                        label: 'nama_satuan',
                                        code: 'nama_satuan',
                                        display: ['nama_satuan'],
                                      },
                                      param: {},
                                    }"
                                    :disabled="objectDataAssesmen.is_validasi"
                                    :valuee="fData.satuan_jual" />
                                </div>
                                <div class="col-12">
                                  <s-input
                                    v-model="fData.satuan_pakai"
                                    :key="'satuan_pakai'"
                                    :id="'satuan_pakai'"
                                    :item="{
                                      label: 'Satuan Pakai',
                                      id: 'satuan_pakai',
                                      data: 'satuan_pakai',
                                      type: 'lookup-radio',
                                      validation: ['required'],
                                      value: fData.satuan_pakai,
                                      api: 'msSatuanBarang',
                                      pointer: {
                                        label: 'nama_satuan',
                                        code: 'nama_satuan',
                                        display: ['nama_satuan'],
                                      },
                                      param: {},
                                    }"
                                    :disabled="objectDataAssesmen.is_validasi"
                                    :valuee="fData.satuan_pakai" />
                                </div>
                                <div class="col-12">
                                  <s-input
                                    v-model="fData.signa_manual"
                                    :key="'signa_manual'"
                                    :id="'signa_manual'"
                                    :item="{
                                      label: 'Signa Manual',
                                      id: 'signa_manual',
                                      data: 'signa_manual',
                                      hint: '',
                                      type: 'text',
                                      validation: ['required'],
                                      value: fData.signa_manual,
                                      param: {},
                                    }"
                                    :disabled="objectDataAssesmen.is_validasi"
                                    :valuee="fData.signa_manual" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-12 align-self-center">
                          <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                            <i class="ri-loop-right-fill"></i>
                            Reset
                          </button>
                          <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                            <i class="ri-save-line"></i>
                            {{ $t("global.submit") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </ValidationObserver>

              <!-- OBAT RACIKAN ---------------------------------------------------------------------------------------- -->
              <ValidationObserver v-slot="{ handleSubmit }" v-if="tabActive === 'obat_racikan'">
                <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitEvaluasiObatRacik)" autocomplete="off">
                  <div class="row">
                    <div class="col-12">
                      <div class="row">
                        <div class="col-12">
                          <s-input
                            v-model="fDataObatRacik.nama_obat"
                            :key="'nama_obat'"
                            :id="'nama_obat'"
                            :item="{
                              label: 'Nama Obat',
                              id: 'nama_obat',
                              data: 'nama_obat',
                              type: 'text',
                              validation: ['required'],
                              value: fDataObatRacik.nama_obat,
                              param: {},
                            }"
                            :disabled="objectDataAssesmen.is_validasi"
                            :valuee="fDataObatRacik.nama_obat" />
                        </div>
                        <div class="col-6">
                          <s-input
                            v-model="fDataObatRacik.signa"
                            :key="'signa'"
                            :id="'signa'"
                            :item="{
                              label: 'Signa',
                              id: 'signa',
                              data: 'signa',
                              hint: '',
                              type: 'text',
                              validation: ['required'],
                              value: fDataObatRacik.signa,
                              param: {},
                            }"
                            :disabled="objectDataAssesmen.is_validasi"
                            :valuee="fDataObatRacik.signa" />
                        </div>
                        <div class="col-6">
                          <s-input
                            v-model="fDataObatRacik.jumlah"
                            :key="'jumlah'"
                            :id="'jumlah'"
                            :item="{
                              label: 'Jumlah',
                              id: 'jumlah',
                              data: 'jumlah',
                              hint: '',
                              type: 'number',
                              validation: ['required'],
                              value: fDataObatRacik.jumlah,
                              param: {},
                            }"
                            :disabled="objectDataAssesmen.is_validasi"
                            :valuee="fDataObatRacik.jumlah" />
                        </div>
                        <div class="col-6">
                          <s-input
                            v-model="fDataObatRacik.aturan_pakai"
                            :key="'aturan_pakai'"
                            :id="'aturan_pakai'"
                            :item="{
                              label: 'Aturan Pakai',
                              id: 'aturan_pakai',
                              data: 'aturan_pakai',
                              type: 'lookup-radio',
                              validation: ['required'],
                              value: fDataObatRacik.aturan_pakai,
                              pointer: {
                                label: 'label',
                                code: 'code',
                                display: ['label'],
                                list: [
                                  { label: 'Tablet Sesudah Makan', code: 'Tablet Sesudah Makan' },
                                  { label: 'Tablet Sebelum Makan', code: 'Tablet Sebelum Makan' },
                                ],
                              },
                              param: {},
                            }"
                            :disabled="objectDataAssesmen.is_validasi"
                            :valuee="fDataObatRacik.aturan_pakai" />
                        </div>
                        <div class="col-6">
                          <!-- <s-input v-model="fDataObatRacik.nama_satuan" :key="'nama_satuan'" :id="'nama_satuan'" :item="{
                              label: 'Nama Satuan',
                              id: 'nama_satuan',
                              data: 'nama_satuan',
                              hint: '',
                              type: 'text',
                              validation: ['required'],
                              value: fDataObatRacik.nama_satuan,
                              param: {},
                            }" :disabled="objectDataAssesmen.is_validasi" :valuee="fDataObatRacik.nama_satuan" /> -->
                          <s-input
                            v-model="fDataObatRacik.nama_satuan"
                            :key="'nama_satuan'"
                            :id="'nama_satuan'"
                            :item="{
                              label: 'Jenis Racikan',
                              id: 'nama_satuan',
                              data: 'nama_satuan',
                              hint: '',
                              type: 'lookup-radio',
                              validation: ['required'],
                              value: fDataObatRacik.nama_satuan,
                              pointer: {
                                label: 'label',
                                code: 'code',
                                display: ['label'],
                                list: [
                                  { label: 'Puyer', code: 'Puyer' },
                                  { label: 'Salep', code: 'Salep' },
                                  { label: 'Kapsul', code: 'Kapsul' },
                                  { label: 'Sirup', code: 'Sirup' },
                                  { label: 'Tetes', code: 'Tetes' },
                                  { label: 'Lainnya', code: 'Lainnya' },
                                ],
                              },
                              param: {},
                            }"
                            :disabled="objectDataAssesmen.is_validasi"
                            :valuee="fDataObatRacik.nama_satuan" />
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <div class="checkbox-list">
                              <label class="checkbox">
                                <input type="checkbox" v-model="fDataObatRacik.kronis" name="kronis" />
                                <span></span>
                                Obat Kronis?
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="card">
                            <div class="card-header">
                              <h5>- Racikan Obat</h5>
                            </div>
                            <div class="card-body">
                              <medis-planning-obat-racik :obat_jadi="fDataObatRacik.obat_jadi"></medis-planning-obat-racik>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 align-self-center mt-3">
                          <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                            <i class="ri-loop-right-fill"></i>
                            Reset
                          </button>
                          <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                            <i class="ri-save-line"></i>
                            {{ $t("global.submit") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
              <!-- TABLE -->
              <div class="row" v-if="tabActive === 'obat_jadi'">
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <!-- <th>Tipe</th>
                            <th>Jenis Obat</th> -->
                          <th>Obat</th>
                          <th>Jumlah</th>
                          <th>Signa</th>
                          <th>Aturan Pakai</th>
                          <th>Satuan</th>
                          <th>Satuan Pakai</th>
                          <th>Signa Manual</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) in mData[tabActive]" :key="'table' + tabActive + i">
                          <td>
                            <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ disabled: objectDataAssesmen.is_validasi }">
                              <i class="ri-delete-bin-line"></i>
                            </a>
                          </td>
                          <!-- <td>{{ item.tipe || '-'  }}</td>
                            <td>{{ item.jenis_obat || '-'  }}</td> -->
                          <td>{{ item.nama_obat && item.nama_obat.nama_barang ? item.nama_obat.nama_barang : "-" }}</td>
                          <td>{{ item.jumlah || "-" }}</td>
                          <td>{{ item.signa || "-" }}</td>
                          <td>{{ item.aturan_pakai || "-" }}</td>
                          <td>{{ item.satuan_jual || "-" }}</td>
                          <td>{{ item.satuan_pakai || "-" }}</td>
                          <td>{{ item.signa_manual || "-" }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="row" v-if="tabActive === 'obat_racikan'">
                <div class="col-12">
                  <hr />
                  <!-- <pre>{{ mData[tabActive][0] }}</pre> -->
                </div>
                <div class="col-12">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <!-- <th>Jenis Obat</th> -->
                          <th>Obat</th>
                          <th>Jumlah</th>
                          <th>Signa</th>
                          <th>Aturan Pakai</th>
                          <th>Satuan</th>
                          <th>Obat Jadi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) in mData[tabActive]" :key="'table' + tabActive + i">
                          <td>
                            <a href="#" @click="selectObatRacik(i)" class="btn btn-sm btn-light-primary font-weight-bold mr-2" :class="{ disabled: objectDataAssesmen.is_validasi }">
                              <i class="ri-pencil-line"></i>
                            </a>
                            <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2" :class="{ disabled: objectDataAssesmen.is_validasi }">
                              <i class="ri-delete-bin-line"></i>
                            </a>
                          </td>
                          <!-- <td>{{ item.jenis_obat || '-'  }}</td> -->
                          <td>{{ item.nama_obat }}</td>
                          <td>{{ item.jumlah || "-" }}</td>
                          <td>{{ item.signa || "-" }}</td>
                          <td>{{ item.aturan_pakai || "-" }}</td>
                          <td>{{ item.nama_satuan || "-" }}</td>
                          <td>
                            <ul>
                              <li v-for="a in item.obat_jadi" :key="'obat_jadiii' + a.id">
                                <pre>{{ a.nama_obat && a.nama_obat.nama_barang ? a.nama_obat.nama_barang : "-" }} (x{{ a.jumlah }}) (Dosis: {{ a.dosis || "-" }}, {{ a.sebelum_jumlah_dosis || "-" }} -> {{ a.setelah_jumlah_dosis || "-" }})</pre>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fisioterapi -------------------------------------------------------------------------- -->
        <div class="card">
          <div class="card-header" @click="accordionActive = accordionActive === 'fisioterapi' ? '' : 'fisioterapi'">
            <div class="card-title" :class="{ collapsed: accordionActive !== 'fisioterapi' }">Fisioterapi</div>
          </div>
          <div class="collapse" :class="{ show: accordionActive === 'fisioterapi' }">
            <div class="card-body">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmitFisioterapi)" autocomplete="off">
                  <div class="row">
                    <div class="col-12">
                      <s-input
                        v-model="fFisioterapi.tanggal"
                        :item="{
                          label: 'Tanggal',
                          id: 'tanggal',
                          data: 'tanggal',
                          type: 'datetime',
                          validation: ['required'],
                          value: fFisioterapi.tanggal,
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fFisioterapi.tanggal" />
                    </div>

                    <div class="col-6">
                      <s-input
                        v-model="fFisioterapi.intervensi"
                        :item="{
                          label: 'Intervensi',
                          id: 'intervensi',
                          data: 'intervensi',
                          type: 'textarea',
                          validation: ['required'],
                          value: fFisioterapi.intervensi,
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fFisioterapi.intervensi" />
                    </div>

                    <div class="col-6">
                      <s-input
                        v-model="fFisioterapi.area_terapi"
                        :item="{
                          label: 'Tempat / Area yang diterapi',
                          id: 'area_terapi',
                          data: 'area_terapi',
                          type: 'textarea',
                          validation: ['required'],
                          value: fFisioterapi.area_terapi,
                          param: {},
                        }"
                        :disabled="objectDataAssesmen.is_validasi"
                        :valuee="fFisioterapi.area_terapi" />
                    </div>

                    <div class="col-12 align-self-center">
                      <button type="reset" class="btn btn-light-danger mr-3">
                        <i class="ri-loop-right-fill"></i>
                        Reset
                      </button>
                      <button type="submit" class="btn btn-light-primary mr-3" :disabled="is_validasi">
                        <i class="ri-save-line"></i>
                        {{ $t("global.submit") }}
                      </button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>

              <div class="row mt-5">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tanggal</th>
                        <th>Intervensi</th>
                        <th>Tempat / Area yang diterapi</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-if="mData.fisioterapi && mData.fisioterapi.length" v-for="(data, index) in mData.fisioterapi" :key="index + 'fisioterapi'">
                        <td>
                          <button class="btn btn-danger btn-icon" @click="onDelete(index, 'fisioterapi')">
                            <i class="ri-delete-bin-line"></i>
                          </button>
                        </td>
                        <td>{{ data.tanggal | parse("longDateTime") }}</td>
                        <td>{{ data.intervensi || "-" }}</td>
                        <td>{{ data.area_terapi || "-" }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col-12">
                  <s-input
                    v-model="mData.evaluasi_fisioterapi"
                    :item="{
                      label: 'Evaluasi',
                      id: 'evaluasi_fisioterapi',
                      data: 'evaluasi_fisioterapi',
                      type: 'textarea',
                      validation: ['required'],
                      value: mData.evaluasi_fisioterapi,
                      param: {},
                    }"
                    :disabled="objectDataAssesmen.is_validasi"
                    :valuee="mData.evaluasi_fisioterapi" />
                </div>

                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-light-primary mr-3 w-100"
                    :disabled="is_validasi"
                    @click="
                      $emit('submit', { key: 'planning', open_tab: 'planning', data: mData, silent: true });
                      $_alert.success('Berhasil meyimpan evaluasi');
                    ">
                    <i class="ri-save-line"></i>
                    {{ $t("global.submit") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MedisPlanningObatRacik from "./medis_planning_obat_racik.vue";
import MsAturanPakai from "../../../../../components/component/ms_aturan_pakai.vue";

import moment from "moment";
moment.locale("id");
export default {
  name: "medis_planning",
  components: { MedisPlanningObatRacik, MsAturanPakai },
  props: {
    is_validasi: {
      type: Boolean,
      required: true,
      default() {
        return false;
      },
    },
    objectDataAssesmen: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    objectPenjualan: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    dataRegistrasi: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    mData: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // mData: {}
      accordionActive: "procedure",
      // accordionActive: 'obat',
      tabActive: "obat_jadi",
      // tabActive: 'obat_jadi',
      fProcedure: {},
      fData: {
        // ini buat obat
      },

      fDataObatRacikIndex: "create",
      fDataObatRacik: {
        // ini buat obat racik
        kronis: false,
        obat_jadi: [],
      },

      enableSubmitProcedure: false,
      harga: {},

      fFisioterapi: {}, // ini buat fisioterapi
    };
  },
  watch: {
    mData: {
      deep: true,
      immediate: false,
      handler(to, from) {
        this.handleData();
        // this.$emit('dataChange', true)
      },
    },
    "fData.nama_obat": {
      deep: true,
      immediate: false,
      handler(to, from) {
        console.log(this.fData.nama_obat);
        if (this.fData.nama_obat && this.fData.nama_obat.id) this.fData.nama_obat.id = this.fData.nama_obat.ms_barang_id;
        if (this.fData.nama_obat && this.fData.nama_obat.nama_satuan) this.fData.satuan_jual = this.fData.nama_obat.nama_satuan;
      },
    },
    "fProcedure.tindakan": {
      deep: true,
      immediate: false,
      handler(to, from) {
        console.log(to);
        if (!to) return;
        // CARI HARGA
        let param = {
          ms_tarif_id: this.objectPenjualan.ms_tarif_id,
          ms_harga_id: this.objectPenjualan.ms_harga_id,
          ms_jasa_id: to.ms_jasa_id,
        };

        this.$_api.post("msHargaJasa/list", param).then((res) => {
          console.log(res);
          if (res.length === 0) return;

          this.harga = res.data[0];
        });
      },
    },
    "fProcedure.tipe_procedure": {
      handler(to, from) {
        console.log(to);
        if (to !== from) {
          if (to === "ICD") this.fProcedure.procedure = {};
          else if (to === "Non ICD") this.fProcedure.procedure = "";
        }
      },
    },
  },
  mounted() {
    const accordion_storage = localStorage.getItem("medis_planning_accordion");
    const tab_active_storage = localStorage.getItem("medis_planning_accordion_tab_active");
    if (accordion_storage) {
      this.accordionActive = accordion_storage;
      localStorage.removeItem("accordion_storage");
    }

    if (tab_active_storage) {
      this.tabActive = tab_active_storage;
      localStorage.removeItem("tab_active_storage");
    }

    // this.accordionActive = 'obat'
  },
  methods: {
    selectObatRacik(index) {
      this.fDataObatRacikIndex = index;
      this.fDataObatRacik = this.mData[this.tabActive][index];
    },
    resetForm() {
      // this.fData = {}
      // this.$refs.assesmenForm.reset();
    },
    handleData() {
      if (!this.mData.obat_jadi) this.mData.obat_jadi = [];
      if (!this.mData.obat_racikan) this.mData.obat_racikan = [];
    },
    switchTab(key) {
      this.tabActive = key;

      if (key === "obat_jadi") {
        this.fData.jenis_obat = "Obat Jadi";
      } else if (key === "obat_racikan") {
        this.fDataObatRacikIndex = null;
        this.fDataObatRacik.jenis_obat = "Obat Racikan";
        this.fDataObatRacik.kronis = false;
        this.fDataObatRacik.obat_jadi = [];
      }
    },
    onDelete(index, keyData = "") {
      this.$_alert.confirm("Hapus data", "apakah anda yakin ingin menghapus data?").then((status) => {
        if (status.isDismissed) return;
        else {
          localStorage.setItem("medis_planning_accordion", this.accordionActive);

          this.mData[keyData ? keyData : this.tabActive].splice(index, 1);
          this.$emit("submit", { key: "planning", open_tab: "planning", data: this.mData });
        }
      });
    },
    onSubmitEvaluasiObat() {
      console.log("onSubmitEvaluasiObat");
      this.fData.evaluasi_diagnosa = "Belum Teratasi";

      localStorage.setItem("medis_planning_accordion", "obat");
      localStorage.setItem("medis_planning_accordion_tab_active", "obat_jadi");

      this.mData[this.tabActive].push(this.fData);
      this.$router.push({ query: { tab: "planning", accordionActive: "obat" } });
      this.$emit("submit", { key: "planning", open_tab: "planning", data: this.mData });
      // this.$nextTick(() => {
      //   this.accordionActive = 'obat'
      // });
    },
    onSubmitEvaluasiObatRacik() {
      console.log("onSubmitEvaluasiObatRacik");

      localStorage.setItem("medis_planning_accordion", "obat");
      localStorage.setItem("medis_planning_accordion_tab_active", "obat_racikan");
      console.log(this.fDataObatRacikIndex);
      // return;

      if (this.fDataObatRacikIndex) {
        this.mData[this.tabActive][this.fDataObatRacikIndex] = this.fDataObatRacik;
        this.fDataObatRacikIndex = null;
      } else this.mData[this.tabActive].push(this.fDataObatRacik);

      this.$router.push({ query: { tab: "planning", accordionActive: "obat" } });
      this.$emit("submit", { key: "planning", open_tab: "planning", data: this.mData });
    },
    onSubmitEvaluasiProcedure() {
      console.log("onSUbmitEvaluasiProcedure", this.objectPenjualan);
      // return

      if (!this.harga.harga_jual) {
        this.$_alert.error({}, "Harga tidak ditemukan!");
        return;
      }
      if (!this.fProcedure.qty) {
        this.$_alert.error({}, "Quantity minimal 1!");
        return;
      }

      const harga_total_jasa = this.harga.harga_jual * this.fProcedure.qty;
      let paramPenjualanJasa = {
        qty_jasa: this.fProcedure.qty,
        harga_jasa: this.harga.harga_jual,
        harga_jasa_custom: this.harga.harga_jual,
        keterangan_penjualan_jasa: "Create by assesmen medis automation",
        status_penjualan_jasa: 1,
        penjualan_id: this.objectPenjualan.penjualan_id,
        ms_jasa_id: this.fProcedure.tindakan.ms_jasa_id,
        harga_total_jasa: harga_total_jasa,
        discount: 0,
        tax: harga_total_jasa * 0.12, // 12%
        total_penjualan: harga_total_jasa,
      };
      this.$_api
        .post("penjualanJasa/register", paramPenjualanJasa)
        .then((res) => {
          console.log("penjualanJasa", res);

          if (this.mData && !this.mData.prosedur) this.mData.prosedur = [];
          localStorage.setItem("medis_planning_accordion", "procedure");
          this.mData.prosedur.push(this.fProcedure);
          this.$emit("submit", { key: "planning", open_tab: "planning", data: this.mData });
        })
        .catch((err) => {
          this.$_alert(err);
          console.log(err);
        });
    },
    onSubmitFisioterapi() {
      if (this.mData && !this.mData.fisioterapi) this.mData.fisioterapi = [];
      localStorage.setItem("medis_planning_accordion", "fisioterapi");
      this.mData.fisioterapi.push(this.fFisioterapi);
      this.$emit("submit", { key: "planning", open_tab: "planning", data: this.mData });
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>

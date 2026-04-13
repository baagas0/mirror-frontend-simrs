<template>
  <div class="card card-custom mb-5">
    <div class="card-body p-4">
      <div class="accordion accordion-solid accordion-toggle-plus">
        <!-- PROSEDUR -------------------------------------------------------------------------- -->
        <div class="card">
          <div class="card-header" @click="accordionActive = accordionActive === 'procedure' ? '' : 'procedure'">
            <div class="card-title" :class="{ collapsed: accordionActive !== 'procedure' }">Prosedur Yang Sudah Dilakukan</div>
          </div>
          <div class="collapse" :class="{ show: accordionActive === 'procedure' }">
            <!-- <pre>{{ mData.prosedur_yang_sudah_dilakukan }}</pre> -->
            <div class="card-body">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmitEvaluasiProcedure)" autocomplete="off">
                  <div class="row">
                    <div class="col-6">
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
                        :valuee="fProcedure.tipe_procedure" />
                    </div>
                    <div class="col-6">
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
                          api: 'msJasa/listPerhalamanBypassUri',
                          return_object: true,
                          pointer: {
                            label: 'nama_jasa',
                            code: 'ms_jasa_id',
                            display: ['nama_jasa'],
                          },
                          param: {},
                        }"
                        :valuee="fProcedure.tindakan" />
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
                        }" :valuee="fProcedure.procedure" />
                      </div> -->
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
                            headerDisplay: ['Kode', 'Nama'],
                          },
                          param: {},
                        }"
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
                        :valuee="fProcedure.procedure" />
                    </div>

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
                        :valuee="fProcedure.keterangan" />
                    </div>
                    <div class="col-12 align-self-center">
                      <button type="reset" class="btn btn-light-danger mr-3">
                        <i class="ri-loop-right-fill"></i>
                        Reset
                      </button>
                      <button type="submit" class="btn btn-light-primary mr-3">
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
                        <tr v-for="(item, i) in mData.prosedur_yang_sudah_dilakukan" :key="'table-prosedur' + i">
                          <td>
                            <a href="#" @click="onDelete(i, 'prosedur_yang_sudah_dilakukan')" class="btn btn-sm btn-light-danger font-weight-bold mr-2">
                              <i class="ri-delete-bin-line"></i>
                            </a>
                          </td>
                          <td>{{ item.tipe_procedure || "-" }}</td>
                          <!-- <td>{{ item.procedure || '-'  }}</td> -->
                          <td>
                            {{ typeof item.procedure == "object" ? (item.procedure && item.procedure.nama_prosedur ? `${item.procedure.kode_prosedur} - ${item.procedure.nama_prosedur}` : "-") : item.procedure }}
                          </td>
                          <td>{{ item.tindakan && item.tindakan.nama_jasa ? item.tindakan.nama_jasa : "-" }}</td>
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
              <ValidationObserver v-slot="{ handleSubmit }" v-if="tabActive === 'obat_jadi'">
                <form ref="assesmenForm" @submit.prevent="handleSubmit(onSubmitEvaluasi)" autocomplete="off">
                  <div class="row">
                    <div class="col-12" v-if="tabActive === 'obat_jadi'">
                      <div class="row">
                        <div class="col-6">
                          <s-input
                            v-model="fData.tipe"
                            :key="'tipe'"
                            :id="'tipe'"
                            :item="{
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
                                ],
                              },
                              param: {},
                            }"
                            :valuee="fData.tipe" />
                        </div>
                        <div class="col-12">
                          <s-input
                            v-model="fData.jenis_obat"
                            :key="'jenis_obat'"
                            :id="'jenis_obat'"
                            :item="{
                              label: 'Jenis Obat',
                              id: 'jenis_obat',
                              data: 'jenis_obat',
                              type: 'text',
                              validation: ['required'],
                              value: fData.jenis_obat,
                              param: {},
                            }"
                            :valuee="fData.jenis_obat || 'Obat Jadi'" />
                        </div>
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
                            }" :valuee="fData.nama_obat" />
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
                                    :valuee="fData.signa" />
                                </div>
                                <!-- <div class="col-6">
                                    <s-input v-model="fData.aturan_pakai" :key="'aturan_pakai'" :id="'aturan_pakai'" :item="{
                                      label: 'Aturan Pakai',
                                      id: 'aturan_pakai',
                                      data: 'aturan_pakai',
                                      type: 'lookup-radio',
                                      validation: ['required'],
                                      value: fData.aturan_pakai,
                                      pointer: {
                                        label: 'label',
                                        code: 'code',
                                        display: ['label'],
                                        list: [
                                          { label: 'Tablet Sesudah Makan', code: 'Tablet Sesudah Makan' },
                                          { label: 'Tablet Sebelum Makan', code: 'Tablet Sebelum Makan' },
                                        ]
                                      },
                                      param: {},
                                    }" :valuee="fData.aturan_pakai" />
                                  </div> -->
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
                          <button type="submit" class="btn btn-light-primary mr-3">
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
                            }" :valuee="fDataObatRacik.nama_satuan" /> -->
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
                              <planning-obat-racik :obat_jadi="fDataObatRacik.obat_jadi"></planning-obat-racik>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 align-self-center mt-3">
                          <button type="reset" class="btn btn-light-danger mr-3" @click="resetForm()">
                            <i class="ri-loop-right-fill"></i>
                            Reset
                          </button>
                          <button type="submit" class="btn btn-light-primary mr-3">
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
                          <th>Tipe</th>
                          <th>Jenis Obat</th>
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
                            <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2">
                              <i class="ri-delete-bin-line"></i>
                            </a>
                          </td>
                          <td>{{ item.tipe || "-" }}</td>
                          <td>{{ item.jenis_obat || "-" }}</td>
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

              <!-- TABLE OBAT RACIKAN -->
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
                            <a href="#" @click="selectObatRacik(i)" class="btn btn-sm btn-light-primary font-weight-bold mr-2">
                              <i class="ri-pencil-line"></i>
                            </a>
                            <a href="#" @click="onDelete(i)" class="btn btn-sm btn-light-danger font-weight-bold mr-2">
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
      </div>
    </div>
  </div>
</template>

<script>
import PlanningObatRacik from "./planning_obat_racik.vue";
import moment from "moment";
moment.locale("id");

export default {
  name: "medis_planning",
  components: { PlanningObatRacik },
  props: {
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
      tabActive: "obat_jadi",
      fProcedure: {},
      fData: {},

      fDataObatRacikIndex: "create",
      fDataObatRacik: {
        // ini buat obat racik
        kronis: false,
        obat_jadi: [],
      },
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
        if (this.fData.nama_obat && this.fData.nama_obat.id) this.fData.nama_obat.id = this.fData.nama_obat.ms_barang_id;
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
  },
  methods: {
    selectObatRacik(index) {
      this.fDataObatRacikIndex = index;
      this.fDataObatRacik = this.mData[this.tabActive][index];
    },
    resetForm() {
      this.fData = {};
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
          this.mData[keyData ? keyData : this.tabActive].splice(index, 1);
          this.$emit("submit", { key: "planning", open_tab: "planning", data: this.mData });
        }
      });
    },
    onSubmitEvaluasi() {
      this.fData.evaluasi_diagnosa = "Belum Teratasi";

      localStorage.setItem("medis_planning_accordion", "obat");
      localStorage.setItem("medis_planning_accordion_tab_active", "obat_jadi");

      this.mData[this.tabActive].push(this.fData);
      this.$emit("submit", { key: "planning", open_tab: "planning", data: this.mData });
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
      if (this.mData && !this.mData.prosedur_yang_sudah_dilakukan) this.mData.prosedur_yang_sudah_dilakukan = [];
      this.mData.prosedur_yang_sudah_dilakukan.push(this.fProcedure);
      this.fProcedure = {};
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

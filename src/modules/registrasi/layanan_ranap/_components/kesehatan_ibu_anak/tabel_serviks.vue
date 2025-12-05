<template>
  <div>
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <h6>Kontraksi Uterus</h6>
    </b-col>
    <!-- <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <div style="display:flex;flex-wrap:wrap;overflow:scroll">
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
        <div style="width:30px;height:30px;border:1px solid black"></div>
      </div>
    </b-col> -->
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <b-table-simple bordered responsive class="table-uterus">
        <b-tbody>
          <b-tr v-for="(item, idx) in data_uterus" :key="idx">
            <b-td
              style="min-width:20px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">{{
                item.no }}</b-td>

            <b-td v-if="item.satu == null"></b-td>
            <b-td v-else-if="item.satu < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.satu <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.satu > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.dua == null"></b-td>
            <b-td v-else-if="item.dua < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.dua <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.dua > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.tiga == null"></b-td>
            <b-td v-else-if="item.tiga < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.tiga <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.tiga > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.empat == null"></b-td>
            <b-td v-else-if="item.empat < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.empat <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.empat > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.lima == null"></b-td>
            <b-td v-else-if="item.lima < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.lima <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.lima > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.enam == null"></b-td>
            <b-td v-else-if="item.enam < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.enam <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.enam > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.tujuh == null"></b-td>
            <b-td v-else-if="item.tujuh < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.tujuh <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.tujuh > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.delapan == null"></b-td>
            <b-td v-else-if="item.delapan < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.delapan <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.delapan > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.sembilan == null"></b-td>
            <b-td v-else-if="item.sembilan < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.sembilan <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.sembilan > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.sepuluh == null"></b-td>
            <b-td v-else-if="item.sepuluh < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.sepuluh <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.sepuluh > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.sebelas == null"></b-td>
            <b-td v-else-if="item.sebelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.sebelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.sebelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duabelas == null"></b-td>
            <b-td v-else-if="item.duabelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duabelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duabelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.tigabelas == null"></b-td>
            <b-td v-else-if="item.tigabelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.tigabelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.tigabelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.empatbelas == null"></b-td>
            <b-td v-else-if="item.empatbelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.empatbelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.empatbelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.limabelas == null"></b-td>
            <b-td v-else-if="item.limabelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.limabelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.limabelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.enambelas == null"></b-td>
            <b-td v-else-if="item.enambelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.enambelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.enambelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.tujuhbelas == null"></b-td>
            <b-td v-else-if="item.tujuhbelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.tujuhbelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.tujuhbelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.delapanbelas == null"></b-td>
            <b-td v-else-if="item.delapanbelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.delapanbelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.delapanbelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.sembilanbelas == null"></b-td>
            <b-td v-else-if="item.sembilanbelas < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.sembilanbelas <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.sembilanbelas > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duapuluh == null"></b-td>
            <b-td v-else-if="item.duapuluh < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duapuluh <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duapuluh > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duasatu == null"></b-td>
            <b-td v-else-if="item.duasatu < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duasatu <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duasatu > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duadua == null"></b-td>
            <b-td v-else-if="item.duadua < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duadua <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duadua > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duatiga == null"></b-td>
            <b-td v-else-if="item.duatiga < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duatiga <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duatiga > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duaempat == null"></b-td>
            <b-td v-else-if="item.duaempat < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duaempat <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duaempat > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.dualima == null"></b-td>
            <b-td v-else-if="item.dualima < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.dualima <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.dualima > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duaenam == null"></b-td>
            <b-td v-else-if="item.duaenam < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duaenam <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duaenam > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duatujuh == null"></b-td>
            <b-td v-else-if="item.duatujuh < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duatujuh <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duatujuh > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.dualapan == null"></b-td>
            <b-td v-else-if="item.dualapan < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.dualapan <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.dualapan > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.duasembilan == null"></b-td>
            <b-td v-else-if="item.duasembilan < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.duasembilan <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.duasembilan > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.tigapuluh == null"></b-td>
            <b-td v-else-if="item.tigapuluh < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.tigapuluh <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.tigapuluh > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td v-if="item.tigasatu == null"></b-td>
            <b-td v-else-if="item.tigasatu < 20" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td v-else-if="item.tigasatu <= 40" style="vertical-align:middle">
              <div
                style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;">
                </div>
                <div
                  style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto">
                </div>
              </div>
            </b-td>
            <b-td v-else-if="item.tigasatu > 40" style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>

            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr>
          <!-- <b-tr>
            <b-td style="min-width:20px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">4</b-td>
            <b-td style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:100%;"></div>
            </b-td>
            <b-td style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000"></div>
            </b-td>
            <b-td style="vertical-align:middle">
              <div style="width:20px;height:20px;background-color:#000;border-radius:5px;position:relative;overflow:hidden">
                     <div style="width:5px;height:50px;background-color:#fff;position:absolute;left:-7px; rotate: 45deg;bottom:0;top:0;margin:auto"></div>
                     <div style="width:5px;height:50px;background-color:#fff;position:absolute; rotate: 45deg;left:0;bottom:0;right:0;top:0;margin:auto;"></div>
                     <div style="width:5px;height:50px;background-color:#fff;position:absolute;right:-7px; rotate: 45deg;bottom:0;top:0;margin:auto"></div>
              </div>
            </b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr> -->
        </b-tbody>
      </b-table-simple>

      <div style="display:flex;justify-content:flex-start;align-items:center;height:20px;width:100%;">
        <div style="width:20px;height:20px;background-color:#000;"></div>
        <h6 style="margin:0 5px;">> 40</h6>
        <div style="width:20px;height:20px;background-color:#000;border-radius:7.5px;position:relative">
          <div
            style="width:5px;height:25px;background-color:#fff;position:absolute;left:0;right:0;margin:auto; rotate: 30deg;top:0;bottom:0;">
          </div>
        </div>
        <h6 style="margin:0 5px;">20 - 40</h6>
        <div style="width:20px;height:20px;background-color:#000;border-radius:100%"></div>
        <h6 style="margin:0 5px;">
          < 20</h6>
      </div>
    </b-col>

    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <hr>
    </b-col>
    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <b-table-simple bordered responsive class="table-serviks">
        <b-tbody>
          <b-tr v-for="(item, idx) in data_cairan" :key="idx">
            <b-td
              style="min-width:120px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">{{
                item.text }}</b-td>
            <b-td><b>{{ item.satu }}</b></b-td>
            <b-td><b>{{ item.dua }}</b></b-td>
            <b-td><b>{{ item.tiga }}</b></b-td>
            <b-td><b>{{ item.empat }}</b></b-td>
            <b-td><b>{{ item.lima }}</b></b-td>
            <b-td><b>{{ item.enam }}</b></b-td>
            <b-td><b>{{ item.tujuh }}</b></b-td>
            <b-td><b>{{ item.delapan }}</b></b-td>
            <b-td><b>{{ item.sembilan }}</b></b-td>
            <b-td><b>{{ item.sepuluh }}</b></b-td>
            <b-td><b>{{ item.sebelas }}</b></b-td>
            <b-td><b>{{ item.duabelas }}</b></b-td>
            <b-td><b>{{ item.tigabelas }}</b></b-td>
            <b-td><b>{{ item.empatbelas }}</b></b-td>
            <b-td><b>{{ item.limabelas }}</b></b-td>
            <b-td><b>{{ item.enambelas }}</b></b-td>
            <b-td><b>{{ item.tujuhelas }}</b></b-td>
            <b-td><b>{{ item.delapanbelas }}</b></b-td>
            <b-td><b>{{ item.sembilanbelas }}</b></b-td>
            <b-td><b>{{ item.duapuluh }}</b></b-td>
            <b-td><b>{{ item.duasatu }}</b></b-td>
            <b-td><b>{{ item.duadua }}</b></b-td>
            <b-td><b>{{ item.duatiga }}</b></b-td>
            <b-td><b>{{ item.duaempat }}</b></b-td>
            <b-td><b>{{ item.dualima }}</b></b-td>
            <b-td><b>{{ item.duaenam }}</b></b-td>
            <b-td><b>{{ item.duatujuh }}</b></b-td>
            <b-td><b>{{ item.dualapan }}</b></b-td>
            <b-td><b>{{ item.duasembilan }}</b></b-td>
            <b-td><b>{{ item.tigapuluh }}</b></b-td>
          </b-tr>

          <!-- <b-tr>
            <b-td style="border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">Tetes/menit</b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>

            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr> -->
        </b-tbody>
      </b-table-simple>
    </b-col>

    <b-col cols="12" sm="12" md="12" lg="12" xl="12">
      <b-table-simple bordered responsive style="margin-top:15px;" class="table-serviks">
        <b-tbody>
          <b-tr v-for="(item, idx) in data_obat" :key="idx">
            <b-td
              style="min-width:120px;border-top:hidden !important;border-bottom:hidden !important;border-left:hidden !important">{{
                item.text }}</b-td>
            <b-td><b>{{ item.satu }}</b></b-td>
            <b-td><b>{{ item.dua }}</b></b-td>
            <b-td><b>{{ item.tiga }}</b></b-td>
            <b-td><b>{{ item.empat }}</b></b-td>
            <b-td><b>{{ item.lima }}</b></b-td>
            <b-td><b>{{ item.enam }}</b></b-td>
            <b-td><b>{{ item.tujuh }}</b></b-td>
            <b-td><b>{{ item.delapan }}</b></b-td>
            <b-td><b>{{ item.sembilan }}</b></b-td>
            <b-td><b>{{ item.sepuluh }}</b></b-td>
            <b-td><b>{{ item.sebelas }}</b></b-td>
            <b-td><b>{{ item.duabelas }}</b></b-td>
            <b-td><b>{{ item.tigabelas }}</b></b-td>
            <b-td><b>{{ item.empatbelas }}</b></b-td>
            <b-td><b>{{ item.limabelas }}</b></b-td>
            <b-td><b>{{ item.enambelas }}</b></b-td>
            <b-td><b>{{ item.tujuhelas }}</b></b-td>
            <b-td><b>{{ item.delapanbelas }}</b></b-td>
            <b-td><b>{{ item.sembilanbelas }}</b></b-td>
            <b-td><b>{{ item.duapuluh }}</b></b-td>
            <b-td><b>{{ item.duasatu }}</b></b-td>
            <b-td><b>{{ item.duadua }}</b></b-td>
            <b-td><b>{{ item.duatiga }}</b></b-td>
            <b-td><b>{{ item.duaempat }}</b></b-td>
            <b-td><b>{{ item.dualima }}</b></b-td>
            <b-td><b>{{ item.duaenam }}</b></b-td>
            <b-td><b>{{ item.duatujuh }}</b></b-td>
            <b-td><b>{{ item.dualapan }}</b></b-td>
            <b-td><b>{{ item.duasembilan }}</b></b-td>
            <b-td><b>{{ item.tigapuluh }}</b></b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-col>
  </div>
</template>
  
<script>

export default {
  name: 'tabelserviks',
  components: {

  },
  data() {
    return {
      data_uterus: [
        { no: 5, satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null, tigasatu: null },
        { no: 4, satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null, tigasatu: null },
        { no: 3, satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null, tigasatu: null },
        { no: 2, satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null, tigasatu: null },
        { no: 1, satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null, tigasatu: null },
      ],
      data_cairan: [
        { text: 'Oksitosin', satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null },
        { text: 'Tetes/menit', satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null },
      ],
      data_obat: [
        { text: 'Obat dan Cairan IV', satu: null, dua: null, tiga: null, empat: null, lima: null, enam: null, tujuh: null, delapan: null, sembilan: null, sepuluh: null, sebelas: null, duabelas: null, tigabelas: null, empatbelas: null, limabelas: null, enambelas: null, tujuhbelas: null, delapanbelas: null, sembilanbelas: null, duapuluh: null, duasatu: null, duadua: null, duatiga: null, duaempat: null, dualima: null, duaenam: null, duatujuh: null, dualapan: null, duasembilan: null, tigapuluh: null },
      ],
    }
  },
  props: {
    patograf: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  computed: {
    // partograf_id() {
    //   return this.$store.state.partograf_id
    // },
    // reload() {
    //   return this.$store.state.reload_data
    // },
  },
  watch: {
    'patograf.cairan': {
      deep: true,
      handler() {
        this.getDataCairanObat()
      }
    },
    'patograf.obat': {
      deep: true,
      handler() {
        this.getDataCairanObat()
      }
    },
    'patograf.kontraksi_uterus': {
      deep: true,
      handler() {
        this.getDataUterus()
      }
    }
  },
  mounted() {
    this.getDataCairanObat()
    this.getDataUterus()
  },
  methods: {
    getDataCairanObat() {
      let vm = this
      let cairan = this.patograf.cairan
      let obat = this.patograf.obat
      for (let i = 0; i < cairan.length; i++) {
        let x = cairan[i];
        for (let j = 0; j < vm.data_cairan.length; j++) {
          let y = vm.data_cairan[j];
          if (i + 1 == 1) {
            if (y.text == "Oksitosin") {
              y.satu = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.satu = x.signa
            }
          } else if (i + 1 == 2) {
            if (y.text == "Oksitosin") {
              y.dua = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.dua = x.signa
            }
          } else if (i + 1 == 3) {
            if (y.text == "Oksitosin") {
              y.tiga = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.tiga = x.signa
            }
          } else if (i + 1 == 4) {
            if (y.text == "Oksitosin") {
              y.empat = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.empat = x.signa
            }
          } else if (i + 1 == 5) {
            if (y.text == "Oksitosin") {
              y.lima = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.lima = x.signa
            }
          } else if (i + 1 == 6) {
            if (y.text == "Oksitosin") {
              y.enam = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.enam = x.signa
            }
          } else if (i + 1 == 7) {
            if (y.text == "Oksitosin") {
              y.tujuh = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.tujuh = x.signa
            }
          } else if (i + 1 == 8) {
            if (y.text == "Oksitosin") {
              y.delapan = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.delapan = x.signa
            }
          } else if (i + 1 == 9) {
            if (y.text == "Oksitosin") {
              y.sembilan = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.sembilan = x.signa
            }
          } else if (i + 1 == 10) {
            if (y.text == "Oksitosin") {
              y.sepuluh = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.sepuluh = x.signa
            }
          } else if (i + 1 == 11) {
            if (y.text == "Oksitosin") {
              y.sebelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.sebelas = x.signa
            }
          } else if (i + 1 == 12) {
            if (y.text == "Oksitosin") {
              y.duabelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duabelas = x.signa
            }
          } else if (i + 1 == 13) {
            if (y.text == "Oksitosin") {
              y.tigabelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.tigabelas = x.signa
            }
          } else if (i + 1 == 14) {
            if (y.text == "Oksitosin") {
              y.empatbelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.empatbelas = x.signa
            }
          } else if (i + 1 == 15) {
            if (y.text == "Oksitosin") {
              y.limabelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.limabelas = x.signa
            }
          } else if (i + 1 == 16) {
            if (y.text == "Oksitosin") {
              y.enambelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.enambelas = x.signa
            }
          } else if (i + 1 == 17) {
            if (y.text == "Oksitosin") {
              y.tujuhbelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.tujuhbelas = x.signa
            }
          } else if (i + 1 == 18) {
            if (y.text == "Oksitosin") {
              y.delapanbelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.delapanbelas = x.signa
            }
          } else if (i + 1 == 19) {
            if (y.text == "Oksitosin") {
              y.sembilanbelas = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.sembilanbelas = x.signa
            }
          } else if (i + 1 == 20) {
            if (y.text == "Oksitosin") {
              y.duapuluh = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duapuluh = x.signa
            }
          } else if (i + 1 == 21) {
            if (y.text == "Oksitosin") {
              y.duasatu = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duasatu = x.signa
            }
          } else if (i + 1 == 22) {
            if (y.text == "Oksitosin") {
              y.duadua = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duadua = x.signa
            }
          } else if (i + 1 == 23) {
            if (y.text == "Oksitosin") {
              y.duatiga = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duatiga = x.signa
            }
          } else if (i + 1 == 24) {
            if (y.text == "Oksitosin") {
              y.duaempat = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duaempat = x.signa
            }
          } else if (i + 1 == 25) {
            if (y.text == "Oksitosin") {
              y.dualima = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.dualima = x.signa
            }
          } else if (i + 1 == 26) {
            if (y.text == "Oksitosin") {
              y.duaenam = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duaenam = x.signa
            }
          } else if (i + 1 == 27) {
            if (y.text == "Oksitosin") {
              y.duatujuh = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duatujuh = x.signa
            }
          } else if (i + 1 == 28) {
            if (y.text == "Oksitosin") {
              y.dualapan = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.dualapan = x.signa
            }
          } else if (i + 1 == 29) {
            if (y.text == "Oksitosin") {
              y.duasembilan = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.duasembilan = x.signa
            }
          } else if (i + 1 == 30) {
            if (y.text == "Oksitosin") {
              y.tigapuluh = x.nama_barang
            } else if (y.text == "Tetes/menit") {
              y.tigapuluh = x.signa
            }
          }
        }
      }
      for (let i = 0; i < obat.length; i++) {
        let x = obat[i];
        console.log(x)
        if (i + 1 == 1) {
          vm.data_obat[0].satu = x.barang.nama_barang
        } else if (i + 1 == 2) {
          vm.data_obat[0].dua = x.barang.nama_barang
        } else if (i + 1 == 3) {
          vm.data_obat[0].tiga = x.barang.nama_barang
        } else if (i + 1 == 4) {
          vm.data_obat[0].empat = x.barang.nama_barang
        } else if (i + 1 == 5) {
          vm.data_obat[0].lima = x.barang.nama_barang
        } else if (i + 1 == 6) {
          vm.data_obat[0].enam = x.barang.nama_barang
        } else if (i + 1 == 7) {
          vm.data_obat[0].tujuh = x.barang.nama_barang
        } else if (i + 1 == 8) {
          vm.data_obat[0].delapan = x.barang.nama_barang
        } else if (i + 1 == 9) {
          vm.data_obat[0].sembilan = x.barang.nama_barang
        } else if (i + 1 == 10) {
          vm.data_obat[0].sepuluh = x.barang.nama_barang
        } else if (i + 1 == 11) {
          vm.data_obat[0].sebelas = x.barang.nama_barang
        } else if (i + 1 == 12) {
          vm.data_obat[0].duabelas = x.barang.nama_barang
        } else if (i + 1 == 13) {
          vm.data_obat[0].tigabelas = x.barang.nama_barang
        } else if (i + 1 == 14) {
          vm.data_obat[0].empatbelas = x.barang.nama_barang
        } else if (i + 1 == 15) {
          vm.data_obat[0].limabelas = x.barang.nama_barang
        } else if (i + 1 == 16) {
          vm.data_obat[0].enambelas = x.barang.nama_barang
        } else if (i + 1 == 17) {
          vm.data_obat[0].tujuhbelas = x.barang.nama_barang
        } else if (i + 1 == 18) {
          vm.data_obat[0].delapanbelas = x.barang.nama_barang
        } else if (i + 1 == 19) {
          vm.data_obat[0].sembilanbelas = x.barang.nama_barang
        } else if (i + 1 == 20) {
          vm.data_obat[0].duapuluh = x.barang.nama_barang
        } else if (i + 1 == 21) {
          vm.data_obat[0].duasatu = x.barang.nama_barang
        } else if (i + 1 == 22) {
          vm.data_obat[0].duadua = x.barang.nama_barang
        } else if (i + 1 == 23) {
          vm.data_obat[0].duattiga = x.barang.nama_barang
        } else if (i + 1 == 24) {
          vm.data_obat[0].duaempat = x.barang.nama_barang
        } else if (i + 1 == 25) {
          vm.data_obat[0].dualima = x.barang.nama_barang
        } else if (i + 1 == 26) {
          vm.data_obat[0].duaenam = x.barang.nama_barang
        } else if (i + 1 == 27) {
          vm.data_obat[0].duatujuh = x.barang.nama_barang
        } else if (i + 1 == 28) {
          vm.data_obat[0].dualapan = x.barang.nama_barang
        } else if (i + 1 == 29) {
          vm.data_obat[0].duasembilan = x.barang.nama_barang
        } else if (i + 1 == 30) {
          vm.data_obat[0].tigapuluh = x.barang.nama_barang
        }
      }
    },
    getDataUterus() {
      let vm = this
      for (let i = 0; i < this.patograf.kontraksi_uterus.length; i++) {
        let x = this.patograf.kontraksi_uterus[i];
        for (let j = 0; j < vm.data_uterus.length; j++) {
          let y = vm.data_uterus[j];
          if (y.no <= x.jumlah_kontraksi) {
            if (i + 1 == 1) {
              y.satu = x.lama_kontraksi
            } else if (i + 1 == 2) {
              y.dua = x.lama_kontraksi
            } else if (i + 1 == 3) {
              y.tiga = x.lama_kontraksi
            } else if (i + 1 == 4) {
              y.empat = x.lama_kontraksi
            } else if (i + 1 == 5) {
              y.lima = x.lama_kontraksi
            } else if (i + 1 == 6) {
              y.enam = x.lama_kontraksi
            } else if (i + 1 == 7) {
              y.tujuh = x.lama_kontraksi
            } else if (i + 1 == 8) {
              y.delapan = x.lama_kontraksi
            } else if (i + 1 == 9) {
              y.sembilan = x.lama_kontraksi
            } else if (i + 1 == 10) {
              y.sepuluh = x.lama_kontraksi
            } else if (i + 1 == 11) {
              y.sebelas = x.lama_kontraksi
            } else if (i + 1 == 12) {
              y.duabelas = x.lama_kontraksi
            } else if (i + 1 == 13) {
              y.tigabelas = x.lama_kontraksi
            } else if (i + 1 == 14) {
              y.empatbelas = x.lama_kontraksi
            } else if (i + 1 == 15) {
              y.limabelas = x.lama_kontraksi
            } else if (i + 1 == 16) {
              y.enambelas = x.lama_kontraksi
            } else if (i + 1 == 17) {
              y.tujuhbelas = x.lama_kontraksi
            } else if (i + 1 == 18) {
              y.delapanbelas = x.lama_kontraksi
            } else if (i + 1 == 19) {
              y.sembilanbelas = x.lama_kontraksi
            } else if (i + 1 == 20) {
              y.duapuluh = x.lama_kontraksi
            } else if (i + 1 == 21) {
              y.duasatu = x.lama_kontraksi
            } else if (i + 1 == 22) {
              y.duadua = x.lama_kontraksi
            } else if (i + 1 == 23) {
              y.duattiga = x.lama_kontraksi
            } else if (i + 1 == 24) {
              y.duaempat = x.lama_kontraksi
            } else if (i + 1 == 25) {
              y.dualima = x.lama_kontraksi
            } else if (i + 1 == 26) {
              y.duaenam = x.lama_kontraksi
            } else if (i + 1 == 27) {
              y.duatujuh = x.lama_kontraksi
            } else if (i + 1 == 28) {
              y.dualapan = x.lama_kontraksi
            } else if (i + 1 == 29) {
              y.duasembilan = x.lama_kontraksi
            } else if (i + 1 == 30) {
              y.tigapuluh = x.lama_kontraksi
            } else if (i + 1 == 31) {
              y.tigasatu = x.lama_kontraksi
            }
          }
        }
      }
    },
  },
}
</script>
<style scoped>.table-uterus td {
  border: 1px solid #555 !important;
  padding: 0 !important;
  /* white-space: nowrap; */
  min-width: 20px;
}

.table-serviks td {
  border: 1px solid #555 !important;
  padding: 5px 10px !important;
}</style>
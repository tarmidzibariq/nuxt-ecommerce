<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-user"></i> CUSTOMERS</span>
              </div>
              <div class="card-body">

                <div class="form-group">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="search" @keypress.enter="searchData"
                      placeholder="cari berdasarkan nama customer">
                    <div class="input-group-append">
                      <button @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>
                        SEARCH
                      </button>
                    </div>
                  </div>
                </div>

                <b-table striped bordered hover :items="customers.data" :fields="fields" show-empty>
                  <template #cell(created_at)="data">
                    {{ formatDate(data.item.created_at) }}
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination align="right" :value="customers.current_page" :total-rows="customers.total"
                  :per-page="customers.per_page" @change="changePage" aria-controls="my-table"></b-pagination>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {

    // layout
    layout: 'admin',

    // meta
    head() {
      return {
        title: 'Customers - Administrator',
      }
    },

    // data
    data() {
      return {
        fields: [{
            label: 'Customers Name',
            key: 'name'
          },
          {
            label: 'Email Address',
            key: 'email'
          },
          {
            label: 'Joined',
            key: 'created_at'
          }
        ]
      }
    },

    // hook "AsyncData" 
    async asyncData({
      store
    }) {
      await store.dispatch('admin/customer/getCustomersData')
    },

    // computed
    computed: {

      // customers 
      customers() {
        return this.$store.state.admin.customer.customers
      },
    },

    methods: {

      // methods "searchData"
      searchData() {

        // commit to mutation "SET_PAGE"
        this.$store.commit('admin/customer/SET_PAGE', 1)

        // dispatch on action "getCustomersData"
        this.$store.dispatch('admin/customer/getCustomersData', this.search)
      },

      // method "changePage"
      changePage(page) {

        // commit to mutation "SET_PAGE"
        this.$store.commit('admin/customer/SET_PAGE', page)

        // dispatch on action "getInvoicesData"
        this.$store.dispatch('admin/customer/getCustomersData', this.search)
      },

      // method formatDate
      formatDate(dateString) {
        const date = new Date(dateString);

        // Array nama hari dan bulan dalam Bahasa Indonesia
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayName}, ${day} ${month} ${year}`;
      }
    }
  }

</script>

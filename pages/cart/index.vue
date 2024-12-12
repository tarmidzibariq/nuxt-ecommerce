<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row" v-if="carts.length > 0">
        <!-- jika data carts ada, maka tampilkan -->
        <div class="col-md-7">
          <div class="card border-0 rounded border-top-orange shadow-sm">
            <div class="card-body">
              <h5>DETAIL PESANAN</h5>
              <hr>
              <table class="table table-cart">
                <tbody>
                  <client-only>
                    <tr v-for="cart in carts" :key="cart.id" style="background: #edf2f7;">
                      <td class="b-none" width="25%">
                        <div class="wrapper-image-cart">
                          <img :src="cart.product.image" style="width: 100%;border-radius: .5rem">
                        </div>
                      </td>
                      <td class="b-none" width="50%">
                        <h5><b>{{ cart.product.title }}</b></h5>
                        <table class="table-borderless table-font">
                          <tr>
                            <td style="padding: .20rem">QTY</td>
                            <td style="padding: .20rem">:</td>
                            <td style="padding: .20rem"><b>{{ cart.qty }}</b></td>
                          </tr>
                        </table>

                      </td>
                      <td class="b-none text-right">
                        <p class="m-0 font-weight-bold">Rp. {{ formatPrice(cart.price) }}
                        </p>

                        <p class="m-0">
                          <s style="text-decoration-color:red">Rp.
                            {{ formatPrice(cart.product.price * cart.qty) }}</s>
                        </p>

                        <br>
                        <div class="text-right">
                          <button class="btn btn-sm btn-danger">
                            <i class="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </client-only>
                </tbody>
              </table>

              <table class="table table-default">
                <tbody>
                  <tr>
                    <td class="set-td text-left" width="60%">
                      <p class="m-0">JUMLAH </p>
                    </td>
                    <td class="set-td  text-right" width="30%">&nbsp; : Rp.</td>
                    <td class="text-right set-td ">
                      <p class="m-0" id="subtotal"> {{ formatPrice(cartPrice) }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="set-td text-left border-0">
                      <p class="m-0">ONGKOS KIRIM (<strong>{{ cartWeight }}</strong> gram)</p>
                    </td>
                    <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                    <td class="set-td border-0 text-right">
                      <p class="m-0" id="ongkir-cart">

                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class=" text-left border-0">
                      <p class="font-weight-bold m-0 h5 text-uppercase">Grand Total </p>
                    </td>
                    <td class=" border-0 text-right">&nbsp; : Rp.</td>
                    <td class=" border-0 text-right">
                      <p class="font-weight-bold m-0 h5" align="right">

                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card border-0 rounded border-top-orange shadow-sm">
            <div class="card-body">
              <h5>DETAIL CUSTOMER</h5>
              <hr>
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label class="font-weight-bold">NAMA LENGKAP</label>
                    <input type="text" class="form-control" id="nama_lengkap" placeholder="Nama Lengkap"
                      v-model="customer.name">
                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                      Masukkan Nama Lengkap
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label class="font-weight-bold">NO. HP / WHATSAPP</label>
                    <input type="number" class="form-control" id="phone" placeholder="No. HP / WhatsApp"
                      v-model="customer.phone">
                    <div v-if="validation.phone" class="mt-2 alert alert-danger">
                      Masukkan No. Telp
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label class="font-weight-bold">ALAMAT LENGKAP</label>
                    <textarea class="form-control" id="alamat" rows="3" placeholder="Alamat Lengkap"
                      v-model="customer.address"></textarea>
                    <div v-if="validation.address" class="mt-2 alert alert-danger">
                      Masukkan Alamat Lengkap
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
        <!-- data carts tidak tersedia -->
        <div class="col-md-10">
          <div class="card border-0 rounded border-top-orange shadow-sm">
            <div class="card-body">
              <div class="col-sm-12 empty-cart-cls text-center">
                <img src="/images/shopping-cart.png" width="150" height="150" class="img-fluid mb-4 mr-3">
                <h3><strong>Keranjang Belanja Kosong :)</strong></h3>
                <nuxt-link :to="{name: 'products'}" class="btn btn-warning btn-lg mt-4" data-abc="true">LANJUTKAN
                  BELANJA
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    // middleware
    middleware: 'isCustomer',

    // meta
    head() {
      return {
        title: 'Cart - MI STORE - Distributor Xiaomi Indonesia Resmi',
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: 'Cart - MI STORE - Distributor Xiaomi Indonesia Resmi',
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Cart - MI STORE - Distributor Xiaomi Indonesia Resmi',
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: '/images/shopping-cart.pnsg',
          },
          {
            hid: 'description',
            name: 'description',
            content: 'Cart - Official Toko Online Penjualan Produk Xiaomi',
          },
        ]
      }
    },
    async asyncData({
      store
    }) {
      await store.dispatch('web/cart/getCartsData')
    },

    // computed
    computed: {

      // carts
      carts() {
        return this.$store.state.web.cart.carts
      },

      // cart weight
      cartWeight() {
        return this.$store.state.web.cart.cartWeight
      },

      // cart price
      cartPrice() {
        return this.$store.state.web.cart.cartPrice
      },
      
    },
    // data functions
    data() {
      return {
        // state customer
        customer: {
          name: '',
          phone: '',
          address: '',
        },
        validation: {
          name: false,
          phone: false,
          address: false
        },
      }
    }
  }

</script>
<style scoped>
  .table-cart {
    border-style: solid !important;
    border-color: rgb(198, 206, 214) !important;
  }

  .table-font {
    font-size: 14px;
  }

</style>

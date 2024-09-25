<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-layer-group"></i> PRODUCTS</span>
              </div>
              <div class="card-body">

                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <nuxt-link :to="{name: 'admin-products-create'}" class="btn btn-warning btn-sm"
                        style="padding-top: 10px;">
                        <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                    </div>
                    <input type="text" class="form-control" placeholder="cari berdasarkan nama product">
                    <div class="input-group-append">
                      <button class="btn btn-warning"><i class="fa fa-search"></i>
                        SEARCH
                      </button>
                    </div>
                  </div>
                </div>

                <b-table striped bordered hover :items="products.data" :fields="fields" show-empty>
                </b-table>

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
        title: 'Products - Administrator',
      }
    },

    // data function
    data() {
      return {
        fields: [{
            label: 'Product Name',
            key: 'title',
          },
          {
            label: 'Category Name',
            key: 'category.name',
          },
          {
            label: 'Stock',
            key: 'stock',
            tdClass: 'text-center',

          },
          {
            label: 'Actions',
            key: 'actions',
            tdClass: 'text-center',
          }
        ]
      }
    },

    // hook "asyncData"
    async asyncData({
      store
    }) {
      await store.dispatch('admin/product/getProductsData')
    },

    // computed
    computed: {

      // prducts
      products() {
        return this.$store.state.admin.product.products
      },
    },
  }

</script>

<style>

</style>

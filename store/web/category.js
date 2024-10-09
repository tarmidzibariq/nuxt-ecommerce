//state
export const state = () => ({

    //categories
    categories: [],

})

//mutations
export const mutations = {

    //mutation "SET_CATEGORIES_DATA"
    SET_CATEGORIES_DATA(state, payload) {

        //set value state "categories"
        state.categories = payload
    },

}

//actions
export const actions = {

    //get categories data
    getCategoriesData({ commit }) {

        //set promise
        return new Promise((resolve, reject) => {

            //fetching Rest API "/api/web/categories" with method "GET"
            this.$axios.get('/api/web/categories')
            
            //success
            .then((response) => {

                //commit ti mutation "SET_CATEGORIES_DATA"
                commit('SET_CATEGORIES_DATA', response.data.data)

                //resolve promise
                resolve()
            })

        })

    },

}
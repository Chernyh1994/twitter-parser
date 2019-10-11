import colors from 'vuetify/lib/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'JSN (NuxtJS)',
    title: 'Test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#26c6da' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  axios: {
    baseURL: 'http://localhost:5000'
  },

  auth: {
    strategies:{
      local:{
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/users/users', method: 'get', propertyName: 'users' },
          tokenRequired: true,
          tokenType: 'Bearer'
        },
        facebook: {
          client_id: 'your facebook app id',
          userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email',
          scope: ['public_profile', 'email']
        },
        google: {
          client_id: 'your gcloud oauth app client id'
        },
      }
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-gmaps', {
      key: ''
    }]
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {customProperties: true},
      themes: {
          light: {
              primary: '#00838F',
              secondary: colors.amber.darken3,
              accent: colors.grey.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3
          }
        }
      }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

<script>
import api from '../apiBridge'
import Navbar from './vuestrap/Navbar.vue'
import Dropdown from './vuestrap/Dropdown.vue'
import Spinner from './vuestrap/Spinner.vue'


export default {
 components: {
    'navbar': Navbar,
    'dropdown': Dropdown,
    'spinner': Spinner
    
  },

  data() {
    return {
      appState: api.appState
    }
  },

  methods: {

    logout() {
      api.logout();

      this.appState = api.appState;

    }


  }
}
</script>


<template>
<div>
  
  <div class="container">
 <!--   <spinner ref="spinner" global v-model="spinner" size="lg" fixed ></spinner>
    -->
    <router-view></router-view>
  </div>
</div>
</template>


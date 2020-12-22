<script>
import api from './../apiBridge'
import router from './../router'
import ButtonGroup from './vuestrap/buttonGroup.vue'
import Radio from './vuestrap/Radio.vue'
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";

export default {

  name: 'home',

  components: {
    'radio': Radio,
    'buttonGroup': ButtonGroup,
    MglMap,
    MglMarker
  },

  created: function () {
    this.mapbox = Mapbox;
  },

  methods: {

    getStoreList(point) {
        let coordinates = point.coords
        let bounds = {
          fromLat: coordinates.latitude + 0.5,
          fromLng: coordinates.longitude - 0.5,
          toLat: coordinates.latitude - 0.5,
          toLng: coordinates.longitude + 0.5
        };
        api.calls.getStoreList(bounds, (stores, errTxt, errCode) => {
            if (errTxt) {
              this.error = errTxt;
            } else {
              this.storeList = stores;
              console.log(this.storeList);
            }
        });
    },

    storeClicked(store) {
      console.log('Store clicked:  ' + store.storeNumber);
      api.calls.getStoreDetails(store.storeNumber, (details, errTxt, errCode) => {
        console.log(details);
        let check = details.hours[0].store.available;
        if(check){
          store.hours[0] = details.hours[0];
          this.$forceUpdate();
        }
        this.currentStore = details;
      });
      // Make store details api call here

    },

    getLocation() {
      let self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(postion){
          self.getStoreList(postion);
        });
      } 
    }

  },

  mounted: function(){
    console.log('Main page');
    //this.getStoreList();
    this.getLocation();
  },

  data() {
    return {
        viewOption: 'L',
        storeList: [],
        currentStore: {},
        error: '',
        accessToken:"pk.eyJ1Ijoic2lraXNoYWgiLCJhIjoiY2pzZjM2eHh0MG90cjQ0czc2bWRmczcyayJ9.ttT_U0ixTIPJuX0Ldun0DQ",
        mapStyle: "mapbox://styles/mapbox/streets-v11"
    }
  }

}

</script>

<template>
<div>
    <div v-if="error" class="alert alert-danger">
      <p><span v-html="error"></span></p>
    </div>

    <button-group  style="display: flex; margin: auto;">
        <radio v-model="viewOption" checked-value="L" @keyup.native.enter="viewOption='L';" tabindex="350">List View</radio>
        <radio v-model="viewOption" checked-value="M" @keyup.native.enter="viewOption='M';" tabindex="351">Map View</radio>
    </button-group>

    <div v-if="viewOption=='L' && storeList.length">
        <div v-for="(store, index) in storeList" :key="store">
            <div @click="storeClicked(store)" style="display: table; width: 100%; margin-left: 10px; margin-top: 15px; cursor: pointer; color: white;" >
                <span style="display: table-cell; width: 2em; vertical-align: middle" >
                    <input type="radio" name="pickupChoice" :value="store.storeNumber" :checked="currentStore && store.storeNumber==currentStore.storeNumber" class="option-input radio" >
                </span>
                
                <div v-if="store.details && store.details.street">
                    <b><div>{{store.details.streetNumber}} {{store.details.street}} <span v-if="store.primary" style="font-weight:normal;">&nbsp;&nbsp;{{$t("primary")}}</span></div>
                    <div>{{store.details.city}} {{store.details.province}} {{store.details.postalCode}}</div></b>
                    <div v-if="store.hours[0].pickup" class="hours">{{store.hours[0].pickup.open}} - {{store.hours[0].pickup.close}}</div>
                </div>
                <div v-else>
                    <b><div>{{formatRawStoreName(store.storeName)}}</div></b>
                </div>
            </div>
            <hr v-if="index < storeList.length-1" style="margin: 10px 0px 0px 0px; max-width: 100%;">
        </div>
    </div>    
    <div v-else>
      <MglMap
        v-if="currentStore"
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :scrollZoom="false"
        :dragRotate="false"
        :boxZoom="false"
        :keyboard="false"
        :touchZoomRotate="false"
        :doubleClickZoom="false"
        :center="[
          currentStore.longitude,
          currentStore.latitude
        ]"
        :zoom="15"
      />
    </div>
</div>
</template>
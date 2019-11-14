<template>
  <v-content>
    <v-card max-width="800" class="mx-auto">
      <Search />
      <GmapMap
        :options="{
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          styles: mapStyle
        }"
        :center="{ lat: 47.857589, lng: 35.104832 }"
        :zoom="11"
        map-type-id="terrain"
        style="width: 800px; height: 700px"
      >
        <GmapCircle
          ref="circle"
          :radius="10000"
          :center="{ lat: 47.857589, lng: 35.104832 }"
          :draggable="true"
          :editable="true"
          @radius_changed="radiusChanged"
          @center_changed="centerChanged"
        />
      </GmapMap>
    </v-card>
  </v-content>
</template>

<script>
import Search from "~/components/Search"

export default {
  components: {
    Search
  },

  data() {
    return {
      mapStyle: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#3e606f"
            },
            {
              weight: 3
            },
            {
              gamma: 0.84
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              weight: 0.6
            },
            {
              color: "#313536"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#44a688"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#f5e4e4"
            },
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "labels",
          stylers: [
            {
              visibility: "on"
            },
            {
              lightness: "14"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            },
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#067372"
            },
            {
              lightness: "-20"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#357374"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#004757"
            }
          ]
        }
      ],
      currentLocation: {}
    }
  },

  methods: {
    async centerChanged(evnt) {
      this.lat = evnt.lat()
      this.lng = evnt.lng()
      await this.$store.dispatch("apikeys/ADD_GEO", {
        lat: this.lat,
        lng: this.lng
      })
    },

    async radiusChanged(radius) {
      const rad = Math.round(radius / 1000) + "km"
      await this.$store.dispatch("apikeys/ADD_RADIUS", rad)
    }
  }
}
</script>

<style></style>

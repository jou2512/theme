<template>
  <div>
    <v-container>
      <v-card
        class="black--text rounded-pill pa-2"
        color="red"
      >
        <v-card-content>
          Es suchen momentan noch
          <span class="yellow--text">2</span>
          Personen eine Mitfahrgelegenheit
        </v-card-content>
      </v-card>
      <v-row>
        <v-col
          cols="12"
          md="8"
          class="pr-0 text-h5 d-flex align-center"
        >
          Wir haben noch platz für:
        </v-col>
        <v-col
          md="4"
          class="pl-0"
        >
          <v-select
            v-model="numberofPlaces"
            :items="[0,1,2,3,4,5,6,7,8,9]"
            append-outer-icon="mdi-account"
            hide-details
            single-line
            dense
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'loading',
  }
</script>

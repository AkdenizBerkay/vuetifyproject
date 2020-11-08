<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card max-width="4000" class="mx-auto" color="blue-grey">
          <v-card-title class="headline">
            <span class="white--text">
              {{ billboard.name }}
              Detail
            </span>
          </v-card-title>

          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-card color="#385F73" dark>
                  <v-card-subtitle>{{ billboard.content }}</v-card-subtitle>

                  <v-card-actions>
                    <v-flex class="d-flex justify-start">
                      {{ billboard.date }}
                    </v-flex>
                    <v-flex class="d-flex justify-end"
                      ><v-icon>mdi-account </v-icon>
                      {{ billboard.customer.name }}
                      {{ billboard.customer.surname }}
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card></v-col
      >
    </v-row>
    <v-row>
      <v-col
        v-for="n in billboard.billboardImages"
        :key="n.key"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :src="`${n.base64Name}`"
          :lazy-src="`${n.base64Name}`"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    billboard: {
      customer:{
        name:"",
        surname:""
      }
    },
    display: "",
  }),
  created() {
    if (this.$store.state.detailBillboard.customer == null || this.$store.state.detailBillboard.customer == undefined)
    {
      this.$store
        .dispatch("getBillboardCustomer",this.$store.state.detailBillboard.customerId)
        .then((response) => {
          this.billboard = this.$store.state.detailBillboard;
          this.billboard.customer = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else{
      this.billboard = this.$store.state.detailBillboard;
    } 
  },
};
</script>
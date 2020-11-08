<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      color="blue-grey"
      top
      :timeout="4000"
      absolute
      right
      rounded="pill"
    >
      <v-icon v-if="isOk">mdi-account-check</v-icon>
      <v-icon v-if="!isOk">mdi-account-alert</v-icon>
      {{ snackbartext }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card style="background-color: #d3d3d3">
      <v-card-title> Billboard </v-card-title>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-flex class="d-flex justify-end">
            <v-btn color="red" text class="mb-2" v-on="on">
              <v-icon>mdi-plus</v-icon> Add Billboard
            </v-btn>
          </v-flex>
        </template>

        <v-card>
          <v-card-title class="headline primary mb-5">
            <h3>Create Your Billboard</h3>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="billboard.name"
                    label="Title"
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="billboard.Content"
                    label="Content"
                    outlined
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-file-input
                    type="file"
                    outlined
                    small-chips
                    prepend-icon=""
                    label="Profile Image2"
                    @change="uploadProfileImage"
                  ></v-file-input>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-file-input
                    type="file"
                    counter
                    multiple
                    outlined
                    small-chips
                    prepend-icon=""
                    label="Images"
                    @change="uploadImages"
                  ></v-file-input>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="error" text @click="close()">Cancel</v-btn>
            <v-btn color="primary" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer></v-spacer>
      <v-card-text max-width="344">
        <v-flex class="d-flex justify-start">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-card
                xs6
                md4
                class="ma-3"
                max-width="344"
                v-for="billboard in billboards"
                :key="`${billboard.billboardId}`"
              >
                <v-img
                  :src="`${getBillboardProfileImage(billboard)}`"
                  height="200px"
                  width="200px"
                ></v-img>
                <v-card-title> {{ billboard.name }} </v-card-title>
                <v-card-subtitle>
                  {{ getBillboardContent(billboard.content) }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="red lighten-2" text @click="Detail(billboard)">
                    Explore
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex class="d-flex justify-center align-center">
          <v-progress-circular
            ref="loading"
            size="150"
            color="red"
            indeterminate
            :style="isLoading"
            >
            <br/><br/><br/><br/><br/><br/>
            <span>
            Billboards are loading</span>
           </v-progress-circular>
            
        </v-flex>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    goster: false,
    show: false,
    dialog: false,
    billboard: {
      name: "",
      Content: "",
      BillboardImages: [],
      Customer: {},
      CustomerId: 2,
      Status: "Draft",
      Date: "",
    },
    defaultbillboard: {
      name: "",
      Content: "",
      BillboardImages: [],
      Customer: {},
      CustomerId: 2,
      Status: "Draft",
      Date: "",
    },
    display: "",
    snackbar: false,
    snackbartext: "",
    isOk: false,
    isLoaded: false,
  }),
  created() {
    this.$store
      .dispatch("getBillboards")
      .then(() => {
        this.isLoaded = true;
      })
      .catch((ex) => {
        alert("hata oluştu.");
        console.log(ex);
      });
  },
  methods: {
    getBillboardContent(billboardContent) {
      return billboardContent.substring(0, 50) + "...";
    },
    getBillboardProfileImage(billboard) {
      var images = billboard.billboardImages;
      var profileImage = images.find(function (x) {
        if (x.isProfile == true) {
          return x;
        }
      });
      return profileImage.base64Name;
    },
    Detail(billboard) {
      this.$store.state.detailBillboard = billboard;
      this.$router.push("/detailbillboard");
    },
    save() {
      var date = new Date();
      this.billboard.Date =
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      this.$store
        .dispatch("addBillboard", this.billboard)
        .then((response) => {
          if (response.status == 201) {
            this.isOk = true;
            this.snackbartext = "Success billboard is saved";
          } else {
            this.isOk = true;
            this.snackbartext = "Error billboard couldn't be saved";
          }
          this.dialog = false;
          this.snackbar = true;
          this.billboard = this.defaultbillboard;
        })
        .catch((ex) => {
          alert("hata");
          console.log(ex);
        });
    },
    close() {
      this.dialog = false;
      console.log(this.billboards);
    },
    uploadProfileImage(e) {
      var reader = new FileReader();
      var vm = this;
      var oldProfile = vm.billboard.BillboardImages.find(function (x) {
        if (x.IsProfile == true) {
          return x;
        } else {
          return null;
        }
      });
      if (oldProfile != null && oldProfile != undefined) {
        vm.billboard.BillboardImages.splice(
          vm.billboard.BillboardImages.indexOf(oldProfile),
          1
        );
      }
      if (e != undefined) {
        reader.readAsDataURL(e);
        reader.onload = (k) => {
          var image = {};
          image.base64Name = k.target.result;
          image.name = e.name;
          image.IsProfile = true;
          vm.billboard.BillboardImages.push(image);
        };
      }
    },
    uploadImages(e) {
      var vm = this;
      if (vm.billboard.BillboardImages.length > 0) {
        var profile = vm.billboard.BillboardImages.find(function (x) {
          return (x.IsProfile = true);
        });
      }
      vm.billboard.BillboardImages = [];
      e.forEach((element) => {
        var reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (k) => {
          var image = {};
          image.name = element.name;
          image.base64Name = k.target.result;
          image.IsProfile = false;
          vm.billboard.BillboardImages.push(image);
        };
      });
      if (profile != undefined) {
        vm.billboard.BillboardImages.push(profile);
      }
    },
  },
  computed: {
    isLoading() {
      if (this.isLoaded == true || this.billboards.length>0){
        return {
          display: "none",
        };
      } else {
        return {
          display: "block",
        };
      }
    },
    ...mapGetters({
      billboards: "getBillboards",
    }),
  },
};
</script>
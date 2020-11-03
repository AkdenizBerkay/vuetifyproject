<template>
  <div>
    <v-card style="background-color: #d3d3d3">
      <v-card-title> Billboard </v-card-title>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-flex class="d-flex justify-end">
            <v-btn color="red" text class="mb-2" v-on="on">
              <v-icon>mdi-plus</v-icon> Add Customer
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
                    v-model="billboard.Name"
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
                <!-- <v-flex xs12 sm12 md12>
                  <v-file-input
                    type="file"
                    outlined
                    small-chips
                    prepend-icon=""
                    label="Profile Image"
                    @change="saveProfileImage2"
                  ></v-file-input>
                </v-flex> -->
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
                <!-- <v-flex xs12 sm12 md12>
                  <input
                    type="file"
                    outlined
                    small-chips
                    prepend-icon=""
                    label="Profile Image"
                    @change="saveProfileImage"
                  />
                </v-flex>-->
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
      <v-card-text>
        <v-flex class="d-flex justify-start">
          <v-card  class="ma-3"
            max-width="344"
            v-for="billboard in billboards"
            :key="`${billboard.billboardId}`"
            :id="`${billboard.billboardId}`"
          >
            <v-img
              :src="`${billboard.billboardImages[0].base64Name}`"
              height="200px" width="200px"
            ></v-img>

            <v-card-title> {{ billboard.name }} </v-card-title>

            <v-card-subtitle> {{getBillboardContent(billboard.content)}} </v-card-subtitle>

            <v-card-actions>
              <v-btn color="red lighten-2" text @click="Detail(billboard)"> Explore </v-btn>
              <v-spacer></v-spacer>

              <!-- <v-btn icon @click="showCardText(billboard.billboardId)" :id="'billboardButton_'+`${billboard.billboardId}`">
                <v-icon :id="'billboardIcon_'+`${billboard.billboardId}`">{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn> -->
            </v-card-actions>

            <!-- <v-expand-transition>
              <div :id="'billboardDescription_'+`${billboard.billboardId}`" :ref="'billboardDescription_'+`${billboard.billboardId}`" style="display:none">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition> -->
          </v-card>
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
      Name: "",
      Content: "",
      BillboardImages: [],
      Customer:{},
      CustomerId: 2,
      Status: "Draft",
      Date: "13.10.2020",
    },
    display:""
  }),
  created() {
    this.$store
      .dispatch("getBillboards")
      .then()
      .catch((ex) => {
        alert("hata oluştu.");
        console.log(ex);
      });
  },
  methods: {
    getBillboardContent(billboardContent){
      return billboardContent.substring(0,15) + '...';
    },
    // showCardText(billboardId){
      
    //   console.log(this.$refs["billboardDescription_"+billboardId]);
    //   this.$refs["billboardDescription_"+billboardId][0].style.display="block";
    //   this.$refs["billboardDescription_12"][0].style.display="none";
    // },
    Detail(billboard){
      
      this.$store.state.detailBillboard = billboard;
      this.$router.push("/detailbillboard");
    },
    save() {
      this.$store
        .dispatch("addBillboard", this.billboard)
        .then((response) => {
          if (response.status == 204) {
            this.isOk = true;
            this.snackbartext = "Success billboard is saved";
          } else {
            this.isOk = false;
            this.snackbartext = "Error billboard couldn't be saved";
          }
          this.dialog = false;
        })
        .catch((ex) => {
          alert("hata");
          console.log(ex);
        });
    },
    close() {
      this.dialog = false;
    },
    uploadProfileImage(e) {
      var reader = new FileReader();
      var vm = this;
      reader.readAsDataURL(e);
      reader.onload = (k) => {
        var image = {};
        image.Base64Name = k.target.result;
        image.Name = e.name;
        image.IsProfile = true;
        vm.billboard.BillboardImages.push(image);

      };
    },
    uploadImages(e) {
      var vm = this;
      e.forEach((element) => {
        var reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (k) => {
          var image = {};
          image.Name = element.name;
          image.Base64Name = k.target.result;
          image.IsProfile = false;
          vm.billboard.BillboardImages.push(image);
        };
      });
    },
    saveImages() {},
    // AddBillboard() {
    //   this.$router.push({ name: "CreateBillboard" });
    // },
  },
  computed: {
    ...mapGetters({
      billboards: "getBillboards",
    }),
  },
};
</script>
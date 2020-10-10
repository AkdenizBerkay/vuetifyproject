<template>
  <div>
    <!-- <v-snackbar v-model="snackbar" top :timeout="4000"> -->
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
      <v-card-title>
        Customer List
        <v-spacer></v-spacer>
      </v-card-title>
      <v-dialog v-model="dialog" max-width="500px" dark>
        <template v-slot:activator="{ on }">
          <v-flex class="d-flex justify-end">
            <v-btn color="black" text class="mb-2" v-on="on">
              <v-icon>mdi-plus</v-icon> Add Customer
            </v-btn>
          </v-flex>
        </template>

        <v-card>
          <v-card-title>
            <h2>{{ formTitle }}</h2>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedPersonelItem.name" label="Ad" />
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedPersonelItem.surname"
                    label="Soyad"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedPersonelItem.country"
                    label="Ülke"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedPersonelItem.city"
                    label="Şehir"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedPersonelItem.email"
                    label="Email"
                  />
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
      <v-app id="inspire" class="ma-2" style="background-color: #d3d3d3">
        <v-data-table
          dark
          class="elevation-1"
          :headers="computedHeaders"
          :items="personeller"
          :options="options"
        >
          <!-- :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination" -->
          <!-- change table header color(or other properties) -->
          <template slot="headerCell" slot-scope="{ header }">
            <span
              class="subheading font-weight-light text-general text--darken-3"
              v-text="header.text.toUpperCase()"
            />
          </template>

          <template v-slot:items="props">
            <td class>{{ props.item.customerId }}</td>
            <td class>{{ props.item.name }}</td>
            <td class>{{ props.item.surname }}</td>
            <td class>{{ props.item.country }}</td>
            <td class>{{ props.item.city }}</td>
            <td class>{{ props.item.email }}</td>
            <!-- <td class="justify-center">{{props.item.name}}
              <v-icon medium class="mr-2" @click="editItem(props.item)">{{props.item.name}}</v-icon>
              <v-icon medium @click="deleteItem(props.item)">restore</v-icon>
              <v-icon medium @click="deleteItem(props.item)">mdi-human-queue</v-icon>
            </td> -->
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <td class="justify-center">
              <v-flex class="d-flex justify-end">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mr-2" @click="deleteItem(item)"
                  >mdi-delete</v-icon
                >
              </v-flex>
            </td>
          </template>
          <!-- <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template> -->
        </v-data-table>
        <v-dialog v-model="deleteDialog" max-width="500px" dark>
          <v-card>
            <v-card-title>
              <h2>Delete Customer</h2>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    Are you sure want to delete this customer?
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text @click="closeConfirm()">Cancel</v-btn>
              <v-btn color="error" text @click="deleteItemConfirm"
                >Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  data: () => ({
    //personeller: [],
    personelheaders: [
      {
        text: "Id",
        align: "left",
        sortable: false,
        value: "customerId",
        visible: false,
      },
      { text: "Adı", value: "name" },
      { text: "Soyadı", value: "surname" },
      { text: "Ülke", value: "country" },
      { text: "Şehir", value: "city" },
      { text: "Email", value: "email" },
      { text: "", value: "actions", sortable: false },
    ],
    editedPersonelIndex: -1,
    editedPersonelItem: {
      name: "",
      surname: "",
      country: "",
      city: "",
      email: "",
    },
    defaultPersonel: {
      name: "",
      surname: "",
      country: "",
      city: "",
      email: "",
    },
    rowsPerPageItems: [10, 20, 30, 40],
    pagination: {
      rowsPerPage: 10,
    },
    options: {
      page: 1,
      itemsPerPage: 10,
      multiSort: true,
    },
    dialog: false,
    deleteDialog: false,
    snackbar: false,
    snackbartext: "",
    isOk: false,
  }),

  computed: {
    formTitle() {
      return this.editedPersonelIndex === -1 ? "New Customer" : "Edit Customer";
    },
    computedHeaders() {
      return this.personelheaders.filter((s) => s.text != "Id");
    },
    ...mapGetters({
      personeller:"getCustomers"
    })
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.close();
      }
    },
  },

  created() {
    this.$store
      .dispatch("getCustomers")
      .then()
      .catch((ex) => {
        alert("hata oluştu.");
        console.log(ex);
      });
  },

  methods: {
    editItem(item) {
      this.editedPersonelIndex = this.personeller.indexOf(item);
      this.editedPersonelItem = Object.assign({}, item);
      //JSON.stringify(item);
      this.dialog = true;
    },
    closeConfirm() {
      this.deleteDialog = false;
      setTimeout(() => {
        this.editedPersonelIndex = -1;
        this.editedPersonelItem = Object.assign({}, this.defaultPersonel);
      }, 300);
    },
    deleteItem(item) {
      this.deleteDialog = true;
      this.editedPersonelIndex = this.personeller.indexOf(item);
      this.editedPersonelItem = Object.assign({}, item);
    },
    deleteItemConfirm() {
      this.$store
        .dispatch("deleteCustomer", this.editedPersonelItem)
        .then((response) => {
          if (response.status == 204) {
            this.isOk = true;
            this.snackbartext = "Success customer is deleted";
          } else {
            this.isOk = false;
            this.snackbartext = "Error customer couldn't be deleted";
          }
        })
        .catch((ex) => {
          alert("hata");
          console.log(ex);
        });
      this.snackbar = true;
      this.closeConfirm();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedPersonelIndex = -1;
        this.editedPersonelItem = Object.assign({}, this.defaultPersonel);
      }, 300);
    },

    save() {
      if (this.editedPersonelIndex > -1) {
        this.$store
          .dispatch("updateCustomer", this.editedPersonelItem)
          .then((response) => {
            if (response.status == 204) {
              this.isOk = true;
              this.snackbartext = "Success customer is updated";
            } else {
              this.isOk = false;
              this.snackbartext = "Error customer couldn't be updated";
            }
          })
          .catch((ex) => {
            alert("hata");
            console.log(ex);
          });
      } else {
        this.$store
          .dispatch("addCustomer", this.editedPersonelItem)
          .then((response) => {
            if (response.status == 201) {
              this.isOk = true;
              this.snackbartext = "Success customer is saved";
            } else {
              this.isOk = false;
              this.snackbartext = "Error customer couldn't be saved";
            }
          })
          .catch((ex) => {
            alert("hata");
            console.log(ex);
          });
      }
      this.snackbar = true;
      this.close();
    },
  },
};
</script>
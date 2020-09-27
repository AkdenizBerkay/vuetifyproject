<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on"
        >Add new project</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="headline primary white--text">
        Add a new project
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <div class="pt-10">
            <v-text-field
              :rules="inputRules"
              label="Title"
              v-model="title"
              prepend-icon="mdi-folder"
            ></v-text-field>
          </div>
          <div class="pt-5">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :rules="inputRules"
                  v-model="dateFormatted"
                  label="Due date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @blur="date = parseDate(dateFormatted)"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="pt-5">
            <v-textarea
              :rules="inputRules"
              label="Information"
              v-model="content"
              prepend-icon="mdi-pencil"
            ></v-textarea>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submit" :loading="loading">Add project</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["getCustomers"]) },
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: "", //this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      inputRules: [(v) => (v && v.length >= 0) || "Zorunlu Alan"],
      //datePickerRules: [(v) => v],
      loading: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading=true;
        let data = {
          Name: this.title,
          Surname: this.content,
        };
       

        this.$store
          .dispatch("saveCustomer", data)
          .then(() => {
            this.loading=false;
             this.dialog = false;
             this.title=null;
             this.content=null;
             this.dateFormatted=null;
             this.$emit('projectAdded');
          })
          .catch(() => {
            alert("hata aldı");
             this.dialog = false;
          });
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
};
</script>
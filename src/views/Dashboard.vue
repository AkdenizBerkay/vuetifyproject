<template>
  <div class="dashboard">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1 class="subheading grey--text">Dashboard</h1>
    <!-- <p class="red white--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, est id illum saepe corrupti eum asperiores non nobis distinctio. Ipsum incidunt quas adipisci, qui cupiditate nam distinctio earum consequuntur. Porro.</p>
    <p class="pink lighten-4 red--text text--darken-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, est id illum saepe corrupti eum asperiores non nobis distinctio. Ipsum incidunt quas adipisci, qui cupiditate nam distinctio earum consequuntur. Porro.</p>
    <h1 class="display-4">Massive Display</h1>
    <h4 class="display-1">Smaller Display</h4>-->
    <!-- <div class="row">
      <v-btn class="pink white--text">click me</v-btn>
      <v-btn color="primary" depressed style="margin-left:3em">click me</v-btn>
      <v-btn text color="pink" style="margin-left:3em">click me</v-btn>

      <v-btn depressed class="pink white--text">
        <v-icon left>mdi-email</v-icon>
        <span>email me</span>
      </v-btn>

      
    </div>
    <div class="row">ss</div>
    <div class="row">
      <v-btn fab text color="pink">
        <v-icon>mdi-heart</v-icon>
        
      </v-btn>
    </div>-->

    <v-container class="my-5">
      <!-- <v-layout row wrap>
        <v-flex xs12 md6>
          <v-btn outlined block color="primary">1</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block color="primary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block color="primary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block color="primary">2</v-btn>
        </v-flex>
      </v-layout>
      <br />
      <v-layout row wrap justify-center>
        <v-flex xs4 md3>
          <v-btn outlined block color="success">1</v-btn>
        </v-flex>
        <v-flex xs4 md3>
          <v-btn outlined block color="success">2</v-btn>
        </v-flex>
      </v-layout>-->

      <v-layout row>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" class="ma-3" v-bind="attrs" v-on="on" @click="sortBy('title')">
              <v-icon left small>mdi-folder</v-icon>
              By project title</v-btn>
          </template>
          <span>it makes order your projects by project's title</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" class="ma-3" v-bind="attrs" v-on="on" @click="sortBy('person')">
              <v-icon left small>mdi-account-outline</v-icon>
              By person</v-btn>
          </template>
          <span>it makes order your projects by person's name</span>
        </v-tooltip>
      </v-layout>

      <v-card v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div caption class="grey--text pl-6 pt-3">Project Title</div>
            <div class="pl-6 pb-6">{{project.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div caption class="grey--text pl-6 pt-3">Person</div>
            <div class="pl-6 pb-6">{{project.person}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div caption class="grey--text pl-6 pt-3">Due by</div>
            <div class="pl-6 pb-6">{{project.due}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="pl-16 pt-6">
              <v-chip small :class="`${project.status} white--text caption my2`">{{project.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      projects: [
        {
          title: "Design a new website",
          person: "Berkay Akdeniz",
          due: "1st Jan 2021",
          status: "ongoing"
        },
        {
          title: "Code up the homepage",
          person: "Chun Li",
          due: "10th Jan 2021",
          status: "complete"
        },
        {
          title: "Design video thumbails",
          person: "Ryu",
          due: "20th Dec 2019",
          status: "complete"
        },
        {
          title: "Create a community forum",
          person: "Gouken",
          due: "20th Oct 2019",
          status: "overdue"
        }
      ]
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>
<style>
.project.complete {
  border-left: 5px solid #3cd1c2;
  margin-left: 0.1px;
}
.project.ongoing {
  border-left: 5px solid orange;
  margin-left: 0.1px;
}
.project.overdue {
  border-left: 5px solid tomato;
  margin-left: 0.1px;
}
.v-chip.complete {
  background-color: #3cd1c2 !important;
}
.v-chip.ongoing {
  background-color: #ffaa2c !important;
}
.v-chip.overdue {
  background-color: #f83e70 !important;
}
</style>
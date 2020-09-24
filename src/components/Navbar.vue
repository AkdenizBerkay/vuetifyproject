<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="blue-grey darken-2" absolute style="height:100%">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/thegodfather.jpg" alt />
          </v-avatar>
          <p class="black--text font-weight-bold subheading mt-1">The Godfather</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup/>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <!-- <v-subheader class="font-weight-black">MENU</v-subheader> -->
        <v-list-item-group>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon class="white--text" v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import Popup from "./Popup"
export default {
  components:{
    Popup
  },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        { icon: "mdi-account-outline", text: "Cast", route: "/team" }
      ]
    };
  }
};
</script>
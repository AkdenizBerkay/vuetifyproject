<template>
  <div class="team">
    <h1 class="subheading grey--text">Cast</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="100">
                  <img :src="person.avatar">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="font-weight-black">{{person.name}}</div>
                <div class="grey--text">{{person.birth}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="grey">
                  <v-icon small left>mdi-message</v-icon>
                  <span>message</span>
                </v-btn>
              </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Team",
  data(){
    return{
      team:[
        {name:'Marlon Brando', birth:'April 3, 1924 in Omaha, Nebraska, USA',avatar:'/Marlon.jpg'},
        {name:'Al Pacino', birth:'April 25, 1940 in Manhattan, New York City, New York, USA',avatar:'/Alpacino.jpg'},
        {name:'James Caan', birth:'March 26, 1940 in The Bronx, New York, USA',avatar:'/Sonny.jpg'},
        {name:'Robert Duvall', birth:'January 5, 1931 in San Diego, California, USA',avatar:'/Tom.jpg'},
        {name:'John Cazale', birth:'August 12, 1935 in Boston, Massachusetts, USA',avatar:'/Fredo.jpg'},
      ]
    }
  }
};
</script>

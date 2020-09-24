<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in projects" :key="project.title">
          <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
          <v-expansion-panel-content color="grey--text" class="px-4">
            <div class="font-weight-bold">due by {{project.due}}</div>
            <div>{{project.content}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: [
        {
          title: "Design a new website",
          person: "Berkay Akdeniz",
          due: "1st Jan 2021",
          status: "ongoing",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vero ut itaque qui. Enim iure iusto magni ipsam, voluptatum blanditiis consequatur corporis! Reiciendis cum voluptates ratione, consequatur in deleniti illum?"
        },
        {
          title: "Code up the homepage",
          person: "Chun Li",
          due: "10th Jan 2021",
          status: "complete",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vero ut itaque qui. Enim iure iusto magni ipsam, voluptatum blanditiis consequatur corporis! Reiciendis cum voluptates ratione, consequatur in deleniti illum?"
        },
        {
          title: "Design video thumbails",
          person: "Ryu",
          due: "20th Dec 2019",
          status: "complete",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vero ut itaque qui. Enim iure iusto magni ipsam, voluptatum blanditiis consequatur corporis! Reiciendis cum voluptates ratione, consequatur in deleniti illum?"
        },
        {
          title: "Create a community forum",
          person: "Gouken",
          due: "20th Oct 2019",
          status: "overdue",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vero ut itaque qui. Enim iure iusto magni ipsam, voluptatum blanditiis consequatur corporis! Reiciendis cum voluptates ratione, consequatur in deleniti illum?"
        }
      ]
    };
  },
  // computed: {
  //   myProjects() {
  //     return this.projects.filter(project => {
  //       return project.person === "Berkay Akdeniz";
  //     });
  //   }
  // }
};
</script>

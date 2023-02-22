<template>
  <nav>
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Budget Manager</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn @click="toggleTheme">toggle theme</v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
     mini-variant.sync="testmini"
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          :key="items.value"
          v-for="items in items"
          @click="handleClickItem(items.value)"
        >
          {{ items.title }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { useTheme } from "vuetify";

export default {
  methods: {
    handleClickItem(name) {
      navigateTo(`/${name}`);
    },
  },
  data: () => ({
    drawer: false,
    group: null,
    testmini: true,
    items: [
      {
        title: "DashBoard",
        value: "dashboard",
      },
      {
        title: "Expense",
        value: "expense",
      },
      {
        title: "Profile",
        value: "profile",
      },
      {
        title: "Settings",
        value: "settings",
      },
    ],
  }),

  setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "light"
          : "dark"),
    };
  },
};
</script>

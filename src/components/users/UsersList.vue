<template>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return { changesSave: false}
  },
  methods: {
    saveChanges() {
      this.changesSave = true;
    }
  },
  inject: ['users'],
  beforeRouteEnter(to, from, next) {
    console.log('UsersList Cmp beforeRouterEnter');
    console.log('to: ', to, 'from: ', from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UserList Cmp beforeRouterLeave');
    console.log('to: ', to, 'from: ', from);

    if(this.changesSave) {
      next();
    } else {
      const userWantsToLeave = confirm("Are you sure? You got unsaved changes!");
      next(userWantsToLeave);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
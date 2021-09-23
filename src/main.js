import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // for 'redirect' url changes from localhost:8080 to localhost:8080/teams
        { path: '/', redirect: '/teams' },
        // for 'alias' url doesn't change it loads as localhost:8080
        // { path: '/teams', component: TeamsList, alias: '/' },
        {
            path: '/teams',
            component: TeamsList,
            children: [
                { path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        { path: '/users', component: UsersList },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

const app = createApp(App)

app.use(router);

app.mount('#app');

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // for 'redirect' url changes from localhost:8080 to localhost:8080/teams
        { path: '/', redirect: '/teams' },
        // for 'alias' url doesn't change it loads as localhost:8080
        // { path: '/teams', component: TeamsList, alias: '/' },
        {
            name: 'teams',
            path: '/teams',
            components: { default: TeamsList, footer: TeamsFooter },
            children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        {
            path: '/users',
            components: {
                default: UsersList,
                footer: UsersFooter
            },
            beforeEnter(to, from, next) {
                console.log('users beforeEnter');
                console.log('to: ', to, 'from: ', from);
                next();
            }
        },
        { path: '/:notFound(.*)', component: NotFound }
    ],
    scrollBehavior(to, from, savedPosition) {
        // console.log('to: ', to, 'from: ', from, 'savedPosition: ', savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
});
// navigation guards - useful if we want to warn user before navigating to new page
// so that user doesn't lose unsaved data
router.beforeEach(function (to, from, next) {
    console.log('Global beforeEach');
    console.log('to: ', to, 'from: ', from);
    next();
})

const app = createApp(App)

app.use(router);

app.mount('#app');

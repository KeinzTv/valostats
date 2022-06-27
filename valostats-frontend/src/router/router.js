/**
 * @author Keinz & Vaidio
 * @project valostats-website
 * @date 25/06/2022
 */

import {createRouter, createWebHistory} from 'vue-router';

import MainComponent from "@/components/views/MainComponent";
import MapsComponent from "@/components/views/MapsComponent";
import WeaponComponent from "@/components/views/WeaponComponent";
import AgentsComponent from "@/components/views/AgentsComponent";
import StatsComponent from "@/components/views/StatsComponent";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            name: "index",
            path: '/index',
            component: MainComponent
        },

        {
            name: "maps",
            path: '/maps',
            component: MapsComponent
        },

        {
            name: "weapons",
            path: '/weapons',
            component: WeaponComponent
        },

        {
            name: "agents",
            path: '/agents',
            component: AgentsComponent
        },

        {
            name: "stats",
            path: '/stats',
            component: StatsComponent
        },

        //404 page
        {
            path: '/:catchAll(.*)',
            redirect: {
                name: 'index'
            }
        }
    ]
});

export default router;
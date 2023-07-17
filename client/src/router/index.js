import { createRouter, createWebHistory } from "vue-router";
import registrationForm from "../components/registrationForm";
import authorizationForm from "../components/authorizationForm";
import userProfile from "../components/userProfile";
const routes = [
    {
        path: "",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "registrationForm",
        component: registrationForm,
    },
    {
        path: "/signIn",
        name: "authorizationForm",
        component: authorizationForm,
    },
    {
        path: "/profile",
        name: "profile",
        component: userProfile,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

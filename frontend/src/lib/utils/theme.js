import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultTheme = 'light';
const getTheme = browser ? window.localStorage.getItem('data-theme') || defaultTheme : defaultTheme;

const theme = writable(getTheme);

theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('data-theme', value);
        document.documentElement.setAttribute('data-theme', value);
    }
});

export default theme;
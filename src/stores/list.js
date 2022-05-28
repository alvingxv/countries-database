import {writable} from "svelte/store";

export const countries = writable([])

const fetchcountries = async () => {
    const url = `https://restcountries.com/v3.1/all?fields=name,flags`;
    const response = await fetch(url);
    const data = await response.json();
    const loadedcountries = data.map((data, index)=> {
        return{
            id: index+1,
            name: data.name,
            flag: data.flags.png
        }
    });
    countries.set(loadedcountries);
};
fetchcountries();
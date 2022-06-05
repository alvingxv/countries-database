<script context="module">
	export async function load({ params }) {
		const url = `https://restcountries.com/v3.1/all?fields=name,flags`;
		const response = await fetch(url);
		const data = await response.json();
		const loadedcountries = data.map((data, index) => {
			return {
				id: index + 1,
				name: data.name,
				flag: data.flags.png
			};
		});
		return { props: { countries: loadedcountries } };
	}
</script>

<script>
	//import { countries } from '../stores/list';
	import Countriescard from '../components/countriescard.svelte';
	import BackToTop from '../components/backtotop.svelte';

	export let countries;
	let searchterm = '';
	let filteredcountry = [];
	$: {
		if (searchterm) {
			filteredcountry = countries.filter((country) => {
				return country.name.official.toLowerCase().includes(searchterm.toLowerCase());
			});
		} else {
			filteredcountry = [...countries];
		}
	}
</script>

<svelte:head>
	<title>Countries Database</title>
</svelte:head>

<section
	class="bg-[#111827] bg-[url('https://wallpapercave.com/wp/wp2593836.jpg')] bg-cover bg-fixed flex-grow"
>
	<div class="backdrop-blur-sm">
		<div class="justify-center flex p-10">
			<h1 class="justify-center text-3xl font-extrabold sm:text-5xl">Countries Database.</h1>
		</div>

		<div class="items-center flex justify-center">
			<div class="relative mr-3">
				<div class="absolute top-3 left-3 items-center">
					<svg
						class="w-5 h-5 text-slate "
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<input
					type="text"
					class="block p-2 pl-10 w-96 text-slate-200 bg-[#1F2937] rounded-lg border border-gray-300"
					placeholder="Search Here..."
					bind:value={searchterm}
				/>
			</div>
		</div>

		<div class="px-10 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4 grid-cols-4">
			{#each filteredcountry as country}
				<Countriescard {country} />
			{/each}
		</div>

		<BackToTop />
	</div>
</section>

<script context="module">
	const isEmpty = (obj) => {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	};

	export async function load({ params }) {
		const name = params.official;
		const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,currencies,languages,flags,population,region`;
		const res = await fetch(url);
		const country = await res.json();

		let currencies = country[0].currencies;
		let langArray = [];
		const languages = country[0].languages;
		Object.values(languages).forEach((val) => {
			langArray.push(val);
		});

		if (isEmpty(currencies)) {
			const currenciesname = 'This Country has no currencies';
			const currenciessymbol = '-';
			return { props: { country, currenciesname, currenciessymbol, langArray } };
		}
		const currkeys = Object.keys(currencies);
		const key = currkeys[0];
		let currenciesname = country[0].currencies[key].name;
		let currenciessymbol = country[0].currencies[key].symbol;

		return { props: { country, currenciesname, currenciessymbol, langArray } };
	}
</script>

<script>
	export let country, currenciesname, currenciessymbol, langArray;
</script>

<svelte:head>
	<title>{country[0].name.official} - Database</title>
</svelte:head>

<section class="bg-[#111827]">
	<main class="max-w-4xl mx-auto p-5 py-10 h-full select-none flex flex-col  ">
		<article class="grid w-full grid-cols-1 p-5 bg-[#1F2937] lg:grid-cols-2 rounded-2xl">
			<aside class="order-2 grid gap-5 p-5">
				<img
					class="object-cover rounded-xl justify-self-center"
					src={country[0].flags.png}
					alt={country[0].name.common}
				/>
			</aside>
			<aside class="order-1 gap-5 p-5">
				<section>
					<div class="grid grid-cols-3 gap-2">
						<div>
							<span><h1>Name</h1></span>
							<p class="font-bold">{country[0].name.official}</p>
						</div>
						<div>
							<span><h1>Capital</h1></span>
							{#if country[0].capital[0] === undefined}
								<p class="font-bold">This country has no capital city</p>
							{:else}
								<p class="font-bold">{country[0].capital[0]}</p>
							{/if}
						</div>
						<div>
							<span><h1>Region</h1></span>
							<p class="font-bold">{country[0].region}</p>
						</div>
					</div>
					<div class="grid grid-cols-3 gap-2">
						<div>
							<span><h1>Currencies</h1></span>
							<p class="font-bold ">{currenciesname}</p>
						</div>
						<div class="col-span-2">
							<span><h1>Symbol</h1></span>
							<p class="font-bold ">{currenciessymbol}</p>
						</div>
					</div>
					<div class="grid grid-cols-3 gap-2">
						<div>
							<span><h1>Language</h1></span>
							<p class="font-bold">
								{#each langArray as language}
									<h1>- {language}</h1>
								{/each}
							</p>
						</div>
						<div class="col-span-2">
							<span><h1>Population</h1></span>
							<p class="font-bold ">{country[0].population}</p>
						</div>
					</div>
				</section>
			</aside>
		</article>
	</main>
</section>

<div class="flex-grow" />

<script>
	export let country;
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	let isInView;
</script>

<div
	use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
	on:change={({ detail }) => {
		isInView = detail.inView;
	}}
>
	{#if isInView}
		<a in:fade class="block" href="./countries/{country.name.official}">
			<img
				class="object-fill w-full h-56 shadow-xl rounded-xl"
				src={country.flag}
				alt={country.name.common}
			/>

			<div class="p-4">
				<h5 class="text-xl font-bold text-[#D1D5DB]">
					{country.name.official}
				</h5>
			</div>
		</a>
	{/if}
</div>

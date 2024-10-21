<script lang="ts">
	import { COUNTRIES } from './countries';
	import Graph from '$lib/components/ownk/D3Line.svelte';
	import Dropdown from '$lib/components/ownk/Dropdown.svelte';
	let country = '';

	$: COUNTRIES.map((d) => d.name).includes(country);

	export let form;

	import { enhance } from '$app/forms';

	let w = 0;
	let h = 0;

	let disabled = true;

	const handleChange = (e: any) => {
		if (!COUNTRIES.map((d) => d.name).includes(e.detail)) return (disabled = true);

		disabled = false;
	};
</script>

<div class="m-auto w-[100%] max-w-[720px]">
	<h1 class="text-skin-heading">GDP per capita tracker</h1>
	<form
		class="grid grid-cols-[1fr_auto] gap-[10px] pb-5 pt-5"
		method="POST"
		use:enhance
		autocomplete="off"
	>
		<Dropdown
			placeholder="United Kingdom"
			label="Select a country"
			data={COUNTRIES.map((d) => d.name)}
			on:select={handleChange}
		/>
		<button
			{disabled}
			class="bg-skin-foreground text-skin-paragraph hover:shadow-l flex h-[50px] items-center self-end rounded px-4 text-xl font-bold shadow"
			type="submit"
		>
			<div>&#x2192;</div>
		</button>
	</form>
</div>

<div class="bg-skin-foreground flex min-h-[400px] place-content-center p-5">
	{#if form?.error_message}
		<div class="text-skin-paragraph text-s flex w-full place-items-center justify-center">
			<p>We were unable to fetch the requested data. Please try again later</p>
		</div>
	{/if}

	{#if form?.data}
		<div class="w-full max-w-[720px]">
			<h2 class="text-skin-heading">GDP per capita (current US$), {form.data[0].country}</h2>
			<div class="h-[400px]" bind:clientWidth={w} bind:clientHeight={h}>
				{#if w > 0}
					<Graph data={form.data} x="date" y="value" width={w} height={h} />
				{/if}
			</div>
			<span class="text-skin-paragraph text-xs"
				>Source: <a href="https://worldbank.org">World Bank</a></span
			>
		</div>
	{/if}
</div>

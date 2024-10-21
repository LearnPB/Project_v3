<script lang="ts">
	import { onMount } from 'svelte';
	import MultiSelect from 'svelte-multiselect';
	import MultiSelects from '$lib/components/multiSelects.svelte';
	import type { PlayerOption } from '$lib/server/sql/dbIndex';
	import { goto } from '$app/navigation';

	let selected: PlayerOption[] = [];
	let maxOptions = 3;
	let players: PlayerOption[] = [];

	onMount(async () => {
		const response = await fetch('/api/players');
		if (response.ok) {
			players = await response.json();
		} else {
			console.error('Failed to load players');
		}
	});

	function comparePlayers() {
		if (selected.length < 2) {
			alert('Please select at least two players to compare.');
			return;
		}
		const playersParam = selected
			.map((p) => `${p.nameId},${encodeURIComponent(p.playerNameHyphen)}`)
			.join(',');
		goto(`/compare?players=${playersParam}`);
	}
</script>

<label for="players">
	<strong>Select players to compare:</strong>
</label>
<MultiSelect
	id="players"
	options={players}
	placeholder="Select players"
	{maxOptions}
	allowEmpty={false}
	{selected}
	maxSelect={5}
	noMatchingOptionsMsg="No matching players found"
>
	<MultiSelects let:option {option} slot="selected" />
	<PlayerSlot let:option {option} slot="option" />
</MultiSelect>

<button on:click={comparePlayers}>Compare</button>

<label>
	maxOptions
	<input type="range" min="2" max="10" bind:value={maxOptions} />
	{maxOptions} <small>(minimum 2)</small>
</label>

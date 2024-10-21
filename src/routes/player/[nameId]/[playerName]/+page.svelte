<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import PlayerCard from '$lib/components/PlayerCard.svelte';

	console.log(data);
	let player = data.player;
</script>

<main>
	<PlayerCard {player} />
</main>

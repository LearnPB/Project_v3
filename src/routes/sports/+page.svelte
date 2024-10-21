<script lang="ts">
	import Cricket from '$lib/components/Cricket.svelte';
	import { cricket } from './sports';

	// Find the player with the most centuries
	const maxCenturiesPlayer = cricket.reduce((prev, current) =>
		prev.centuries > current.centuries ? prev : current
	);
	console.log(maxCenturiesPlayer);
	// Find the player with the most matches
	const maxMatchesPlayer = cricket.reduce((prev, current) =>
		prev.matches > current.matches ? prev : current
	);
	console.log(maxMatchesPlayer);
	// Find the player with the least centuries
	const minCenturiesPlayer = cricket.reduce((prev, current) =>
		prev.centuries < current.centuries ? prev : current
	);
	console.log(minCenturiesPlayer);
	// Comparison text
	let comparisonText = `${maxCenturiesPlayer.player_name} scored the most centuries (${maxCenturiesPlayer.centuries}) but played fewer matches (${maxCenturiesPlayer.matches}) than ${maxMatchesPlayer.player_name}, who played the most matches (${maxMatchesPlayer.matches}) but scored ${maxMatchesPlayer.centuries} centuries.`;
</script>

<p>{comparisonText}</p>

<Cricket
	player_name={maxCenturiesPlayer.player_name}
	matches={maxCenturiesPlayer.matches}
	centuries={maxCenturiesPlayer.centuries}
	half_centuries={maxCenturiesPlayer.half_centuries}
	year={maxCenturiesPlayer.year}
/>

<Cricket
	player_name={maxMatchesPlayer.player_name}
	matches={maxMatchesPlayer.matches}
	centuries={maxMatchesPlayer.centuries}
	half_centuries={maxMatchesPlayer.half_centuries}
	year={maxMatchesPlayer.year}
/>

<Cricket
	player_name={minCenturiesPlayer.player_name}
	matches={minCenturiesPlayer.matches}
	centuries={minCenturiesPlayer.centuries}
	half_centuries={minCenturiesPlayer.half_centuries}
	year={minCenturiesPlayer.year}
/>

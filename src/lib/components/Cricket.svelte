<script lang="ts">
	export let player_name: string;
	export let matches: number;
	export let centuries: number;
	export let half_centuries: number;
	export let year: number;
</script>

<p>
	Player <strong>{player_name}</strong> has played {matches} matches.
</p>
{#if centuries > 0}
	<p>
		{player_name} has scored {centuries} centuries.
	</p>
{:else}
	<p>
		{player_name} has not scored any centuries.
	</p>
{/if}
{#if half_centuries > 0}
	<p>
		{player_name} has scored {half_centuries} half-centuries.
	</p>
{:else}
	<p>
		{player_name} has not scored any half-centuries.
	</p>
{/if}
<p>
	Last recorded year of play: {year}.
</p>

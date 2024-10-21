<script lang="ts">
	export let scale: d3.ScaleLinear<number, number, never>;
	export let numTicks: number = 8;
	export let left: number = 0;
	export let width: number = 0;
	let ticks: number[];
	$: ticks = scale.ticks(numTicks);
</script>

<g class="gridrows">
	{#each ticks as tick}
		<g transform="translate({left}, {scale(tick)})">
			<line x1={0} x2={width} />
		</g>
	{/each}
</g>

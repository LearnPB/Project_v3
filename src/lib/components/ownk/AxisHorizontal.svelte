<script lang="ts">
	import type { ScaleLinear } from 'd3-scale';

	export let scale: ScaleLinear<number, number>;
	export let numTicks: number = 8;
	export let top: number = 0;

	let ticks: number[] = [];
	$: ticks = scale.ticks(numTicks);
</script>

<g class="axis x-axis">
	<line x1={0} x2={scale.range()[1]} y1={top} y2={top} />
	{#each ticks as tick}
		<g class="tick tick-{tick}" transform="translate({scale(tick)}, {top})">
			<line y2={6} />
			<text text-anchor="middle" y={20}>{tick}</text>
		</g>
	{/each}
</g>

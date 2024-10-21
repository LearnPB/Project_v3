<script lang="ts">
	export let scale: any;
	export let numTicks = 8;
	export let left = 0;
	export let format: (n: number | { valueOf(): number }) => any = (n) => n;

	// Initialize an array to hold the scale ticks
	let ticks: [] = [];

	// Whenever the 'numTicks' or 'scale' changes, update the 'ticks' array with the new scale ticks
	$: ticks = scale.ticks(numTicks);
</script>

<!-- The <g> element with classes axis and y-axis groups all the SVG elements related to the y-axis. -->
<g class="axis y-axis">
	<!-- Draw a vertical line for the y-axis using the scale range -->
	<line x={0} y={0} y2={scale.range()[0]} />

	<!-- Iterate over each tick in the 'ticks' array -->
	{#each ticks as tick}
		<!-- For each tick, create a group element with a class of 'tick' and a unique class based on the tick value -->
		<!-- The group element is translated along the y-axis according to the scale of the tick -->
		<g class="tick tick-{tick}" transform="translate({left}, {scale(tick)})">
			<!-- Draw a small horizontal line to the left of the y-axis at the tick position -->
			<line x2={-6} />
			<!-- Add a text element to the left of the tick line, vertically centered, displaying the formatted tick value -->
			<text text-anchor="end" x={-9} alignment-baseline="middle">{format(tick)}</text>
		</g>
	{/each}
</g>

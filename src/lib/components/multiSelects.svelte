<script>
	export let options;
	export let selected;
	export let placeholder;
	export let maxOptions;

	export let height = `20px`;
	export let width = `20px`; // Set the width
	export let gap = '5pt';

	let hidden = false;
	export let src;
	// default back to visible every time src changes to see if the image loads successfully
	$: src, (hidden = false);
</script>

<div>
	<span style:gap>
		<img {src} {height} {width} alt={options} {hidden} on:error={() => (hidden = true)} />
		{options}
	</span>
</div>

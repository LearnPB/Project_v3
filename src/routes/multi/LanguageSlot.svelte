<script>
	export let option;
	export let height = `20px`;
	export let width = `20px`; // Set the width
	export let gap = '5pt';

	$: lang = option.toLowerCase().replaceAll(`+`, `plus`).replace(`#`, `sharp`);

	$: src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`;

	let hidden = false;
	// default back to visible every time src changes to see if the image loads successfully
	$: src, (hidden = false);
</script>

<div>
	<span style:gap>
		<img {src} {height} {width} alt={option} {hidden} on:error={() => (hidden = true)} />
		{option}
	</span>
</div>

<style>
	span {
		display: flex;
		align-items: center; /* Aligns text and image vertically */
	}
</style>

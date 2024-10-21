<!-- <script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { createEventDispatcher } from 'svelte';

	let searchTerm = '';
	let timer: NodeJS.Timeout;

	const dispatch = createEventDispatcher();

	function handleInput(e: Event) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const target = e.target as HTMLInputElement;
			searchTerm = target.value;
			dispatch('search', { searchTerm });
		}, 300);
	}
</script> -->

<!-- <div class="overflow-x-auto">
	<Input
		type="search"
		class="input mb-5 search-bar"
		placeholder="Type a command or search..."
		bind:value={searchTerm}
		on:keyup={handleInput}
	/>
</div> -->

<!-- src/lib/components/SearchInput.svelte -->
<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte'; // Ensure Input is imported
	import type { Writable } from 'svelte/store'; // Type-only import for Writable

	export let searchTerm: Writable<string>; // Explicitly type searchTerm
	export let handleInput: (e: Event) => void;
</script>

<Input
	type="search"
	class="input search-bar mb-5"
	placeholder="Type a command or search..."
	bind:value={$searchTerm}
	on:keyup={handleInput}
/>

<!-- Use $ to access the store's value -->

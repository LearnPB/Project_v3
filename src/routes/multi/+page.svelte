<script>
	import MultiSelect from 'svelte-multiselect';
	import LanguageSlot from './LanguageSlot.svelte';
	import { languages } from './options';
	let selected;
	let maxOptions = 1;
</script>

<label for="colors">
	<strong>What programming languages do you know?</strong>
</label>
<MultiSelect
	id="languages"
	options={languages}
	placeholder="What languages do you know?"
	{maxOptions}
	allowEmpty={true}
	selected={['Python']}
	maxSelect={3}
	noMatchingOptionsMsg="No matching options fff"
>
	<LanguageSlot let:option {option} slot="selected" />
	<LanguageSlot let:option {option} slot="option" />
</MultiSelect>

<!-- Two way bining -->

<label>
	maxOptions <input type="range" min="0" max={10} bind:value={maxOptions} />
	{maxOptions} <small>(0 means no limit)</small>
</label>

<!-- duplicates: boolean = false 
-->

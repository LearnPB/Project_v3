<script lang="ts">
	export let data: string[];
	export let label: string;
	export let placeholder: string;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let inputValue: string = '';
	let filteredValues: string[] | [] = [];

	function filterSelections() {
		let storageArr: string[] | [] = [];
		if (inputValue) {
			data.forEach((d) => {
				if (d.toLowerCase().startsWith(inputValue.toLowerCase())) {
					storageArr = [...storageArr, d];
				}
			});
		}

		filteredValues = storageArr;
	}

	$: if (!inputValue) {
		filteredValues = [];
		hiLiteIndex = null;
	}

	const setInputVal = (val: string) => {
		filteredValues = [];
		hiLiteIndex = null;
		document.querySelector('#auto-input').focus();
		inputValue = val;
		dispatch('select', inputValue);
	};

	let hiLiteIndex: any = null;

	const navigateList = (e: KeyboardEvent) => {
		if (e.key === 'ArrowDown' && hiLiteIndex <= filteredValues.length - 1) {
			hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
		} else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
			hiLiteIndex === 0 ? (hiLiteIndex = filteredValues.length - 1) : (hiLiteIndex -= 1);
		} else if (e.key === 'Enter') {
			setInputVal(filteredValues[hiLiteIndex]);
		} else {
			return;
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<div>
	<div class="autocomplete">
		<label class="text-skin-paragraph block font-bold" for="country">{label}</label>
		<input
			class="outline-skin-outline w-[100%] rounded p-2 shadow-md outline"
			id="auto-input"
			type="text"
			name="code"
			{placeholder}
			bind:value={inputValue}
			on:input={filterSelections}
		/>
	</div>
	{#if filteredValues.length > 0}
		<div class="relative">
			<ul
				class="absolute z-10 max-h-[200px] w-[100%] overflow-y-auto shadow"
				id="autocomplete-items-list"
			>
				{#each filteredValues as val, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<li
						class={`${
							i === hiLiteIndex ? 'bg-blue-100' : 'bg-white'
						} border-skin-outline border-t p-2`}
						on:click={() => setInputVal(val)}
					>
						{val}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

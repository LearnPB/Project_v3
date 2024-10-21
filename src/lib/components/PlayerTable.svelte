<script lang="ts">
	import type { Player } from '$lib/server/sql/dbTypes';
	import type { Writable } from 'svelte/store'; // Type-only import for Writable

	export let players: Writable<Player[]>; // Explicitly type players
	export let handleNavigation: (event: Event, nameId: number, playerName: string) => void;
</script>

<table class="table-auto min-w-full divide-y divide-gray-200">
	<thead class="bg-gray-50">
		<tr>
			<th
				class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
			>
				Players
			</th>
			<th
				class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
			>
				Pay (MM)
			</th>
		</tr>
	</thead>
	<tbody class="bg-white divide-y divide-gray-200">
		{#each $players as { playerName, totalPay, nameId }}
			<tr>
				<td class="px-6 py-4 whitespace-nowrap text-left">
					<a
						href={`/player/${nameId}-${playerName.replace(/ /g, '-').toLowerCase()}`}
						class="text-sm font-medium text-blue-600 hover:underline"
						on:click={(event) => handleNavigation(event, nameId, playerName)}
					>
						{playerName}
					</a>
				</td>
				<td class="px-6 py-4 whitespace-nowrap text-left">
					${((totalPay || 0) / 1000000).toLocaleString('en-US')}
				</td>
			</tr>
		{:else}
			<tr>
				<td colspan="2" class="px-6 py-4 whitespace-nowrap text-center text-gray-500">
					No players found
				</td>
			</tr>
		{/each}
	</tbody>
</table>

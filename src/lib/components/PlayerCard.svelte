<script lang="ts">
	import { onMount } from 'svelte';

	export let player;
	let imagePromise: Promise<string>;

	onMount(() => {
		imagePromise = loadImage(player.Imageurl);
	});

	function loadImage(url: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.src = url;

			img.onload = () => {
				resolve(url);
			};

			img.onerror = () => {
				reject(new Error('Failed to load image'));
			};
		});
	}
</script>

<div class="card">
	{#await imagePromise}
		<div class="loading">
			<div class="loading-spinner"></div>
		</div>
	{:then url}
		<img src={url} alt={player.playerName} />
	{:catch}
		<div class="image-placeholder">Image not available</div>
	{/await}

	<h1>{player.playerName}</h1>
	<p>Name ID: {player.nameId}</p>
	<p>Nation: {player.nation}</p>
	<p>Player Pay: {player.playerPay}</p>
</div>

<!-- Without {#await ...} Syntax: -->
<!-- <script lang="ts">
	import { onMount } from 'svelte';

	export let player;
	let imageError = false;
	let isLoading = true;

	onMount(() => {
		const img = new Image();
		img.src = player.Imageurl;

		img.onload = () => {
			isLoading = false;
			console.log('Image loaded successfully');
		};

		img.onerror = () => {
			isLoading = false;
			imageError = true;
			console.log('Failed to load image');
		};
	});
</script>

<div class="card">
	{#if isLoading}
		<div class="loading">
			<div class="loading-spinner"></div>
		</div>
	{/if}
	{#if !imageError && !isLoading}
		<img src={player.Imageurl} alt={player.playerName} />
	{:else if imageError}
		<div class="image-placeholder">Image not available</div>
	{/if}

	<h1>{player.playerName}</h1>
	<p>Name ID: {player.nameId}</p>
	<p>Nation: {player.nation}</p>
	<p>Player Pay: {player.playerPay}</p>
</div> -->

<style>
	.card {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 16px;
		max-width: 300px;
		margin: 16px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card img {
		width: 100%;
		height: auto;
		border-radius: 8px 8px 0 0;
	}

	.card h1 {
		font-size: 1.5rem;
		margin-top: 0;
	}

	.card p {
		margin: 0.5rem 0;
	}

	.loading,
	.image-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 200px;
		background-color: #f0f0f0;
		border-radius: 8px 8px 0 0;
	}

	.loading-spinner {
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* Responsive Styling */
	@media screen and (max-width: 600px) {
		.card {
			max-width: 100%;
		}
	}
</style>

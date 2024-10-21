<script lang="ts">
	import '../app.css';
	import * as Menubar from '$lib/components/ui/menubar';
</script>

<Menubar.Root class="mb-10">
	<Menubar.Menu>
		<a href="/ownk">
			<Menubar.Trigger>OWNK</Menubar.Trigger>
		</a>
		<a href="/multi">
			<Menubar.Trigger>MULTI</Menubar.Trigger>
		</a>
		<a href="/sports">
			<Menubar.Trigger>Sports</Menubar.Trigger>
		</a>
		<a href="/">
			<Menubar.Trigger>Home</Menubar.Trigger>
		</a>
	</Menubar.Menu>
</Menubar.Root>

<slot></slot>

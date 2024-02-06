<script>
	import { fly } from 'svelte/transition';

	export let showDialog = false;
	export let title = '';
	export let message = '';
	export let id = '';

	/**
	 * @type {() => any}
	 */
	export let closeDialog;
</script>

{#if showDialog}
	<dialog open>
		<article in:fly={{ y: 250 }} out:fly={{ y: 250 }}>
			<a
				href="#close"
				aria-label="Close"
				class="close"
				on:click|preventDefault={() => closeDialog()}
			></a>
			<h3>{title}</h3>
			<p>{message}</p>
			<footer>
				<div class="grid">
					<button class="secondary" on:click|preventDefault={() => closeDialog()}>Batal</button>
					<button type="submit" form={id}>Yakin!</button>
				</div>
			</footer>
		</article>
	</dialog>
{/if}

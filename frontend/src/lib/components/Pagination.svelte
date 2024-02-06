<script>
	/**
	 * @type {number}
	 */
	export let currentPage;

	/**
	 * @type {number}
	 */
	export let totalPages;

	const range = (/** @type {number} */ start, /** @type {number} */ end) =>
		Array.from({ length: end - start + 1 }, (_, i) => start + i);
</script>

{#if totalPages > 0}
	<nav>
		<ul>
			<li>
				<a
					role="button"
					href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
					class={currentPage === 1 ? 'disabled secondary' : ''}
				>
					Previous
				</a>
			</li>
			{#each range(1, totalPages) as page (page)}
				<li>
					<a role="button" href="?page={(currentPage = page)}">{page}</a>
				</li>
			{/each}
			<li>
				<a
					role="button"
					href="?page={currentPage < totalPages ? currentPage + 1 : currentPage}"
					class={currentPage === totalPages ? 'disabled secondary' : ''}>Next</a
				>
			</li>
		</ul>
		<div>
			<span class="ml-2">Page {currentPage} of {totalPages}</span>
		</div>
	</nav>
{/if}

<style>
	.disabled {
		cursor: not-allowed;
		pointer-events: none;
	}
</style>

<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import Pagination from '$lib/components/Pagination.svelte';
	import { goto } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';

	let deleteAll = false;
	let deleteOne = false;

	function openDialogDeleteAll() {
		deleteAll = !deleteAll;
	}

	function openDialogDeleteOne() {
		deleteOne = !deleteOne;
	}

	export let data;

	// Form Submit
	const handleSubmit = () => {
		// @ts-ignore
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success(result.data.message);
					break;
				case 'failure':
					toast.error(result.data.message);
					break;
				default:
					break;
			}
			await update();
			goto('/');
			deleteAll = deleteOne = false;
		};
	};

	// Data
	$: ({ users } = data);
	$: ({ user } = data);
	$: total = users.total;

	// Pagination
	$: currentPage = Number($page.url.searchParams.get('page'));
	$: totalPages = Math.ceil(total / 5);
</script>

<Toaster richColors position="bottom-center" />

<!-- Delete All -->
<Dialog
	showDialog={deleteAll}
	id="formDeleteAll"
	title="Are you sure?"
	message="All of your data, will be deleted!."
	closeDialog={openDialogDeleteAll}
/>

<!-- Delete One -->
<Dialog
	showDialog={deleteOne}
	id="formDeleteOne"
	title="Are you sure?"
	message="Your data will be deleted!."
	closeDialog={openDialogDeleteOne}
/>

<div class="grid">
	<article>
		{#if total > 0}
			<form id="formDeleteAll" action="?/delete_all" method="post" use:enhance={handleSubmit}>
				<button type="button" on:click={() => openDialogDeleteAll()}>Delete all</button>
			</form>
		{/if}
		<figure>
			<table role="grid">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Phone Number</th>
						<th scope="col">Address</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{#each users.data as item, i}
						<tr>
							<td>{(i += 1)}</td>
							<td>{item.name}</td>
							<td>{item.phone}</td>
							<td>{item.address}</td>
							<td>
								<a href="?id={item.id}" role="button">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-pencil-fill"
										viewBox="0 0 16 16"
									>
										<path
											d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"
										/>
									</svg>
								</a>
								<form
									action="?/delete&id={item.id}"
									method="post"
									id="formDeleteOne"
									use:enhance={handleSubmit}
								>
									<button type="button" class="secondary" on:click={() => openDialogDeleteOne()}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-trash-fill"
											viewBox="0 0 16 16"
										>
											<path
												d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
											/>
										</svg>
									</button>
								</form>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="5" class="text-center">No data</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</figure>
		<Pagination {currentPage} {totalPages} />
	</article>
	<article>
		<form
			action={user?.data?.name ? `?/update&id=${user?.data?.id}` : '?/create'}
			method="post"
			use:enhance={handleSubmit}
		>
			<label for="name">
				Fullname
				<input
					type="text"
					id="name"
					name="name"
					placeholder="Fullname"
					value={user?.data?.name ? user?.data?.name : ''}
					required
				/>
			</label>
			<label for="phone">
				Phone Number
				<input
					type="number"
					id="phone"
					name="phone"
					placeholder="Phone Number"
					value={user?.data?.phone ? user?.data?.phone : ''}
					required
				/>
			</label>
			<label for="address">
				Address
				<input
					type="text"
					id="address"
					name="address"
					placeholder="Address"
					value={user?.data?.address ? user?.data?.address : ''}
					required
				/>
			</label>
			<button type="submit">{user?.data?.name ? 'Update' : 'Create'}</button>
			{#if user?.data?.name}
				<hr />
				<button class="secondary" type="button" on:click={() => goto('/')}>Reset</button>
			{/if}
		</form>
	</article>
</div>

<style>
	.text-center {
		text-align: center;
	}
</style>

import { writable, readable } from 'svelte/store'

export let searchRequest = writable();
export let selectedTicketId = writable();
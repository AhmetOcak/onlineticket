<!-- Ahmet Ocak -->
<script>
    import axios from 'axios';
    import { onMount } from 'svelte';

    let currencyUrl = 'https://otbapi.azure-api.net/v1/api/Currency_Units';
    let currencies = [];

    onMount(async () => {
        try{
            currencies = await (await axios.get(currencyUrl)).data[0].currencyUnit;
        } catch(e) {
            console.log(e);
        }
    });


</script>

<main>
    <select class="form-select form-select-sm bg-dark" aria-label=".form-select-sm example">
        {#each currencies as currency}
        <option selected>{currency}</option>
        {:else}
        <option value="2">Loading</option>
        {/each}
    </select>
</main>

<style>
    .form-select {
        color: #9fa1a3;
        border-color: #9fa1a3;
    }
</style>
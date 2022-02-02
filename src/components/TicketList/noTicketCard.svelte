<!-- Ahmet Ocak -->
<script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    let pageData = " ";

    onMount(async () => {
            try{
                pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/TicketCard/61f91d50b4961311f09c29d4")).data.text;
            }catch(e) {
            console.log(e);
            } 
        });
</script>

<main>
    <div class="card text-dark bg-light mb-3">
        <div class="card-header fs-4 d-flex flex-row justify-content-between">
            <p>
                {#if pageData[7] != null}
                    {pageData[7]}
                {/if}
            </p>
        </div>
    </div>
</main>

<style>
</style>
<!--Ahmet Ocak -->
<script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    export let companyName;
    export let userName;
    export let ticketID;
    export let billPrice;
    export let date;
    export let purchasePlace;

    let text = "";

    onMount(async () => {
        try {
            text = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/BillPage/61f91de4b4961311f09c29d5")).data.billCard;
        } catch(e) {
            toast.push('Ağ Hatası!', {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                });
            console.log(e);
        }
    });
</script>

<main>
    <div class="card text-light bg-secondary mb-3">
        <div class="card-header fs-4">{companyName}</div>
        <div class="card-body">
            <h5 class="card-title">
                {#if text[0] != null}
                    {text[0]} {userName}
                {/if}  
            </h5>
            <p class="card-text">
                {#if text[1] != null}
                    {text[1]} {ticketID}
                {/if}
            </p>
            <p class="card-text">
                {#if text[2] != null}
                    {text[2]} {billPrice} TL
                {/if}
            </p>
            <p class="card-text">
                {#if text[3] != null}
                    {text[3]} {date}
                {/if}
            </p>
            <p class="card-text">
                {#if text[4] != null}
                    {text[4]} {purchasePlace}
                {/if}
            </p>
        </div>
    </div>
</main>

<style>
    
</style>
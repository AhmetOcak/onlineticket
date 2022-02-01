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
            <h5 class="card-title">{text[0]} {userName}</h5>
            <p class="card-text">{text[1]} {ticketID}</p>
            <p class="card-text">{text[2]} {billPrice} TL</p>
            <p class="card-text">{text[3]} {date}</p>
            <p class="card-text">{text[4]} {purchasePlace}</p>
        </div>
    </div>
</main>

<style>
    
</style>
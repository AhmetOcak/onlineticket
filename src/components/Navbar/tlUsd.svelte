<!-- Ahmet Ocak -->
<script>
    import axios from 'axios';
    import { onMount } from 'svelte';

    let currencyUrl = 'https://onlineticketbackendapi.azure-api.net/v1/api/Currency_Units';
    let currencies = [];
    let defaultCurrency = "TL";

    onMount(async () => {
        if(getCookie("currency") == null) {
            document.cookie = `currency=${defaultCurrency}`;
        }
        try{
            currencies = await (await axios.get(currencyUrl)).data[0].currencyUnit;
            console.log(currencies);
        } catch(e) {
            console.log(e);
        }
    });

    function getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [key,value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }

</script>

<main>
    <!-- svelte-ignore missing-declaration -->
    <select id="select" class="form-select form-select-sm bg-dark" aria-label=".form-select-sm example" on:click={() => {
        let currency = select.value;
        document.cookie = `currency=${currency}`;
    }}>
        {#if getCookie("currency") == "EURO"}
        <option selected>{currencies[0]}</option>
        <option>{currencies[1]}</option>
        <option>{currencies[2]}</option>
        {:else if getCookie("currency") == "USD"}
        <option>{currencies[0]}</option>
        <option selected>{currencies[1]}</option>
        <option>{currencies[2]}</option>
        {:else if getCookie("currency") == "TL"}
        <option>{currencies[0]}</option>
        <option>{currencies[1]}</option>
        <option selected>{currencies[2]}</option>
        {:else}
        <option>{defaultCurrency}</option>
        {/if}
    </select>
</main>

<style>
    .form-select {
        color: #9fa1a3;
        border-color: #9fa1a3;
    }
</style>
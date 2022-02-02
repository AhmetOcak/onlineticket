<!-- Ahmet Ocak -->
<script>
    import { push } from "svelte-spa-router";
    import { selectedTicketId } from "../../store"
    import { onMount } from 'svelte';
    import axios from 'axios';

    export let companyName;
    export let departureTime;
    export let durationTime;
    export let arrivalTime;
    export let price;
    export let pushPage;
    export let departurePlace;
    export let arrivalPlace;
    export let showButton = false;
    export let cancelTheTicket = false;
    export let id;

    let exchangeRate = 0;
    let pageData = " ";
    
    function getCookie(cookieName) {    
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
    }

    async function getExchangeRate() {
        if(getCookie("currency") == "TL") {
            exchangeRate = (await axios.get('https://onlineticketbackendapi.azure-api.net/v1/api/ExchangeRate/61f809af6a1589b78639c53b')).data.rate;
            return exchangeRate;
        }else if(getCookie("currency") == "USD") {
            exchangeRate = (await axios.get('https://onlineticketbackendapi.azure-api.net/v1/api/ExchangeRate/61f80a0ba789e7ab01ddf744')).data.rate;
            return exchangeRate;
        }else {
            exchangeRate = (await axios.get('https://onlineticketbackendapi.azure-api.net/v1/api/ExchangeRate/61f80a35a789e7ab01ddf745')).data.rate;
            return exchangeRate;
        }
    }

    onMount(async () => {
        try{
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/TicketCard/61f91d50b4961311f09c29d4")).data.text;
            price = price / (await getExchangeRate());
            price = Number(price).toFixed(2);
        }catch(e) {
            price = "Ağ hatası";
            console.log(e);
        } 
    });


</script>

<main>
    <div class="card text-dark bg-light mb-3">
        <div class="card-header fs-4 d-flex flex-row justify-content-between">
            {companyName}
            {#if cancelTheTicket}
                <button type="button" class="btn btn-danger p-3 fs-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    {#if pageData[0] != null}
                        {pageData[0]}
                    {/if}
                </button>
            {/if}
        </div>
        <div class="card-body d-flex flex-row justify-content-between">
            <div class="d-flex align-item-center">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h4>
                        {#if pageData[1] != null}
                            {pageData[1]}
                        {/if}
                    </h4>
                    <p>{departureTime}</p>
                </div>
            </div>
            <div class="d-flex align-item-center">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h4>
                        {#if pageData[2] != null}
                            {pageData[2]}
                        {/if}
                    </h4>
                    <p>{durationTime}</p>
                </div>
            </div>
            <div class="d-flex align-item-center">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h4>
                        {#if pageData[3] != null}
                            {pageData[3]}
                        {/if}
                    </h4>
                    <p>{arrivalTime}</p>
                </div>
            </div>
            <div class="d-flex align-item-center">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h4>
                        {#if pageData[4] != null}
                            {pageData[4]}
                        {/if}
                    </h4>
                    <p>{price + " " + getCookie("currency")}</p>
                </div>
            </div>
            {#if showButton} 
                <button type="button" class="btn btn-dark" id="pushButton" on:click={() => {
                    $selectedTicketId = id;
                    push(pushPage);
                }}>Seç</button>
            {/if}
        </div>
        {#if cancelTheTicket}
            <div class="d-flex flex-row justify-content-between ms-3 me-3">
                <div class="d-flex flex-column justify-content-center align-item-center">
                    <h4>
                        {#if pageData[5] != null}
                            {pageData[5]}
                        {/if}
                    </h4>
                    <p>{departurePlace}</p>
                </div>
                <div class="d-flex flex-column justify-content-center align-item-center">
                    <h4>
                        {#if pageData[6] != null}
                            {pageData[6]}
                        {/if}
                    </h4>
                    <p>{arrivalPlace}</p>
                </div>
            </div>
        {/if}
    </div>
</main>

<style>
    p{
        font-size: 20px;
    }

    #pushButton {
        width: 80px;
        border-top-right-radius: 100%;
        border-bottom-right-radius: 100%;
    }
</style>
<!-- Ahmet Ocak -->
<script>
    import Navbar from '../components/Navbar/navbar.svelte';
    import BuyTicket from '../components/BuyTicket/buyTicket.svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';

    let balance = 0;
    let exchangeRate = 0;
    let pageData = " ";
    let pageImage = " ";
    
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
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/WalletPage/61f91c3db4961311f09c29d3")).data.text;
            pageImage = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/WalletPage/61f91c3db4961311f09c29d3")).data.images;
            let walletUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/Wallets/${getCookie("userId")}`;
            balance = (await axios.get(walletUrl)).data.balance;
            balance = balance / (await getExchangeRate());
            balance = Number(balance).toFixed(2);
        }catch(e) {
            balance = "Ağ hatası";
            console.log(e);
        } 
    });

</script>

<main>
    <div class="section pb-5" style="background-image: url({pageImage[1]});">
        <Navbar />
        <div class="section1 d-flex flex-row justify-content-around align-items-center pt-5">
            <div class="text-white">
                <h4 class="pt-4">
                    {#if pageData[0] != null}
                        {pageData[0]}
                    {/if}
                </h4>
                <h3>
                    {#if pageData[1] != null}
                        {pageData[1]}
                    {/if}
                </h3>
            </div>
            <div class="card text-dark mb-3 mt-4 p-3 d-flex flex-row" style="max-width: 20rem;" id="card">
                <div>
                    <img src={pageImage[0]} alt=""> 
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        {#if pageData[2] != null}
                            {pageData[2]}
                        {/if}
                    </h5>
                    <p class="card-text text-primary fs-2">{balance + " " + getCookie("currency")}</p>
                </div>
            </div>
        </div>
        <div class="container mt-4">
            <ul class="list-group">
                <li class="list-group-item">
                    <div class="card text-dark text-white mb-3" id="paymentSection">
                        <div class="card-body">
                            <h5 class="card-title"><b class="fs-3">
                                {#if pageData[3] != null}
                                    {pageData[3]}
                                {/if}
                            </b></h5>
                            <p class="card-text fs-4">
                                {#if pageData[4] != null}
                                    {pageData[4]}
                                {/if}
                            </p>
                            <BuyTicket buttonText="Bakiye Ekle" walletPageButton=true/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</main>

<style>
    .section {
        width: 100%;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: auto;
    }

    .section1 {
        background-image: linear-gradient(to right, rgb(15, 12, 41, 0.9), rgb(48, 43, 99, 0.9), rgb(36, 36, 62, 0.9));
        width: 100%;
        height: 30vh;
    }

    #card {
        background-color: #F4F6FF;
    }

    #paymentSection {
        background-color: rgb(15, 12, 41, 0.7);
    }

    .list-group-item {
        background-color:rgb(255, 255, 255, 0.0);
        border: none;
    }
</style>
<!-- Ahmet Ocak -->
<script>
    import Navbar from '../components/Navbar/navbar.svelte';
    import BillCard from '../components/Bill/billCard.svelte';
    import NoBillCard from '../components/Bill/noBillCard.svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Spinner from '../components/LoadingSpinner/spinner.svelte';
    import { toast } from '@zerodevx/svelte-toast'

    let bills = [];
    let loading;
    let error = false;
    let title = "";

    function getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [key,value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }

    onMount(async () => {
        let userId = getCookie("userId");
        loading = true;
        try {
            bills = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/User_Bills/${userId}`)).data.bills;
            title = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/BillPage/61f91de4b4961311f09c29d5")).data.text;
            loading = false;
        } catch(e) {
            loading = false;
            error = true;
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
    <div class="section d-flex flex-column justify-content-center">
        <Navbar />
        <div class="container d-flex flex-column justify-content-start align-items-center">
            <h1 class="pt-3">
                {#if title[0] != null}
                    {title[0]}
                {/if}        
            </h1>
            <ul class="list-group">
                {#each {length: bills.length} as _, i}
                    <li>
                        <BillCard companyName={bills[i].companyName} userName={bills[i].userName} billPrice={bills[i].price} date={bills[i].purchaseDate} ticketID={i} purchasePlace={bills[i].purchasePlace}/>
                    </li>
                {:else}
                    {#if loading == true}
                        <Spinner />
                    {:else}
                        {#if error == true}
                            <li><NoBillCard text="Ağ Hatası" header="Hata"/></li> 
                        {:else}
                            <li><NoBillCard text="Herhangi bir bilet satın alma işleminiz olmadığından dolayı faturanız bulunmamaktadır" header="Faturanız bulunmamaktadır"/></li> 
                        {/if}
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</main>

<style>
    .section {
        width: 100%;
        height: 100vh;
        background-image: url("../assets/billBG.png");
        background-repeat: no-repeat;
        background-size: cover;
    }

    li {
        width: 800px;
        background-color: rgb(255, 255, 255, 0.8);
        padding: 20px;
        list-style: none;
    }
    
    .container {
        margin-top: 100px;
        overflow: auto;
        width: 900px;
        height: 70vh;
        background-color: rgb(255, 255,255, 0.5);
    }

    ul {
        padding-top: 50px;
        padding-bottom: 50px;
    }
</style>
<!-- Ahmet Ocak -->
<script>
    import Navbar from '../components/Navbar/navbar.svelte';
    import BillCard from '../components/Bill/billCard.svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';

    let bills = [];

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
        console.log(userId);
        try {
            bills = await (await axios.get(`https://otbapi.azure-api.net/v1/api/User_Bills/${userId}`)).data.bills;
            console.log(bills);
        } catch(e) {
            console.log(e);
        }
    });

</script>

<main>
    <div class="section d-flex flex-column justify-content-center">
        <Navbar />
        <div class="container  d-flex flex-column justify-content-start align-items-center">
            <h1 class="pt-3">Faturalarım</h1>
            <ul class="list-group">
                {#each {length: bills.length} as _, i}
                    <li>
                        <BillCard companyName={bills[i].companyName} userName={bills[i].userName} billPrice={bills[i].price} date={bills[i].purchaseDate} ticketID={bills[i].id} purchasePlace={bills[i].purchasePlace}/>
                    </li>
                {:else}
                    <li>Loading</li>
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
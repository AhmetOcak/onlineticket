<!-- Ahmet Ocak -->
<script>
    import TicketCard from '../../components/TicketList/ticketCard.svelte';
    import Navbar from '../../components/Navbar/navbar.svelte';
    import { searchRequest } from '../../store';
    import { onMount } from 'svelte';
    import axios from 'axios';


    let pushPath = '/buyPlaneTicketPage';
    let showButton = true;
    let searchResult = [];

    onMount(async () => {
        try {
            searchResult = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/Plane_Travels/${$searchRequest.departurePlace}/${$searchRequest.arrivalPlace}/${$searchRequest.date}`)).data;
            console.log(searchResult);
        }catch(e) {
            console.log(e);
        }
    });
</script>

<main>
    <div class="section d-flex flex-column justify-content-center">
        <Navbar />
        <div class="container  d-flex flex-column justify-content-start align-items-center">
            <ul class="list-group">
                {#each {length: searchResult.length} as _, i}
                <li class="list-group-item">
                    <TicketCard companyName={searchResult[i].companyName} departureTime={searchResult[i].departureTime} durationTime={searchResult[i].durationTime} arrivalTime={searchResult[i].arrivalTime} price={searchResult[i].price} pushPage={pushPath} showButton={showButton} id={searchResult[i].id}/>
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
        background-image: url("../assets/planeBG.png");
        background-repeat: no-repeat;
        background-size: cover;
    }

    li {
        width: 800px;
        background-color: rgb(255, 255,255, 0.7);
        padding: 20px;
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
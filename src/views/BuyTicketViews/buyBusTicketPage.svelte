<!-- Ahmet Ocak -->
<script>
    import Navbar from '../../components/Navbar/navbar.svelte';
    import TicketCard from '../../components/TicketList/ticketCard.svelte';
    import BuyTicket from '../../components/BuyTicket/buyTicket.svelte';
    import TicketCancelModal from '../../components/ticketCancelModal.svelte';
    import { selectedTicketId } from "../../store"
    import { onMount } from 'svelte';
    import axios from 'axios';
    
    let ticketInfo = [];

    onMount(async () => {
        try{
            ticketInfo[0] = await (await axios.get(`https://otbapi.azure-api.net/v1/api/Bus_Travels/${$selectedTicketId}`)).data;
            console.log(ticketInfo[0]);
        }catch(e) {
            console.log(e);
        }
    });

    
</script>

<main>
    <div class="section d-flex flex-column justify-content-center">
        <Navbar />
        <TicketCancelModal />
        <div class="container">
            <div class="ticketInfo mt-5">
                {#each ticketInfo as ticket}
                    <TicketCard companyName={ticket.companyName} departureTime={ticket.departureTime} durationTime={ticket.durationTime} arrivalTime={ticket.arrivalTime} price={ticket.price} arrivalPlace={ticket.arrivalPlace} departurePlace={ticket.departurePlace} cancelTheTicket=true/>
                {:else}
                <li>Loading</li>
                {/each}
            </div>
            <BuyTicket buttonText='Ödeme Yap' showUserInfo=true/>
        </div>
    </div>
</main>

<style>
    .section {
        width: 100%;
        height: 100vh;
        background-image: url("../assets/busBG.png");
        background-repeat: no-repeat;
        background-size: cover;
        overflow: auto;
    }

    .container {
        width: 50%;
        position: relative;
        margin-top: 100px;
    }
</style>
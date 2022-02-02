<!-- Ahmet Ocak -->
<script>
    import Navbar from '../../components/Navbar/navbar.svelte';
    import TicketCard from '../../components/TicketList/ticketCard.svelte';
    import BuyTicket from '../../components/BuyTicket/buyTicket.svelte';
    import TicketCancelModal from '../../components/ticketCancelModal.svelte';
    import { selectedTicketId } from "../../store"
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Spinner from '../../components/LoadingSpinner/spinner.svelte';
    import NoTicketCard from '../../components/TicketList/noTicketCard.svelte';

    let ticketInfo = [];
    let loading;

    let pageData = "";

    onMount(async () => {
        loading = true;
        try{
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/WebsiteData/61f920b048106f21e53235f8")).data.buyTicket;
            ticketInfo[0] = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/Bus_Travels/${$selectedTicketId}`)).data;
            loading = false;
        }catch(e) {
            console.log(e);
            loading = true;
        }
    });
</script>

<main>
    <div class="section d-flex flex-column justify-content-center" style="background-image: url({pageData[1]});">
        <Navbar />
        <TicketCancelModal />
        <div class="container">
            <div class="ticketInfo mt-5">
                {#each ticketInfo as ticket}
                    <TicketCard companyName={ticket.companyName} departureTime={ticket.departureTime} durationTime={ticket.durationTime} arrivalTime={ticket.arrivalTime} price={ticket.price} arrivalPlace={ticket.arrivalPlace} departurePlace={ticket.departurePlace} cancelTheTicket=true/>
                {:else}
                    {#if loading == true}
                        <div id="spinner">
                            <Spinner />
                        </div>
                    {:else}
                        <li><NoTicketCard /></li> 
                    {/if}
                {/each}
            </div>
            <BuyTicket buttonText={pageData[0]} showUserInfo=true travelType="0"/>
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

    .container {
        width: 50%;
        position: relative;
        margin-top: 100px;
    }

    #spinner {
        margin-left: 43%;
    }
</style>
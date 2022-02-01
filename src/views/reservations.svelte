<script>
    import Navbar from "../components/Navbar/navbar.svelte";
    import Reservations from "../components/ReservationsCard/reservations.svelte";
    import NoReservations from "../components/ReservationsCard/noReservationCard.svelte";
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Spinner from '../components/LoadingSpinner/spinner.svelte';
    import { toast } from '@zerodevx/svelte-toast'

    let reservations = [];
    let busTravels = [];
    let planeTravels = [];
    let travels = [];
    let loading;
    let error = false;

    let ib = 0; // otobüs için sayaç
    let lp = 0; // uçak için sayaç

    onMount(async () => {
      loading = true;
      try{
        reservations = (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/Tickets/${getCookie("userId")}`)).data.reservations;
        for(let i = 0; i < reservations.length; i++) {
          if(reservations[i].travelTypeId == 0) {
            busTravels[ib] = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/Bus_Travels/${reservations[i].id}`)).data;
            ib += 1;
          }else {
            planeTravels[lp] = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/Plane_Travels/${reservations[i].id}`)).data;
            lp += 1;
          }
        }
        loading = false;
        combiArrays();
      }catch(e) {
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

    let j = 0;
    function combiArrays() {
      for(let i = 0; i < busTravels.length; i++) {
        travels[i] = busTravels[i];
      }
      for(let i = busTravels.length; i < busTravels.length + planeTravels.length; i++) {
        travels[i] = planeTravels[j];
        j +=1;
      }
    }

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
    <Navbar/>
        <div class="text">
            <h1>Rezervasyonlarım</h1>
        </div>
        <div class="section">
            <ul class="box_seyehatlerim">
                {#each {length: travels.length} as _, i}
                  <li><Reservations arrivalPlace={travels[i].arrivalPlace} departurePlace={travels[i].departurePlace} arrivalTime={travels[i].arrivalTime} departureTime={travels[i].departureTime} transport={(travels[i].travelType)} passengerTc={reservations[i].passengerTc} travelId={reservations[i].id} r="Rezervasyon Id"/></li>
                {:else}
                    {#if loading == true}
                        <div id="spinner">
                          <Spinner /> 
                        </div>
                    {:else}
                        {#if error == true}
                            <li><NoReservations text="Ağ Hatası"/></li> 
                        {:else}
                            <li><NoReservations text="Rezervasyonunuz bulunmamaktadır"/></li> 
                        {/if}
                    {/if}
                {/each}
            </ul>
        </div>
</main>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

#spinner {
  margin-left: 45%;
  margin-top: 25%;
}

.section {
    width: 100%;
    height: 170vh;
    background-image: url("../assets/12345.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    font-family: "Poppins", sans-serif;
}

.text {
    text-align: left 10px;
    text-shadow: 1px 1px rgb(56, 56, 56);
    width: 50px;
    height: 50px;
    position: absolute;
    left: 410px;
    top: 130px;
    right: 30px;
    color: white;
}

.box_seyehatlerim {
    height: 900px;
    position: absolute;
    background: rgb(250, 249, 249);
    left: 400px;
    top: 180px;
    right: 400px;
    box-shadow: 0 0 20px 9px #44403e1f;
    border-radius: 5px;
    border-bottom: 1px solid #999;
    background-color: rgb(255, 255, 255, 0.5);
    list-style: none;
}
</style>

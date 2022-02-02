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
  let editedTravels = [];
  let loading;
  let error = false;
  let pageData = "";

  let ib = 0; // otobüs için sayaç
  let lp = 0; // uçak için sayaç

  onMount(async () => {
      loading = true;
      try{
        pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/WebsiteData/61f920b048106f21e53235f8")).data.myTravels;
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
        editTravels();
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

    function editTravels() {
      let j = 0;
      for(let i = 0; i < travels.length; i ++) {
        if(compareDate(travels[i].travelDate)) {
          editedTravels[j] = travels[i];
          j += 1;
        } 
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

    function getTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      return today;
    }

    function compareDate(travelDate) {
      let d1 = new Date(getTodayDate());
      let d2 = new Date(travelDate);
      return d1 > d2 ? true : false;
    }

</script>

<main>
    <Navbar/>
  <div class="text">
      <h1>
        {#if pageData[0] != null}
            {pageData[0]}
        {/if}
      </h1>
  </div>
  <div class="section" style="background-image: url({pageData[1]});">     
    <ul class="box_seyehatlerim">
      {#each {length: editedTravels.length} as _, i}
          <li><Reservations arrivalPlace={editedTravels[i].arrivalPlace} departurePlace={editedTravels[i].departurePlace} arrivalTime={editedTravels[i].arrivalTime} departureTime={editedTravels[i].departureTime} transport={(editedTravels[i].travelType)} passengerTc={reservations[i].passengerTc} travelId={(editedTravels[i].travelDate).substring(0, 10)} r="Yolculuk Tarihi"/></li>
            {:else}
                {#if loading == true}
                  <div id="spinner">
                      <Spinner /> 
                  </div>
            {:else}
                {#if error == true}
                      <li><NoReservations text="Ağ Hatası"/></li> 
                {:else}
                    <li><NoReservations text="Seyahatiniz bulunmamaktadır"/></li> 
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
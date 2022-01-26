<script>
    export let departurePlace;
    export let arrivalPlace;
    export let departureTime;
    export let arrivalTime;
    export let transport;
    export let passengerTc;
    export let travelId;

    function selectTransport() {
        if(transport == 0) {
            return "Otobüs";
        }else if(transport == 1){
            return "Uçak";
        }else {
            return "error";
        }
    }
</script>

<main>
    <div class="ticket1">
        <div class="d-flex flex-row justify-content-between align-items-center">
            <div id="tur" class="row justify-content-center mb-4">
                <h3 class="mt-2">{selectTransport()} Bileti</h3>
                {#if selectTransport() == "Otobüs"}
                <i class="fas fa-bus fa-3x"></i> <br>
                {:else if selectTransport() == "Uçak"}
                <i class="fas fa-plane fa-3x"></i> <br>
                {:else}
                <i>Error</i> <br>
                {/if}
                <button type="button" class="btn btn-outline-secondary">
                    <div class="d-flex justify-content-center">
                        <i class="bi bi-box-arrow-in-down me-2 mt-1"></i>
                        <span style="font-size: 1.3rem;">İndir</span>
                    </div>
                </button>
            </div>
            <div id="gidis" class="pt-5">
                <h2>{departurePlace}</h2>
                <h3 class="pt-2">Gidiş: {departureTime}</h3>
            </div>
            <div id="tc" class="pt-5">
                <h2>Yolcunun Kimlik Numarası</h2>
                <h3 class="pt-2">Tc: {passengerTc}</h3>
            </div>
            <div id="varis" class="pt-5">
                <h2>{arrivalPlace}</h2>
                <h3 class="pt-2">Varış: {arrivalTime}</h3>
                <div id="reservationId" class="pt-4 mt-4">
                    <h2>Rezervasyon Id</h2>
                    <h3>{travelId}</h3>
                </div>  
            </div>
        </div> 
    </div>
</main>

<style>
.ticket1 {
    width: auto;
    height: 250px;
    box-shadow: 0 0 20px 9px #44403e1f;
    border-radius: 5px;
    border-bottom: 1px solid #999;
    background-color: rgb(255, 255, 255);
    margin: 20px;
}

#gidis {
    text-align: Center;
    width: 400px;
    height: 250px;
}

#varis {
    margin-top: 15px;
    font-size: 20px;
    text-align: center;
    width: 400px;
    height: 250px;
}

#tc {
    font-size: 20px;
    text-align: center;
    width: 400px;
    height: 250px;
}

#reservationId {
    font-size: 5px;
    text-align: center;
    width: 200px;
    height: 50px;
    margin-left: 180px;
}

#reservationId h2{
    font-size: 15px;
}

#reservationId h3{
    font-size: 15px;
}

#tur {
    color: white;
    text-align: center;
    width: 200px;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 20px 9px #0000001f;
    border-radius: 5px;
    border-bottom: 1px solid #999;
    background-color: rgb(0, 0, 0);
    font-weight: 600;
    font-size: 0.8rem;
}
</style>

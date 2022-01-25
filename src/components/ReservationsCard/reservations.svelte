<script>
    export let departureDate;
    export let arrivalDate;
    export let departurePlace;
    export let arrivalPlace;
    export let transport;
    export let departureTime;
    export let arrivalTime;
</script>

<main>
    <div class="ticket1">
        <div id="gidis" class="  pt-2">
            <h4>Gidiş : {departureDate}</h4>
            <h2>{departurePlace}</h2>
            <h3>{departureTime}</h3>
        </div>
        <div id="varis">
            <h3>Varış : {arrivalDate}</h3>
            <h2>{arrivalPlace}</h2>
            <h3>{arrivalTime}</h3>
        </div>
        <div id="tur" class="row justify-content-center">
            <h3 class="mt-2">{transport} Bileti</h3>
            <i class="fas fa-bus fa-3x"></i> <br>
            <button type="button" class="btn btn-outline-secondary">
                <div class="d-flex justify-content-center">
                    <i class="bi bi-box-arrow-in-down me-2 mt-1"></i>
                    <span style="font-size: 1.3rem;">İndir</span>
                </div>
            </button>
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
    position: absolute;
    left: 250px;
}

#varis {
    margin-top: 15px;
    font-size: 20px;
    text-align: center;
    width: 400px;
    height: 250px;
    position: absolute;
    right: 20px;
}

#tur {
    color: white;
    text-align: center;
    width: 200px;
    height: 250px;
    position: absolute;
    left: 20px;
    background-image: url("../bus.jpg");
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

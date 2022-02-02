<!-- Ahmet Ocak -->
<script>
    import { push } from 'svelte-spa-router';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { searchRequest } from '../../store';

    let busIcon = '../assets/bus.png';
    let planeIcon = '../assets/airplane.png';

    let showCard = false;
    let isActive = true;

    let citiesUrl = 'https://onlineticketbackendapi.azure-api.net/v1/api/Cities';
    let cities = [];

    let date = "";
    let arrivalPlace = "";
    let departurePlace = "";
    let pageData = ""; 
    let pageIcon = "../assets/mainPageBG.png";

    $searchRequest = {
        date: date,
        arrivalPlace: arrivalPlace,
        departurePlace: departurePlace
    };

    onMount(async () => {
        try {
            cities = await (await axios.get(citiesUrl)).data[0].citiess;
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/HomePage/61f9157fb4961311f09c29ca")).data.ticketSection;
            pageIcon = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/HomePage/61f9157fb4961311f09c29ca")).data.images;
        }
        catch(e) {
            console.log(e);
        }
    });

    const selectCard = () => {
        showCard = !showCard;
        isActive = !isActive;
    }

    function dateChecker() {
        if(tarih.value == "") {
            return false;
        } else {
            $searchRequest.date = tarih.value + "T00:00:00Z";
            $searchRequest.departurePlace = kalkis.value;
            $searchRequest.arrivalPlace = varis.value;
            return true;
        }
    }
</script>

<main>
    <div class="ticketsection" style="background-image: url({pageIcon[2]});">
        <div class="searchbox">
            <div class="buttons">
                <button on:click={selectCard} class:active={isActive}><img src={busIcon} alt="">{pageData[0]}</button>
                <button on:click={selectCard} class:active={!isActive}><img src={planeIcon} alt="">{pageData[1]}</button>
            </div>
            <ul>
                {#if showCard}
                <li>
                    <div class="card">
                        <form class="form fs-5">
                            <label for="kalkis" class="fs-4 pb-1"><i class="bi bi-geo-alt-fill p-1"></i>{pageData[2]}</label>
                            <select id="kalkis" class="py-3 mb-3" >
                                {#each cities as city}
                                <option id="departure">{city}</option>
                                {:else}
                                <option value="veritabanı">{pageData[4]}</option>
                                {/each}
                            </select>
                            <label for="varis" class="fs-4 pb-1"><i class="bi bi-geo-alt-fill p-1"></i>{pageData[3]}</label>
                            <select id="varis" class="py-3 mb-3">
                                {#each cities as city}
                                <option id="arrival">{city}</option>
                                {:else}
                                <option value="veritabanı">{pageData[4]}</option>
                                {/each}
                            </select>
                            <label for="tarih" class="fs-4"><i class="bi bi-calendar-fill p-1 pb-1"></i>{pageData[5]}</label>
                            <input type="date" id="tarih" class="p-3" required />
                            <button type="button" class="btn btn-dark mt-4 p-3 fs-4" id="button" on:click={() => {
                                if(dateChecker() == true) {
                                    push('/planeTicketListPage');
                                }
                                else {
                                    console.log("tarih boş");
                                }
                            }}>{pageData[6]}</button>
                        </form>
                    </div>
                </li>
                {/if}  
                {#if !showCard}
                <li>
                    <div class="card">
                        <form class="form fs-5">
                            <label for="kalkis" class="fs-4 pb-1"><i class="bi bi-geo-alt-fill p-1"></i>{pageData[2]}</label>
                            <select id="kalkis" class="py-3 mb-3" >
                                {#each cities as city}
                                <option id="departure">{city}</option>
                                {:else}
                                <option value="veritabanı">{pageData[4]}</option>
                                {/each}
                            </select>
                            <label for="varis" class="fs-4 pb-1"><i class="bi bi-geo-alt-fill p-1"></i>{pageData[3]}</label>
                            <select id="varis" class="py-3 mb-3">
                                {#each cities as city}
                                <option id="arrival">{city}</option>
                                {:else}
                                <option value="veritabanı">{pageData[4]}</option>
                                {/each}
                            </select>
                            <label for="tarih" class="fs-4"><i class="bi bi-calendar-fill p-1 pb-1"></i>{pageData[5]}</label>
                            <input type="date" id="tarih" class="p-3" required />
                            <button type="button" class="btn btn-dark mt-4 p-3 fs-4" id="button" on:click={() => {
                                if(dateChecker() == true) {
                                    push('/busTicketListPage');
                                }
                                else {
                                    console.log("tarih boş");
                                }
                            }}>{pageData[7]}</button>
                        </form>
                    </div>
                </li>
                {/if}
            </ul>
        </div>
    </div>
</main>

<style>
    .ticketsection {
        background-repeat: no-repeat;
        background-size: 100% 1000px;
        display: flex;
        justify-content: center;
    }

    .searchbox {
        height: 800px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .card {
        width: 450px;
        height: 450px;
        background-color: rgba(255, 255, 255, 0.5);
        justify-content: center;
        padding: 30px;
    }

    .form {
        display: flex;
        flex-direction: column; 
    }

    #button:hover {
        background-color: #000;
        color: #fff;
    }

    li {
        list-style: none;
    }

    .buttons {
        margin-right: 21vh;
    }

    .buttons button {
        background-color: rgba(255, 255, 255, 0.5);
    }

    .buttons .active {
        background-color: rgba(255, 255, 255, 1);
        border: none;
    }
</style>
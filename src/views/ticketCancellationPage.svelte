<!-- Ahmet Ocak -->
<script>
import Navbar from "../components/Navbar/navbar.svelte";
import axios from 'axios';
import {
    toast
} from '@zerodevx/svelte-toast'

let reservationId;
let tcNo;
let result = 0;

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

async function deleteReservation() {
    let deleteUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/Tickets?id=${getCookie("userId")}&reservationId=${reservationId}&tcNo=${tcNo}`;
    result = (await axios.delete(deleteUrl)).status;
}
</script>

<main>
    <div class="section">
        <Navbar />
        <div class="card ds-flex flex-column justify-content-center">
            <div class="ticketID d-flex flex-column pb-3 fs-4">
                <label for="bid" class="fs-4 ms-3">Rezervasyon ID</label>
                <input type="text" id="bid" class="input" bind:value={reservationId} required>
            </div>
            <div class="userName d-flex flex-column">
                <label for="un" class="fs-4 ms-3">Yolcunun Kimlik Numarası</label>
                <input type="text" id="un" class="input fs-4" bind:value={tcNo} required>
            </div>
            <div class="button d-flex flex-row-reverse p-4">
                <button type="button" class="btn btn-danger fs-4 p-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" on:click={() => {
                    deleteReservation().then((r) => {
                        console.log(result);
                        if(result == 204) {
            toast.push('İptal işlemi başarılı!', {
                theme: {
                    '--toastBackground': '#48BB78',
                    '--toastBarBackground': '#2F855A'
                }
            });
        }else {
            toast.push('İşlem Başarısız! Girdiğiniz bilgileri kontrol edin!', {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            });
        }
                    }).catch((err) => {
                        toast.push('Ağ Hatası!', {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            });
            console.log(err);
                    });;
                }}>İptal Et</button>
            </div>
        </div>
    </div>
</main>

<style>
.section {
    background-image: url("../assets/ticketcancelbg.png");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.card {
    width: 30%;
    height: 30vh;
    background-color: rgb(255, 255, 255, 0.7);
}

.input {
    border: 0;
    background-color: rgb(255, 255, 255, 0.0);
    border-bottom: 1px solid #9fa1a3;
    margin: 0 25px 0 15px;
}

input:focus {
    outline: 0;
}
</style>

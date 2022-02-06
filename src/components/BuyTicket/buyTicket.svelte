<!-- Ahmet Ocak -->
<script>
    import { link } from 'svelte-spa-router';
    import { push } from 'svelte-spa-router';
    import { selectedTicketId } from "../../store";
    import axios from 'axios';
    import { onMount } from 'svelte';
    import Spinner from '../../components/LoadingSpinner/spinner.svelte';
    import { toast } from '@zerodevx/svelte-toast'

    let masterCard = '../assets/masterCard.png';
    let visaCard = '../assets/visa.png';
    let americanExpress = '../assets/american-express.png';
    
    export let buttonText;
    export let showUserInfo = false;
    export let walletPageButton = false;
    export let travelType;

    let ppassengerName;
    let ppassengerTc;
    let creditCardNo;
    let creditCardUserName;
    let month;
    let year;
    let cvc2;

    let ticketInfo = [];
    let userInfo;
    let balance;
    let loading = false;
    let loadingForTicket = false;

    let currentBalance = 0;
    let newBalance = 0;
    let exchangeRate = 0;
    let pageData = " ";

    onMount(async () => {
        try{
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/BuyTicketComp/61f91f67b4961311f09c29d6")).data.text;
            let walletUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/Wallets/${getCookie("userId")}`;
            currentBalance = (await axios.get(walletUrl)).data.balance;
            currentBalance = currentBalance / (await getExchangeRate());
            currentBalance = Number(currentBalance).toFixed(2);
            let userUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/User/${getCookie("userId")}`;
            userInfo = (await axios.get(userUrl)).data;
            
            if(location.href.split("/").pop().split("?").shift() != "walletPage") {
                let explanation = document.getElementById("explanation");
                explanation.innerHTML = pageData[3];
                let littleExp = document.getElementById("littleExp");
                littleExp.innerHTML = pageData[5] 
            }
        }catch(e) {
            console.log(e);
            toast.push('Ağ Hatası!', {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                });
        }
    });

    async function getExchangeRate() {
        if(getCookie("currency") == "TL") {
            exchangeRate = (await axios.get('https://onlineticketbackendapi.azure-api.net/v1/api/ExchangeRate/61f809af6a1589b78639c53b')).data.rate;
            return exchangeRate;
        }else if(getCookie("currency") == "USD") {
            exchangeRate = (await axios.get('https://onlineticketbackendapi.azure-api.net/v1/api/ExchangeRate/61f80a0ba789e7ab01ddf744')).data.rate;
            return exchangeRate;
        }else {
            exchangeRate = (await axios.get('https://onlineticketbackendapi.azure-api.net/v1/api/ExchangeRate/61f80a35a789e7ab01ddf745')).data.rate;
            return exchangeRate;
        }
    }

    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        let currentTime = getTime();

        today = mm + '.' + dd + '.' + yyyy + " " + currentTime;
        return today;
    }

    function getTime() {
        var d = new Date();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var seconds = d.getSeconds();

        return hour + ":" + minute + ":" + seconds;
    }

    function checkCurrentUser() {
        loadingForTicket = true;
        if(getCookie("jwt") == null) {
            return false;
        }else {
            return true;
        }
    }

    function checkUserInfos() {
        if(userInfo.birthdate != null && userInfo.gender != null && userInfo.phoneNumber != null && userInfo.email != null && userInfo.tcNo != null && userInfo.firstName != null && userInfo.lastName != null) {
            buyTicket();
            return true;
        }else {
            return false;
        }
    }

    function checkInfos() {
        if(ppassengerName == null || ppassengerTc == null || creditCardNo == null || creditCardUserName == null || month == "" || year == "" || cvc2 == null) {
            return false;
        }
        return true;
    }

    function getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [key,value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }
    
    async function buyTicket() {
        try{
        let userId = getCookie("userId");
        let user = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/User/${userId}`)).data;
        let userName = user.firstName + " " + user.lastName;

        if(travelType == 0) {
            ticketInfo[0] = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/Bus_Travels/${$selectedTicketId}`)).data;
        }else {
            ticketInfo[0] = await (await axios.get(`https://onlineticketbackendapi.azure-api.net/v1/api/Plane_Travels/${$selectedTicketId}`)).data;
        }

        let todayDate = getDate();
        console.log(todayDate);
        let result = await axios.put(`https://onlineticketbackendapi.azure-api.net/v1/api/Tickets/${userId}/${$selectedTicketId}/${ppassengerName}/${ppassengerTc}/${ticketInfo[0].travelType}/${todayDate}/${ticketInfo[0].companyName}/${userName}/${parseInt(ticketInfo[0].price)}`).then((result) => {
            if(result.status == 204) {
                loadingForTicket = false;
                toast.push('Satın alma işlemi başarılı!', {
                    theme: {
                        '--toastBackground': '#48BB78',
                        '--toastBarBackground': '#2F855A'
                    }
                });
                setTimeout(() => {
                    push('/');
                }, 3000);
            }else {
                toast.push('İşlem Başarısız!', {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                });
            }
        }).catch((err) => {
            loadingForTicket = false;
            console.log(err);
            toast.push('İşlem Başarısız!', {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                });
        });
        
        let walletUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/Wallets/${getCookie("userId")}`;
        balance = (await axios.get(walletUrl)).data.balance;
        if(balance >= ticketInfo[0].price) {
            balance = balance - ticketInfo[0].price;
            axios.put(`https://onlineticketbackendapi.azure-api.net/v1/api/Wallets/${getCookie("userId")}/${balance}`);
        }else if(balance < ticketInfo[0].price && balance != 0){
            balance = 0;
            axios.put(`https://onlineticketbackendapi.azure-api.net/v1/api/Wallets/${getCookie("userId")}/${balance}`);
        }
        }catch(e) {
            loadingForTicket = false;
            toast.push('İşlem Başarısız!', {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            });
        }
    }

</script>

<main>
    <div class="d-flex flex-row justify-content-center">
        
        {#if showUserInfo}
        <div class="card text-dark bg-light mb-3" id="passengerInfo">
            <div class="card-header">
                {#if pageData[0] != null}
                    {pageData[0]}
                {/if}
            </div>
            <div class="">
                <div class="card-body d-flex flex-column">  
                    <label for="name">
                        {#if pageData[1] != null}
                            {pageData[1]}
                        {/if}
                    </label>
                    <input type="text" id="name" placeholder="Doldurulması zorunludur" bind:value={ppassengerName} required>
                </div>
                <div class="card-body d-flex flex-column">
                    <label for="tc">
                        {#if pageData[2] != null}
                            {pageData[2]}
                        {/if}
                    </label>
                    <input type="number" id="tc" placeholder="Doldurulması zorunludur" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="11" bind:value={ppassengerTc} required>
                </div>
            </div>
            <div class="d-flex justify-content-center ms-3 me-3 mt-2">
                <p class="fs-5" id="explanation">
                    
                </p>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button type="button" class="btn btn-success p-3 fs-5" on:click={() => {
                    if(checkCurrentUser()) {
                        console.log("giriş yapan var ödeme yapılabilir");
                        if(checkInfos()) {
                            if(checkUserInfos()) {
                                
                            }else {
                                toast.push('Lütfen Profil Bilgilerinizi Doldurunuz!', {
                                    theme: {
                                        '--toastBackground': '#F56565',
                                        '--toastBarBackground': '#C53030'
                                    }
                                });
                                loadingForTicket = false;
                            }
                        }
                        else {
                            toast.push('Lütfen Gerekli Bilgileri Giriniz!', {
                                    theme: {
                                        '--toastBackground': '#F56565',
                                        '--toastBarBackground': '#C53030'
                                    }
                            });
                            loadingForTicket = false;
                        }
                    }
                    else {
                        console.log("giriş yapan yok ödeme yapılamaz");
                    }
                }}>{buttonText}</button>
            </div>
        </div>
        {#if loadingForTicket == true}
        <div id="spinner2">
            <Spinner />
        </div>
        {/if}
        {/if}
        <div class="space p-3"></div>
        <div class="card text-dark bg-light mb-3" id="cardInfo">
            <div class="card-header">
                {#if pageData[4] != null}
                    {pageData[4]}
                {/if}
            </div>
            <div class="">
                <div class="card-body d-flex flex-row justify-content-around">
                    <img src={masterCard} alt="">
                    <img src={visaCard} alt="">
                    <img src={americanExpress} alt="">
                </div>
                {#if !walletPageButton}
                    <div class="card-body d-flex flex-row justify-content-start">
                        <div class="card text-dark d-flex flex-row" style="max-width: 25rem; max-height: 10vh; background-image: linear-gradient(to right, rgb(15, 12, 41, 0.9), rgb(48, 43, 99, 0.9), rgb(36, 36, 62, 0.9));" id="card">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                                <h6 class="ms-2" style="color: pink;" id="littleExp">
                                </h6>  
                            </div>
                            <div class="card-body">
                                <h6 class="card-title" style="color: aliceblue;">
                                    {#if pageData[6] != null}
                                        {pageData[6]}
                                    {/if}
                                </h6>
                                <p class="card-text text-warning fs-6">{currentBalance + " " + getCookie("currency")}</p>
                            </div>
                        </div>
                    </div>
                {/if}
                <div class="card-body d-flex flex-column" style="width: 90%;">
                    <label for="cardNo">
                        {#if pageData[7] != null}
                            {pageData[7]}
                        {/if}
                    </label>
                    <input type="number" id="cardNo" placeholder="•••• •••• •••• ••••" maxlength="16" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" required autocomplete="cc-csc" bind:value={creditCardNo}> 
                </div>
                <div class="card-body d-flex flex-column" style="width: 90%;">
                    <label for="cardUserInfo">
                        {#if pageData[8] != null}
                            {pageData[8]}
                        {/if}
                    </label>
                    <input type="text" id="cardUserInfo" placeholder="Kart sahibinin adı ve soyadı" required bind:value={creditCardUserName}>
                </div>
                <div class="card-body d-flex flex-row justify-content-between" style="width: 80%;">
                    <div class="card-body d-flex flex-column">
                        <label for="last">
                            {#if pageData[9] != null}
                                {pageData[9]} 
                            {/if}
                        </label>
                        <select name='expireMM' id='expireMM' required bind:value={month}>
                            <option value=''>Ay</option>
                            <option value='01'>Ocak</option>
                            <option value='02'>Şubat</option>
                            <option value='03'>Mart</option>
                            <option value='04'>Nısan</option>
                            <option value='05'>Mayıs</option>
                            <option value='06'>Haziran</option>
                            <option value='07'>Temmuz</option>
                            <option value='08'>Ağustos</option>
                            <option value='09'>Eylül</option>
                            <option value='10'>Ekim</option>
                            <option value='11'>Kasım</option>
                            <option value='12'>Aralık</option>
                        </select> 
                        <select name='expireYY' id='expireYY' required bind:value={year}>
                            <option value=''>Yıl</option>
                            <option value='22'>2022</option>
                            <option value='23'>2023</option>
                            <option value='24'>2024</option>
                            <option value='24'>2025</option>
                            <option value='24'>2026</option>
                        </select> 
                    </div>
                    <div class="card-body d-flex flex-column" style="width: 40%;">
                        <label for="cvc2">
                            {#if pageData[10] != null} 
                                {pageData[10]} 
                            {/if}
                        </label>
                        <input type="number" id="cvc2" placeholder="•••" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="3" bind:value={cvc2} required>
                    </div>
                </div>
                {#if walletPageButton} <!-- wallet view button -->
                    <div class="card-body d-flex flex-column" style="width: 90%;">
                        <label for="money">
                            {#if pageData[11] != null}  
                                {pageData[11]}
                            {/if}
                        </label>
                        <input type="number" placeholder="örnek: 100" id="money" bind:value={newBalance} required>
                    </div>
                {/if}
                <div class="form-check ms-5 mb-5 me-5">
                    <label class="form-check-label" for="flexCheckDefault">
                        <input class="form-check-input" type="checkbox" id="flexCheckDefault" required>
                        <a href="/obfPage" use:link><b>
                            {#if pageData[12] != null} 
                                {pageData[12]}
                            {/if}
                        </b></a>, <a href="/mssPage" use:link><b>
                            {#if pageData[13] != null} 
                                {pageData[13]}
                            {/if}
                        </b></a> 
                        {#if pageData[14] != null} 
                            {pageData[14]}
                        {/if}
                    </label>
                </div>
            </div>
            {#if walletPageButton} <!-- wallet view button -->
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <button type="button" class="btn btn-success btn-sm mb-3" style="width: 20%; height: 4vh;" on:click={() => {
                        if(newBalance == 0 || newBalance == null) {
                            toast.push('Lütfen geçerli bir bakiye giriniz!', {
                                        theme: {
                                            '--toastBackground': '#F56565',
                                            '--toastBarBackground': '#C53030'
                                            }
                                    });
                        }else {
                            if(creditCardNo == null || creditCardUserName == null || month == "" || year == "" || cvc2 == null) {
                                toast.push('Lütfen bilgileri doldurunuz!', {
                                        theme: {
                                            '--toastBackground': '#F56565',
                                            '--toastBarBackground': '#C53030'
                                            }
                                    });
                            }else {
                                currentBalance = parseInt(currentBalance) + parseInt(newBalance);
                                loading = true;
                                axios.put(`https://onlineticketbackendapi.azure-api.net/v1/api/Wallets/${getCookie("userId")}/${currentBalance}`).then((result) => {
                                    loading = false;
                                    toast.push('İşleminiz Başarılı!', {
                                    theme: {
                                        '--toastBackground': '#48BB78',
                                        '--toastBarBackground': '#2F855A'
                                    }
                                });
                                setTimeout(() => {
                                    push('/');
                                }, 3000);
                                }).catch((err) => {
                                    loading = false;
                                    toast.push('Ağ Hatası!', {
                                        theme: {
                                            '--toastBackground': '#F56565',
                                            '--toastBarBackground': '#C53030'
                                            }
                                    });
                                    console.log(err);
                                });
                            }
                        }
                    }}>
                    {#if pageData[15] != null} 
                        {pageData[15]}
                    {/if}    
                </button>
                </div>
            {/if}
            {#if loading == true}
                <div id="spinner">
                    <Spinner />
                </div>
            {/if}
        </div>
    </div>
</main>

<style>

    #spinner2 {
        z-index: 1;
        position: absolute;
        margin-top: 5%;
    }

    #spinner {
        margin-left: 39%;
        margin-top: 25%;
        position: absolute;
    }

    #cardInfo {
        width: 50%;
    }

    a{
        text-decoration: none;
        color: #000;
    }

    #passengerInfo {
        width: 50%;
    }
</style>
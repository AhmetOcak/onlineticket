<!--Ahmet Ocak -->
<script>
    export let companyName;
    export let userName;
    export let ticketID;
    export let billPrice;
    export let date;
    export let purchasePlace;
</script>

<main>
    <div class="card text-light bg-secondary mb-3">
        <div class="card-header fs-4">{companyName}</div>
        <div class="card-body">
            <h5 class="card-title">Sayın {userName}</h5>
            <p class="card-text">Fatura ID : {ticketID}</p>
            <p class="card-text">Fatura Tutarı : {billPrice} TL</p>
            <p class="card-text">İşlemin Yapıldığı Tarih : {date}</p>
            <p class="card-text">İşlem Kanalının Adı : {purchasePlace}</p>
        </div>
    </div>
</main>

<style>
    
</style>
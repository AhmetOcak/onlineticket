<script>
    export let text;
</script>

<main>
    <div class="ticket1">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <p id="text">{text}</p>
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
    text-align: center;
}

#text {
    margin-top: 100px;
    font-size: 36px;
}

</style>

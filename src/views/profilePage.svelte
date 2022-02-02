<script>
import Navbar from "../components/Navbar/navbar.svelte";
import { onMount } from 'svelte';
import axios from 'axios';

let data = "";
let pageData = " ";
let pageImage = " ";

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    
    return cookie[cookieName];
    }

    onMount(async () => {
        try{
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/ProfilePage/61f91b7bb4961311f09c29d1")).data.text;
            pageImage = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/ProfilePage/61f91b7bb4961311f09c29d1")).data.images;
            let userUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/User/${getCookie("userId")}`;
            data = (await axios.get(userUrl)).data;
        }catch(e) {
            console.log(e);
        } 
    });

</script>

<main>
    <div class="section d-flex justify-content-center align-items-center" style="background-image: url({pageImage});">

    <Navbar />
        <div class="container">
            <div class="main">
                <div class="row">

                    <div class="col-md-8 mt-1">
                        <div class="card mb-3 content">
                            <h1 class="m-3 pt-3">
                                {#if pageData[0] != null}
                                    {pageData[0]}
                                {/if}
                            </h1>
                            <div class="card-body">
                                <hr>
                                <hr>

                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>
                                            {#if pageData[1] != null}
                                                {pageData[1]}
                                            {/if}
                                        </h5>
                                    </div>
                                    <div class="col-md-9 text-secondary">
                                        {data.gender}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>
                                            {#if pageData[2] != null}
                                                {pageData[2]}
                                            {/if}
                                        </h5>
                                    </div>
                                    <div class="col-md-9 text-secondary">
                                        {data.firstName}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>
                                            {#if pageData[3] != null}
                                                {pageData[3]}
                                            {/if}
                                        </h5>
                                    </div>
                                    <div class="col-md-9 text-secondary">
                                        {data.lastName}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>
                                            {#if pageData[4] != null}
                                                {pageData[4]}
                                            {/if}
                                        </h5>
                                    </div>
                                    <div class="col-md-9 text-secondary">
                                        {data.birthdate}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>
                                            {#if pageData[5] != null}
                                                {pageData[5]}
                                            {/if}
                                        </h5>
                                    </div>
                                    <div class="col-md-9 text-secondary">
                                        {data.tcNo}
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <h5>
                                                {#if pageData[6] != null}
                                                    {pageData[6]}
                                                {/if}
                                            </h5>
                                        </div>
                                        <div class="col-md-9 text-secondary">
                                            {data.email}
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <h5>
                                                    {#if pageData[7] != null}
                                                        {pageData[7]}
                                                    {/if}
                                                </h5>
                                            </div>
                                            <div class="col-md-9 text-secondary">
                                                {data.phoneNumber}
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

</main>

<style>

    .section{
        width: 100%;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: cover;
        background-position:center;
        overflow: hidden;
    }



.main{
    padding: 15px;
    font-family: Arial, Helvetica, sans-serif;
    color: black;
}

.card{
    position:relative;
    display: flex;
    flex-direction:column;
    border: solid 5px black;
}

.content{
    background-color: #BCBDB8;
}
.col-md-9{
    color: black;
}
</style>
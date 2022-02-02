<!-- Ahmet Ocak -->
<script>
    import Navbar from "../components/Navbar/navbar.svelte";
    import { onMount } from 'svelte';
    import axios from 'axios';

    let pageData = " ";
    let pageImage = " ";

    onMount(async () => {
            try{
                pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/MSSPage/61f918e4b4961311f09c29cf")).data.text;
                pageImage = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/MSSPage/61f918e4b4961311f09c29cf")).data.images;
            }catch(e) {
            console.log(e);
            } 
        });
</script>

<main>
    <div class="section d-flex justify-content-center align-items-center" style="background-image: url({pageImage});">
        <Navbar />
            <div class="textSection">
                <h3>
                    {#if pageData[0] != null}
                        {pageData[0]}
                    {/if}
                </h3>
            <p>
                {#if pageData[1] != null}
                    {pageData[1]}
                {/if}
            </p>
            <h5 class="text-primary">
                {#if pageData[2] != null}
                    {pageData[2]}
                {/if}
            </h5>
            <p>
                {#if pageData[3] != null}
                    {pageData[3]}
                {/if}
            </p>
            <h5 class="text-primary">
                {#if pageData[4] != null}
                    {pageData[4]}
                {/if}
            </h5>
            <h5>
                {#if pageData[5] != null}
                    {pageData[5]}
                {/if}
            </h5>
            <table class="table table-bordered fs-5">
                <tr>
                    <th>
                        {#if pageData[6] != null}
                            {pageData[6]}
                        {/if}
                    </th>
                    <th>
                        {#if pageData[7] != null}
                            {pageData[7]}
                        {/if}
                    </th>
                </tr>
                <tr>
                    <th>
                        {#if pageData[8] != null}
                            {pageData[8]}
                        {/if}
                    </th>
                    <th>
                        {#if pageData[9] != null}
                        {pageData[9]} 
                        {/if}
                        <br>
                        {#if pageData[10] != null} 
                            {pageData[10]} 
                        {/if}
                        <br>
                        {#if pageData[11] != null}  
                            {pageData[11]}
                        {/if}
                    </th>
                </tr>
                <tr>
                    <th>
                        {#if pageData[12] != null} 
                            {pageData[12]}
                        {/if}
                    </th>
                    <th>
                        {#if pageData[13] != null} 
                            {pageData[13]}
                        {/if}
                    </th>
                </tr>
                <tr>
                    <th>
                        {#if pageData[14] != null} 
                            {pageData[14]}
                        {/if}
                    </th>
                    <th>
                        {#if pageData[15] != null} 
                            {pageData[15]}
                        {/if}
                    </th>
                </tr>
            </table>
            <h5>
                {#if pageData[16] != null} 
                    {pageData[16]}
                {/if}
            </h5>
            <p>
                {#if pageData[17] != null} 
                    {pageData[17]}
                {/if}
            </p>
            <h5 class="text-primary">
                {#if pageData[18] != null} 
                    {pageData[18]}
                {/if}
            </h5>
            <ul>
                <li>
                    <p>
                        {#if pageData[19] != null}      
                            {pageData[19]} 
                        {/if}
                        <br>
                        {#if pageData[20] != null} 
                            {pageData[20]} 
                        {/if}
                        <br>
                        {#if pageData[21] != null} 
                            {pageData[21]} 
                        {/if}
                        <br>
                        {#if pageData[22] != null} 
                            {pageData[22]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[23] != null} 
                        {pageData[23]} 
                        {/if}
                        <br>
                        {#if pageData[24] != null} 
                            {pageData[24]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[25] != null} 
                            {pageData[25]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[26] != null} 
                            {pageData[26]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[27] != null} 
                            {pageData[27]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[28] != null} 
                            {pageData[28]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[29] != null} 
                            {pageData[29]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[30] != null} 
                            {pageData[30]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[31] != null} 
                            {pageData[31]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[32] != null} 
                            {pageData[32]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[33] != null} 
                            {pageData[33]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[34] != null} 
                            {pageData[34]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[35] != null} 
                            {pageData[35]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[36] != null} 
                            {pageData[36]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[37] != null} 
                            {pageData[37]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[38] != null} 
                            {pageData[38]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[39] != null} 
                            {pageData[39]} 
                        {/if}
                        <br>
                    </p>
                </li>
            </ul>
            <h5 class="text-primary">
                {#if pageData[40] != null} 
                    {pageData[40]}
                {/if}
            </h5>
            <ul>
                <li>
                    <p>
                        {#if pageData[41] != null} 
                            {pageData[41]} 
                        {/if}
                        <br>
                    </p>
                </li>
                <li>
                    <p>
                        {#if pageData[42] != null} 
                            {pageData[42]} 
                        {/if}
                        <br>
                    </p>
                </li>
            </ul>
            <h5 class="text-primary">
                {#if pageData[43] != null} 
                    {pageData[43]}
                {/if}
            </h5>
            <ul>
                <li>
                    <p>
                        {#if pageData[44] != null} 
                            {pageData[44]} 
                        {/if}
                        <br>
                    </p>
                </li>
            </ul>
            <h5 class="text-primary">
                {#if pageData[45] != null} 
                    {pageData[45]}
                {/if}
            </h5>
            <ul>
                <li>
                    <p>
                        {#if pageData[46] != null} 
                            {pageData[46]} 
                        {/if}
                        <br>
                    </p>
                </li>
            </ul>
            <p>
                {#if pageData[47] != null} 
                    {pageData[47]}
                {/if}
            </p>
        </div>
    </div>
</main>

<style>
    .section{
        width: 100%;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .textSection {
        margin-top: 100px;
        overflow: auto;
        width: 70%;
        height: 80vh;
        background-color: rgb(255, 255,255, 1);
        padding: 20px;
    }

    p {
        font-size: 15px;
    }
</style>
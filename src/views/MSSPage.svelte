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
                <h3>{pageData[0]}</h3>
            <p>{pageData[1]}</p>
            <h5 class="text-primary">{pageData[2]}</h5>
            <p>{pageData[3]}</p>
            <h5 class="text-primary">{pageData[4]}</h5>
            <h5>{pageData[5]}</h5>
            <table class="table table-bordered fs-5">
                <tr>
                    <th>{pageData[6]}</th>
                    <th>{pageData[7]}</th>
                </tr>
                <tr>
                    <th>{pageData[8]}</th>
                    <th>{pageData[9]} <br> {pageData[10]} <br> {pageData[11]}</th>
                </tr>
                <tr>
                    <th>{pageData[12]}</th>
                    <th>{pageData[13]}</th>
                </tr>
                <tr>
                    <th>{pageData[14]}</th>
                    <th>{pageData[15]}</th>
                </tr>
            </table>
            <h5>{pageData[16]}</h5>
            <p>{pageData[17]}</p>
            <h5 class="text-primary">{pageData[18]}</h5>
            <ul>
                <li>
                    <p>{pageData[19]} <br>
                        {pageData[20]} <br>
                        {pageData[21]} <br>
                        {pageData[22]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[23]} <br>
                        {pageData[24]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[25]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[26]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[27]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[28]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[29]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[30]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[31]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[32]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[33]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[34]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[35]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[36]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[37]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[38]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[39]} <br>
                    </p>
                </li>
            </ul>
            <h5 class="text-primary">{pageData[40]}</h5>
            <ul>
                <li>
                    <p>
                        {pageData[41]} <br>
                    </p>
                </li>
                <li>
                    <p>
                        {pageData[42]} <br>
                    </p>
                </li>
            </ul>
            <h5 class="text-primary">{pageData[43]}</h5>
            <ul>
                <li>
                    <p>
                        {pageData[44]} <br>
                    </p>
                </li>
            </ul>
            <h5 class="text-primary">{pageData[45]}</h5>
            <ul>
                <li>
                    <p>
                        {pageData[46]} <br>
                    </p>
                </li>
            </ul>
            <p>{pageData[47]}</p>
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
<script>
import Navbar from "../components/Navbar/navbar.svelte";
import { onMount } from 'svelte';
    import axios from 'axios';
    let data = [];
    let text = "";

    onMount(async () => {
        try{
            let helpUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/Help/`;
            data = (await axios.get(helpUrl)).data;
        }catch(e) {
            console.log(e);
        } 
    });

</script>

<main>
    <div class="section d-flex justify-content-center align-items-center ">

    <Navbar />

        <div class="blog">

            <h2>YARDIM</h2>
            {#each {length: data.length} as _,i}
            <p class="paragraph">
                {data[i].text}
            </p>
            {:else}
            <p>loading</p>
            {/each}

        </div>
    </div>
</main>

<style>
    .section{
        width: 100%;
        height: 100vh;
        background-image: url("../assets/Help PageBG.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        overflow: auto;
        
    }

.blog{
    background-color: #C1B6B0;
    width: 90%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    border: solid 5px #64626F;
    padding: 20px;
    margin-top: 400px;
    margin-bottom: 100px;
}

.paragraph{
    border-left: 5px solid #29221B ;
    padding-left: 5px;
}

h2{
    font-size: 2.0rem;
    color: #51352A;
}

</style>
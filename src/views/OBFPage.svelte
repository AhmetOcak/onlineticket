<!-- Ahmet Ocak -->
<script>
    import Navbar from '../components/Navbar/navbar.svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';

    let pageData = " ";
    let pageImage = " ";

    onMount(async () => {
            try{
                pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/OBFPage/61f91ac8b4961311f09c29d0")).data.text;
                pageImage = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/OBFPage/61f91ac8b4961311f09c29d0")).data.images;
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
            <h5 class="text-primary">
                {#if pageData[1] != null}
                    {pageData[1]}
                {/if}
            </h5>
            <p>
                {#if pageData[2] != null}
                    {pageData[2]}
                {/if}
            </p>
            <p>
                {#if pageData[3] != null}
                    {pageData[3]}
                {/if}
            </p>
            <p>
                {#if pageData[4] != null}
                    {pageData[4]}
                {/if}
            </p>
            <p>
                {#if pageData[5] != null}
                    {pageData[5]}
                {/if}
            </p>

            <h5 class="text-primary">
                {#if pageData[6] != null}
                    {pageData[6]}
                {/if}
            </h5>
            <p>
                {#if pageData[7] != null}
                    {pageData[7]}
                {/if}
            </p>
            
            <h5 class="text-primary">
                {#if pageData[8] != null}
                    {pageData[8]}
                {/if}
            </h5>
            <p>
                {#if pageData[9] != null}
                    {pageData[9]} 
                {/if}
            </p>
            <pre>
                {#if pageData[10] != null} 
                    {pageData[10]} 
                {/if}
            </pre>

            <h5 class="text-primary">
                {#if pageData[11] != null}  
                    {pageData[11]}
                {/if}
            </h5>
            <p>
                {#if pageData[12] != null} 
                    {pageData[12]}
                {/if}
            </p>
        
            <h5 class="text-primary">
                {#if pageData[13] != null} 
                    {pageData[13]}
                {/if}
            </h5>
            <p>
                {#if pageData[14] != null} 
                    {pageData[14]}
                {/if}
            </p>
            
            <h5 class="text-primary">
                {#if pageData[15] != null} 
                    {pageData[15]}
                {/if}
            </h5>
            <p>
                {#if pageData[16] != null} 
                    {pageData[16]}
                {/if}
            </p>

            <h5 class="text-primary">
                {#if pageData[17] != null} 
                    {pageData[17]}
                {/if}
            </h5>
            <p>
                {#if pageData[18] != null} 
                    {pageData[18]}
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
<!-- Ahmet Ocak -->
<script>
    import { link } from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import axios from 'axios';

    let pageData = ""; 

    onMount(async () => {
        try{
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/HomePage/61f9157fb4961311f09c29ca")).data.footer;
        }catch(e) {
            console.log(e);
        } 
    });
</script>

<main>
    <div class="mt-5 pt-5 pb-5 footer bg-dark text-white">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-xs-12">
                    <h2>
                        {#if pageData[0] != null}
                            {pageData[0]}
                        {/if}
                    </h2>
                    <p class="pr-5 text-white-50">
                        {#if pageData[1] != null}
                            {pageData[1]}
                        {/if}
                    </p>
                    <p>
                        <a href="/faqPage" use:link ><i>
                            {#if pageData[2] != null}
                                {pageData[2]}
                            {/if}
                        </i></a>
                        <br>
                        <a href="/helpPage" use:link><i>
                            {#if pageData[3] != null}
                                {pageData[3]}
                            {/if}
                        </i></a>
                        <br>
                        <a href="/customerServicePage" use:link><i>
                            {#if pageData[4] != null}
                                {pageData[4]}
                            {/if}
                        </i></a>
                    </p>
                </div>
                <div class="col-lg-3 col-xs-12">
                    <h4 class="mt-lg-0 mt-sm-3">
                        {#if pageData[5] != null}
                            {pageData[5]}
                        {/if}
                    </h4>
                        <ul class="m-0 p-0">
                        <li>- <a href="https://www.facebook.com/" target="blank">
                            {#if pageData[6] != null}
                                {pageData[6]}
                            {/if}
                        </a></li>
                        <li>- <a href="https://www.instagram.com/" target="blank">
                            {#if pageData[7] != null}
                                {pageData[7]}
                            {/if}
                        </a></li>
                        <li>- <a href="https://twitter.com/login?lang=tr" target="blank">
                            {#if pageData[8] != null}
                                {pageData[8]}
                            {/if}
                        </a></li>
                        <li>- <a href="https://web.telegram.org/" target="blank">
                            {#if pageData[9] != null}
                                {pageData[9]}
                            {/if}            
                        </a></li>
                        <li>- <a href="https://web.bip.com/" target="blank">
                            {#if pageData[10] != null}
                                {pageData[10]}
                            {/if}            
                        </a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-xs-12">
                    <h4>
                        {#if pageData[11] != null}
                            {pageData[11]}
                        {/if}        
                    </h4>
                    <p class="text-white-50">
                        {#if pageData[12] != null}
                        {   pageData[12]}
                        {/if}        
                    </p>
                    <p class="mb-1 text-white-50"><i class="bi bi-telephone-fill text-white"></i> 
                        {#if pageData[13] != null}
                            {pageData[13]}
                        {/if}        
                    </p>
                    <p class="text-white-50"><i class="bi bi-envelope-fill text-white"></i> 
                        {#if pageData[14] != null}
                            {pageData[14]}
                        {/if}        
                    </p>
                </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        <p class=""><small class="text-white-50">
                            {#if pageData[15] != null}
                                {pageData[15]}
                            {/if}        
                        </small></p>
                    </div>
                </div>
            </div>
        </div>
</main>

<style>
    a {
        color: #909294;
        text-decoration: none;
    }
    
    a:hover {
        color: #fff;
    }
</style>
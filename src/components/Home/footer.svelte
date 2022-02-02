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
                    <h2>{pageData[0]}</h2>
                    <p class="pr-5 text-white-50">{pageData[1]} </p>
                    <p>
                        <a href="/faqPage" use:link ><i>{pageData[2]}</i></a>
                        <br>
                        <a href="/helpPage" use:link><i>{pageData[3]}</i></a>
                        <br>
                        <a href="/customerServicePage" use:link><i>{pageData[4]}</i></a>
                    </p>
                </div>
                <div class="col-lg-3 col-xs-12">
                    <h4 class="mt-lg-0 mt-sm-3">{pageData[5]}</h4>
                        <ul class="m-0 p-0">
                        <li>- <a href="https://www.facebook.com/" target="blank">{pageData[6]}</a></li>
                        <li>- <a href="https://www.instagram.com/" target="blank">{pageData[7]}</a></li>
                        <li>- <a href="https://twitter.com/login?lang=tr" target="blank">{pageData[8]}</a></li>
                        <li>- <a href="https://web.telegram.org/" target="blank">{pageData[9]}</a></li>
                        <li>- <a href="https://web.bip.com/" target="blank">{pageData[10]}</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-xs-12">
                    <h4>{pageData[11]}</h4>
                    <p class="text-white-50">{pageData[12]}</p>
                    <p class="mb-1 text-white-50"><i class="bi bi-telephone-fill text-white"></i> {pageData[13]}</p>
                    <p class="text-white-50"><i class="bi bi-envelope-fill text-white"></i> {pageData[14]}</p>
                </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        <p class=""><small class="text-white-50">{pageData[15]}</small></p>
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
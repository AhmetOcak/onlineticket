<!-- Ahmet Ocak -->
<script>
    import PageLang from './pageLang.svelte';
    import TlUsd from './tlUsd.svelte';
    import { link } from 'svelte-spa-router';
    import { push } from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import axios from 'axios';

    let pageData = "";
    let pageIcon = ""; 

    function delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function checkCurrentUser() {
        if(getCookie("jwt") == null) {
            return false;
        }else {
            return true;
        }
    }

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
            pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/HomePage/61f9157fb4961311f09c29ca")).data.navbar;
            pageIcon = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/HomePage/61f9157fb4961311f09c29ca")).data.images;
            checkCurrentUser();
        }catch(e) {
            console.log(e);
        } 
    });
    
</script>

<main>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark py-3 fixed-top">
        <div class="container">
            <a href="/" class="navbar-brand fs-3"><img src="{pageIcon[1]}" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
                    class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
                    {#if checkCurrentUser()}
                    <li class="nav-item">
                        <a href="/ticketCancellationPage" use:link class="nav-link"><i class="bi bi-x-circle pe-1"></i><p>
                            {#if pageData[0] != null}
                                {pageData[0]}
                            {/if}
                        </p></a>
                    </li>
                    <li class="nav-item">
                        <a href="/reservations" use:link class="nav-link"><i class="bi bi-search pe-1"></i><p>
                            {#if pageData[1] != null}
                                {pageData[1]}
                            {/if}
                        </p></a>
                    </li>
                    {/if}
                    {#if !checkCurrentUser()}
                    <li class="nav-item">
                        <a href="/signinPage" use:link class="nav-link"><i class="bi bi-person-circle pe-1"></i><p>
                            {#if pageData[2] != null}
                                {pageData[2]}
                            {/if}
                        </p></a>
                    </li>
                    <li class="nav-item">
                        <a href="/LoginPage" use:link class="nav-link"><i class="bi bi-box-arrow-in-right pe-1"></i><p>
                            {#if pageData[3] != null}
                                {pageData[3]}
                            {/if}
                        </p></a>
                    </li>
                    {/if}
                    {#if checkCurrentUser()}
                    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown pb-3">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-circle pe-1"></i>
                                </a>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="dropdown-item" href="/profilePage" use:link><i class="bi bi-person-check-fill"></i> 
                                    {#if pageData[4] != null}
                                        {pageData[4]}
                                    {/if}
                                </a></li>
                                <li><a class="dropdown-item" href="/accountSettings" use:link><i class="bi bi-gear-fill"></i> 
                                    {#if pageData[5] != null}
                                        {pageData[5]}
                                    {/if}
                                </a></li>
                                <li><a class="dropdown-item" href="/walletPage" use:link><i class="bi bi-wallet-fill"></i> 
                                    {#if pageData[6] != null}
                                        {pageData[6]}
                                    {/if}
                                </a></li>
                                <li><a class="dropdown-item" href="/myBillsPage" use:link><i class="bi bi-receipt"></i> 
                                    {#if pageData[7] != null}
                                        {pageData[7]}
                                    {/if}
                                </a></li>
                                <li><a class="dropdown-item" href="/myTravels" use:link><i class="bi bi-geo"></i> 
                                    {#if pageData[8] != null}
                                        {pageData[8]}
                                    {/if}
                                </a></li>
                                <li><a class="dropdown-item" href="/" on:click={() => {
                                    delete_cookie("jwt");
                                    delete_cookie("userId");
                                    push('/');
                                }}><i class="bi bi-x-octagon-fill"></i> 
                                {#if pageData[9] != null}
                                    {pageData[9]}
                                {/if}                                   
                                </a></li>
                            </ul>
                            </li>
                        </ul>
                    </div>
                    {/if}
                    <div class="d-flex flex-row">
                        <li class="nav-item px-3">
                            <PageLang />
                        </li>
                        <li class="nav-item">
                            <TlUsd />
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
</main>

<style>

    a {
        text-decoration: none;
        display: flex;
        flex-direction: row;
    }

</style>
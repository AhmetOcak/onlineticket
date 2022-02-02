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
        if(document.cookie.length <= 13) {
            return false;
        }else {
            return true;
        }
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
            <a href="/" class="navbar-brand fs-3"><img src="{pageIcon[3]}" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
                    class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
                    {#if checkCurrentUser()}
                    <li class="nav-item">
                        <a href="/ticketCancellationPage" use:link class="nav-link"><i class="bi bi-x-circle pe-1"></i><p>{pageData[0]}</p></a>
                    </li>
                    <li class="nav-item">
                        <a href="/reservations" use:link class="nav-link"><i class="bi bi-search pe-1"></i><p>{pageData[1]}</p></a>
                    </li>
                    {/if}
                    {#if !checkCurrentUser()}
                    <li class="nav-item">
                        <a href="/signinPage" use:link class="nav-link"><i class="bi bi-person-circle pe-1"></i><p>{pageData[2]}</p></a>
                    </li>
                    <li class="nav-item">
                        <a href="/LoginPage" use:link class="nav-link"><i class="bi bi-box-arrow-in-right pe-1"></i><p>{pageData[3]}</p></a>
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
                                <li><a class="dropdown-item" href="/profilePage" use:link><i class="bi bi-person-check-fill"></i> {pageData[4]}</a></li>
                                <li><a class="dropdown-item" href="/accountSettings" use:link><i class="bi bi-gear-fill"></i> {pageData[5]}</a></li>
                                <li><a class="dropdown-item" href="/walletPage" use:link><i class="bi bi-wallet-fill"></i> {pageData[6]}</a></li>
                                <li><a class="dropdown-item" href="/myBillsPage" use:link><i class="bi bi-receipt"></i> {pageData[7]}</a></li>
                                <li><a class="dropdown-item" href="/myTravels" use:link><i class="bi bi-geo"></i> {pageData[8]}</a></li>
                                <li><a class="dropdown-item" href="/" on:click={() => {
                                    delete_cookie("jwt");
                                    delete_cookie("userId");
                                    push('/');
                                }}><i class="bi bi-x-octagon-fill"></i> {pageData[9]}</a></li>
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
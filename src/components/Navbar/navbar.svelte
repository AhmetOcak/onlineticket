<!-- Ahmet Ocak -->
<script>
    import PageLang from './pageLang.svelte';
    import TlUsd from './tlUsd.svelte';
    import { link } from 'svelte-spa-router';
    import { push } from 'svelte-spa-router';

    function delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function getCookie(cookieName) {    
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
    }

    function checkCurrentUser() {
        if(getCookie("userId") == null) {
            console.log("giriş yapan yok");
            return false;
        }else {
            console.log("giriş yapan var");
            return true;
        }
    }

</script>

<main>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark py-3 fixed-top">
        <div class="container">
            <a href="#" class="navbar-brand fs-3"><img src="../assets/logo.png" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
                    class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
                    {#if checkCurrentUser()}
                    <li class="nav-item">
                        <a href="/ticketCancellationPage" use:link class="nav-link"><i class="bi bi-x-circle pe-1"></i><p>Rezervasyon İptal</p></a>
                    </li>
                    <li class="nav-item">
                        <a href="/reservations" use:link class="nav-link"><i class="bi bi-search pe-1"></i><p>Rezervasyonlarım</p></a>
                    </li>
                    {/if}
                    {#if !checkCurrentUser()}
                    <li class="nav-item">
                        <a href="/signinPage" use:link class="nav-link"><i class="bi bi-person-circle pe-1"></i><p>Üye ol</p></a>
                    </li>
                    <li class="nav-item">
                        <a href="/LoginPage" use:link class="nav-link"><i class="bi bi-box-arrow-in-right pe-1"></i><p>Giriş</p></a>
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
                                <li><a class="dropdown-item" href="/profilePage" use:link><i class="bi bi-person-check-fill"></i> Profili Görüntüle</a></li>
                                <li><a class="dropdown-item" href="/accountSettings" use:link><i class="bi bi-gear-fill"></i> Hesap Ayarları</a></li>
                                <li><a class="dropdown-item" href="/walletPage" use:link><i class="bi bi-wallet-fill"></i> Cüzdanım</a></li>
                                <li><a class="dropdown-item" href="/myBillsPage" use:link><i class="bi bi-receipt"></i> Faturalarım</a></li>
                                <li><a class="dropdown-item" href="/myTravels" use:link><i class="bi bi-geo"></i> Seyahatlerim</a></li>
                                <li><a class="dropdown-item" href="/" on:click={() => {
                                    delete_cookie("jwt");
                                    delete_cookie("userId");
                                    push('/');
                                }}><i class="bi bi-x-octagon-fill"></i> Hesaptan Çıkış</a></li>
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
<script>
    import Navbar from '../components/Navbar/navbar.svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    let data;
    let title = "";
    let text = "";

    let pageImage = "";

    onMount(async () => {
        try{
            let campaign1Url = `https://onlineticketbackendapi.azure-api.net/v1/api/Campaigns/61d70980ae96d43e0f623761`;
            pageImage = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/WebsiteData/61f920b048106f21e53235f8")).data.campaigns;  
            data = (await axios.get(campaign1Url)).data;
            title = data.title;
            text = data.text;
        }catch(e) {
            console.log(e);
        } 
    });

</script>

<main>
    <div class="section d-flex justify-content-center align-items-center " style="background-image: url({pageImage[1]});">

    <Navbar />

        <div class="blog">
            <h2>{title}</h2>
    
            <p class="paragraph">{text}</p>
    
    
        </div>
    </div>
</main>

<style>
    .section{
        width: 100%;
        height: 100vh;
        background-image: url("../assets/Campaign2 PageBG.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
}

.blog{
    margin-bottom: 20px;
    background-color: #C1B6B0;
    width: 90%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    border: solid 5px #29221B;
    padding: 20px;
    margin: 200px;
    max-width: 700px;}

.paragraph{
    padding-left: 5px;
}

h2{
    font-size: 2.0rem;
    color: #229CAB;
}


</style>
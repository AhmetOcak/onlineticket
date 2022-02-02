<script>
import Navbar from "../components/Navbar/navbar.svelte";
import axios from 'axios';
import { push } from 'svelte-spa-router';
import { onMount } from 'svelte';

let user;
let mail;
let text;
let pageText = "";

onMount(async () => {
        try{
            let pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/CustomerPage/61f91850b4961311f09c29ce")).data;
            pageText = pageData.text;
        }catch(e) {
            console.log(e);
        } 
    });

</script>

<main>
    <div class="sec">
        <Navbar />
            <!--Contact Section Start-->
            <div class="contact-section">
                <div class="contact-form">
                    <h2 style="color: black;">
                        {#if pageText[0] != null}
                            {pageText[0]}
                        {/if}
                    </h2>
                    <form class="contact" action="" method="post"></form>
                    <input type="text" name="name" class="text-box" placeholder="Your Name" bind:value={user} required>
                    <input type="email" name="email" class="text-box" placeholder="Your E-mail" bind:value={mail} required>
                    <textarea name="message" rows="5" placeholder="Your Message" bind:value={text}></textarea>
                    <input type="submit" name="submit" class="send-button" value="Send" on:click={()=>{
                        axios.post(`https://onlineticketbackendapi.azure-api.net/v1/api/CustomerService`,{
                            name:user,
                            email:mail,
                            message:text
                        },
                        {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                        push("/");
                    }}>
                </div>
            </div>
        </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Ubuntu" ,sans-serif;
}

.sec{
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/Müşteri Hizmetleri Background.jpg");
}

.contact-section{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}



.contact-form{
    max-width: 700px;
    margin-right: 50px;
}


.contact-form h2{
    color: #fff;
    text-align: center;
    font-size: 35px;
    text-transform: uppercase;
    margin-bottom: 30px;
}

.contact-form .text-box{
    background:#000;
    color: #fff;
    border: none;
    width: calc(50% - 10px);
    height: 50px;
    padding: 12px;
    font-size: 15px;
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    opacity: 0.9;
}

.contact-form .text-box:last-child{
    margin-left: 15px;
}

.contact-form textarea{
    background:#000;
    color: #fff;
    border: none;
    width: 100%;
    padding: 12px;
    font-size: 15px;
    min-height: 200px;
    max-height: 400px;
    resize: vertical;
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    opacity: 0.9;
}

.contact-form .send-button{
    float: right;
    background: #2e94e3;
    color: #fff;
    border: none;
    width: 120px;
    height: 40px;
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    transition-property: background;
}

.contact-form .send-button:hover{
    background: #0582e3;
}

@media screen and (max-width:950px){
    .contact-section{
        flex-direction: column;
    }

    .contact-form h2{
        font-size: 30px;
    }

    .contact-form .text-box{
        width: 100%;
    }
}

</style>
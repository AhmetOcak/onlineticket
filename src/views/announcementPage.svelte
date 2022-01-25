<script>
import Navbar from "../components/Navbar/navbar.svelte";
import { onMount } from 'svelte';
    import axios from 'axios';
    let data1;
    let title1 = "";
    let text1 = "";
    let data2;
    let title2 = "";
    let text2 = "";
    let data3;
    let title3 = "";
    let text3 = "";
    let data4;
    let title4 = "";
    let text4 = "";
    let data5;
    let title5 = "";
    let text5= "";


    onMount(async () => {
        try{
            let faqsUrl1 = `https://onlineticketbackendapi.azure-api.net/v1/api/Announcements/61d7326de6c2ed71088e4b56`;
            data1 = (await axios.get(faqsUrl1)).data;
            title1 = data1.title;
            text1 = data1.text;
            let faqsUrl2 = `https://onlineticketbackendapi.azure-api.net/v1/api/Announcements/61d733c7e6c2ed71088e4b57`;
            data2 = (await axios.get(faqsUrl2)).data;
            title2 = data2.title;
            text2 = data2.text;
            let faqsUrl3 = `https://onlineticketbackendapi.azure-api.net/v1/api/Announcements/61d73572e6c2ed71088e4b58`;
            data3 = (await axios.get(faqsUrl3)).data;
            title3 = data3.title;
            text3 = data3.text;
            let faqsUrl4 = `https://onlineticketbackendapi.azure-api.net/v1/api/Announcements/61d73e22e6c2ed71088e4b59`;
            data4 = (await axios.get(faqsUrl4)).data;
            title4 = data4.title;
            text4 = data4.text;
            let faqsUrl5 = `https://onlineticketbackendapi.azure-api.net/v1/api/Announcements/61d73fd0e6c2ed71088e4b5b`;
            data5 = (await axios.get(faqsUrl5)).data;
            title5 = data5.title;
            text5 = data5.text;
        }catch(e) {
            console.log(e);
        } 
    });
</script>

<main>
    <div class="section d-flex justify-content-center align-items-center ">
        <Navbar />

        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header " id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                {title1}
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{text1}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                {title2}
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{text2}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                 {title3}
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{text3}</div>
            </div>
          </div>
        </div>
</div>
</main>

<style>
    .section{
        width: 100%;
        height: 100vh;
        background-image: url("../assets/Announcement PageBG.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
        
    }

  .accordion{
    margin-top: 100px;
    width: 70%;
  }

  .accordion-button{
    background-color: #5C5C5C;
    }

  .accordion-item{
    background-color: #c4828a;
  }
 
</style>
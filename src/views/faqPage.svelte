<script>
import Navbar from "../components/Navbar/navbar.svelte";
import { onMount } from 'svelte';
    import axios from 'axios';
    let data1;
    let question1 = "";
    let answer1 = "";
    let data2;
    let question2 = "";
    let answer2 = "";
    let data3;
    let question3 = "";
    let answer3 = "";
    let data4;
    let question4 = "";
    let answer4 = "";
    let data5;
    let question5 = "";
    let answer5 = "";
    let data6;
    let question6 = "";
    let answer6 = "";
    let data7;
    let question7 = "";
    let answer7 = "";

    let pageImage = "";

    onMount(async () => {
        try{
            pageImage = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/WebsiteData/61f920b048106f21e53235f8")).data.faq;
            let faqsUrl1 = `https://onlineticketbackendapi.azure-api.net/v1/api/Faq/61d74b73e6c2ed71088e4b5c`;
            data1 = (await axios.get(faqsUrl1)).data;
            question1 = data1.question;
            answer1 = data1.answer;
            let faqsUrl2 = `https://onlineticketbackendapi.azure-api.net/v1/api/Faq/61d7515fe6c2ed71088e4b5d`;
            data2 = (await axios.get(faqsUrl2)).data;
            question2 = data2.question;
            answer2 = data2.answer;
            let faqsUrl3 = `https://onlineticketbackendapi.azure-api.net/v1/api/Faq/61d75178e6c2ed71088e4b5e`;
            data3 = (await axios.get(faqsUrl3)).data;
            question3 = data3.question;
            answer3 = data3.answer;
            let faqsUrl4 = `https://onlineticketbackendapi.azure-api.net/v1/api/Faq/61d752b8e6c2ed71088e4b5f`;
            data4 = (await axios.get(faqsUrl4)).data;
            question4 = data4.question;
            answer4 = data4.answer;
            let faqsUrl5 = `https://onlineticketbackendapi.azure-api.net/v1/api/Faq/61d752d6e6c2ed71088e4b60`;
            data5 = (await axios.get(faqsUrl5)).data;
            question5 = data5.question;
            answer5 = data5.answer;
            let faqsUrl6 = `https://onlineticketbackendapi.azure-api.net/v1/api/Faq/61d7534ce6c2ed71088e4b61`;
            data6 = (await axios.get(faqsUrl6)).data;
            question6 = data6.question;
            answer6 = data6.answer;
            let faqsUrl7 = `https://onlineticketbackendapi.azure-api.net/v1/api/Faq/61d75388e6c2ed71088e4b62`;
            data7 = (await axios.get(faqsUrl7)).data;
            question7 = data7.question;
            answer7 = data7.answer;
        }catch(e) {
            console.log(e);
        } 
    });


</script>

<main>
    <div class="section d-flex justify-content-center align-items-center " style="background-image: url({pageImage});">
        <Navbar />

        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header " id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                {question1}
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{answer1}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                {question2}
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{answer2}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                 {question3}
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{answer3}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFour">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                 {question4}
              </button>
            </h2>
            <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{answer4}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFive">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                 {question5}
              </button>
            </h2>
            <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{answer5}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingSix">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                 {question6}
              </button>
            </h2>
            <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{answer6}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingSeven">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                 {question7}
              </button>
            </h2>
            <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">{answer7}</div>
            </div>
          </div>
        </div>
        
</div>
</main>

<style>
    .section{
        width: 100%;
        height: 100vh;
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
    background-color: #F67659;
  }
 
</style>
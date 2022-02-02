<script>
  import Navbar from "../components/Navbar/navbar.svelte";
  import axios from 'axios';
  import { onMount } from 'svelte';

  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  let pageData = " ";
  let pageImage = " ";

  function handleSignInfo() {
    userEmail = email.value;
    userPassword = password.value;
    userFirstName = firstName.value;
    userLastName = lastName.value;
  }
  
  onMount(async () => {
            try{
                pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/SigninPage/61f916b2b4961311f09c29cc")).data.text;
                pageImage = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/SigninPage/61f916b2b4961311f09c29cc")).data.images;
            }catch(e) {
            console.log(e);
            } 
        });
</script>
<main>
    <div class="container">
      <Navbar />
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form">
              <h2 class="title">
                {#if pageData[0] != null}
                    {pageData[0]}
                {/if}
              </h2>
              <div class="input-field">
                <i class="bi bi-person-circle"></i>
                <input type="text" placeholder="Ad" id="firstName" required/>
              </div>
              <div class="input-field">
                <i class="bi bi-person-circle"></i>
                <input type="text" placeholder="Soyad" id="lastName" required/>
              </div>
              <div class="input-field">
                <i class="bi bi-envelope"></i>
                <input type="email" placeholder="E-mail" id="email" required/>
              </div>
              <div class="input-field">
                <i class="bi bi-file-lock2"></i>
                <input type="password" placeholder="Şifre" minlength="5" id="password" required/>
              </div>
              <input class="btn solid" type="submit" value="Kayıt Ol" on:click={() => {
                handleSignInfo();
                axios.post(`https://onlineticketbackendapi.azure-api.net/v1/api/User`, {
                  email: userEmail,
                  password: userPassword,
                  firstName: userFirstName,
                  lastName: userLastName
                },
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
              }}/>
            </form>
          </div>
        </div>
        <div class="panels-container mt-5">
          <div class="panel left-panel">
            <img src={pageImage} class="image" alt="" />
          </div>
        </div>
      </div>
</main>
<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #1d1a1a 0%, #580092 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  padding: 0rem 5rem;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: 0.2s 0.7s ease-in-out;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  height: 55px;
  background-color: #f0f0f0;
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.btn {
  width: 150px;
  height: 49px;
  border: none;
  outline: none;
  border-radius: 48px;
  cursor: pointer;
  background-color: #2e024b;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  transition: all 0.5s;
}

.btn:hover {
  background-color: #050505;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}

.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 7;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.panel{
  color: #fff;
  transition: 0.9s 0.6s ease-in-out;
}

.image {
  transition: 1.1s 0.4s ease-in-out;
  width: 650px;
  margin-left: 150px;
  margin-bottom: 120px;
}

</style>
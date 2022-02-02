<script>
    import Navbar from "../components/Navbar/navbar.svelte";
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { push } from 'svelte-spa-router';

    let userInfos = "";
    let result = 0;
    let pageTextData = "";
    let pageImageData = "";

    let userName;
    let userBirthdate;
    let userTcNo;
    let userPhoneNumber;
    let userGender;
    let userEmail;
    let newPassword;
    let newPasswordAgain;
    let currentPassword;

    function handleValues() {
      userName = Name.value;
      userBirthdate = Birthdate.value;
      userTcNo = TcNo.value;
      userPhoneNumber = PhoneNumber.value;
      userGender = Gender.value;
      userEmail = Email.value;
      newPassword = Password.value;
      newPasswordAgain = PasswordAgain.value;
      currentPassword = oldPassword.value;
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
            let pageData = (await axios.get("https://onlineticketbackendapi.azure-api.net/v1/api/AccountSettings/61f91744b4961311f09c29cd")).data;
            pageTextData = pageData.text;
            pageImageData = pageData.images;
            let userUrl = `https://onlineticketbackendapi.azure-api.net/v1/api/User/${getCookie("userId")}`;
            userInfos = (await axios.get(userUrl)).data;
        }catch(e) {
            console.log(e);
        } 
    });

    function delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    async function deleteUser() {
      result = (await axios.delete(`https://onlineticketbackendapi.azure-api.net/v1/api/User?id=${getCookie("userId")}`)).status;
      console.log(result);
      if(result == 204) {
        delete_cookie("jwt");
        delete_cookie("userId");
        push('/');
      }else {
        console.log("error");
      }
      return result;
    }
</script>
<main>
    <Navbar/>
    <div class="section" id="sec" style="background-image: url({pageImageData});">
        <div class="text_hesap"><h1>
          {#if pageTextData[0] != null}
            {pageTextData[0]}
          {/if}
        </h1></div>
        <div class="hesap">
          <div class="profile_tabShow">
            <div class="d-flex flex-column">
              <h2>
                {#if pageTextData[1] != null}
                  {pageTextData[1]}
                {/if}
              </h2>
            <input type="text" class="input" value={userInfos.firstName + " " + userInfos.lastName} id="Name"/>
            <h2>
              {#if pageTextData[2] != null}
                {pageTextData[2]}
              {/if}
            </h2>
            <input type="text" class="input" value={userInfos.email} id="Email"/>
            <h2>
              {#if pageTextData[3] != null}
                {pageTextData[3]}
              {/if}
            </h2>
            <input type="date" class="input" value={userInfos.birthdate} id="Birthdate"/>
            </div>
            <h2>
              {#if pageTextData[4] != null}
                {pageTextData[4]}
              {/if}
            </h2>
            <input type="text" class="input" value={userInfos.tcNo} id="TcNo"/>
            <h2>
              {#if pageTextData[5] != null}
                {pageTextData[5]}
              {/if}
            </h2>
            <input type="text" class="input" value={userInfos.phoneNumber} id="PhoneNumber"/>
            <h2>
              {#if pageTextData[6] != null}
                {pageTextData[6]}
              {/if}
            </h2>
            <input type="text" class="input" value={userInfos.gender} id="Gender"/>
            <button class="btn" on:click={() => {
              handleValues();
              axios.put(`https://onlineticketbackendapi.azure-api.net/v1/api/User/${userInfos.id}`, {
                id: userInfos.id,
                email: userEmail,
                password: userInfos.password,
                birthdate: userBirthdate,
                firstName: userName.split(' ')[0],
                lastName: userName.split(' ')[1],
                phoneNumber: userPhoneNumber,
                gender: userGender,
                tcNo: userTcNo,
              },
              {
                headers: {
                    "Content-Type": "application/json"
                  }
              }).then(push('/'));
            }}>
            {#if pageTextData[7] != null}
              {pageTextData[7]}
            {/if}
          </button>
          </div>
        </div>
        <div class="sifre_islemleri_text">
          <h2>
            {#if pageTextData[8] != null}
              {pageTextData[8]}
            {/if}
          </h2>
        </div>
        <div class="sifre_islemleri">
          <h2>
            {#if pageTextData[9] != null}
              {pageTextData[9]}
            {/if}
          </h2>
          <input type="password" class="input_sifre" id="oldPassword"/>
          <h2>
            {#if pageTextData[10] != null}
              {pageTextData[10]}
            {/if}
          </h2>
          <input type="password" class="input_sifre" id="Password"/>
          <h2>
            {#if pageTextData[11] != null}
              {pageTextData[11]}
            {/if}
          </h2>
          <input type="password" class="input_sifre" id="PasswordAgain"/>
          <button class="btn_sifre" on:click={() => {
            handleValues();
            if(newPassword == newPasswordAgain && newPassword != currentPassword && currentPassword == userInfos.password) {
              axios.put(`https://onlineticketbackendapi.azure-api.net/v1/api/User/${userInfos.id}`, {
                id: userInfos.id,
                email: userEmail,
                password: newPassword,
                birthdate: userBirthdate,
                firstName: userName.split(' ')[0],
                lastName: userName.split(' ')[1],
                phoneNumber: userPhoneNumber,
                gender: userGender,
                tcNo: userTcNo,
              },
              {
                headers: {
                    "Content-Type": "application/json"
                  }
              }).then(push('/'));
            }
            else {
              console.log("password error");
            }
          }}>
          {#if pageTextData[12] != null}
            {pageTextData[12]}
          {/if}
        </button>
          <h3 id="deleteAccount" on:click={() => {
            deleteUser();
          }}>
          {#if pageTextData[13] != null}
            {pageTextData[13]}
          {/if}
        </h3>
        </div>
    </div>
</main>
<style>

#deleteAccount:hover{
    color: red;
}
.section{
    width: 100%;
    height: 170vh;
    background-repeat: no-repeat;
    background-size: cover;
}
    body {
  font-family: "Roboto", sans-serif;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.text_hesap {
  text-align: left 10px;
  text-shadow: 1px 1px rgb(56, 56, 56);
  width: auto;
  height: 900px;
  position: absolute;
  left: 430px;
  top: 130px;
  right: 30px;
  color: white;
  margin-bottom: 30px;
}
.hesap {
  background: rgb(255, 255, 255,0.7);
  border-radius: 3px;
  box-shadow: 0 0 20px 9px #44403e1f;
  margin: 30px;
  width: auto;
  height: 1050px;
  position: absolute;
  top: 160px;
  left: 400px;
  right: 400px;
  position: absolute;
}
.profile_tabShow {
  background: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: 0 0 20px 9px #44403e1f;
  margin-left: 50px;
  margin-right: 50px;
  width: 1000px auto;
  height: 410px;
  position: absolute;
  top: 5px;
  left: 10px;
  right: 30px;
  position: absolute;
  column-count: 2;
  margin-top: 50px;
  margin-right: 20px;
}
.hesap h2 {
  color: #777;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 2px;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 40px;
}
.input,
p {
  border: 0;
  border-bottom: 1px solid #042331;
  width: 80%;
  font-family: "montserrat", sans-serif;
  font-size: 20px;
  padding: 7px;
  margin-left: 40px;
  margin-right: 70px;
  outline: none;
}
.btn{
  font-family: "roboto", sans-serif;
  text-transform: uppercase;
  font-size: 15px;
  border: 0;
  color: #fff;
  background: #9ab3f8;
  padding: 7px 15px;
  box-shadow: 0px 2px 4px 0px;
  cursor: pointer;
  margin-top: 50px;
  margin-left: 50px;
  right: 700px;
  top: 300px;
  position: absolute;
}

/* ****************************************************** SİFRE İSLEMLERİ */
.sifre_islemleri_text {
  text-align: center;
  text-shadow: 1px 1px rgb(245, 240, 240);
  width: auto;
  height: 900px;
  position: absolute;
  left: 400px;
  top: 680px;
  right: 850px;
  color: rgb(0, 0, 0);
}

.sifre_islemleri {
  background: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: 0 0 20px 9px #44403e1f;
  text-align: left;
  margin: 30px;
  margin-left: 80px;
  margin-right: 80px;
  width: auto;
  height: 420px;
  position: absolute;
  top: 700px;
  left: 410px;
  right: 400px;
  position: absolute;
}
.sifre_islemleri h2 {
  color: #777;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 2px;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 40px;
}
.sifre_islemleri h3 {
  color: #777;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 2px;
  text-align: right;
  margin-right: 120px;
  cursor: pointer;
  position: absolute;
  top: 50px;
  left: 700px;
}
.input_sifre {
  border: 0;
  border-bottom: 1px solid #042331;
  width: 40%;
  font-family: "montserrat", sans-serif;
  font-size: 20px;
  padding: 7px;
  margin-left: 40px;
  margin-right: 70px;
  outline: none;
}
.btn_sifre {
  font-family: "roboto", sans-serif;
  text-transform: uppercase;
  font-size: 15px;
  border: 0;
  color: #fff;
  background: #9ab3f8;
  padding: 7px 15px;
  box-shadow: 0px 2px 4px 0px;
  cursor: pointer;
  margin-top: 50px;
  margin-left: 50px;
  right: 700px;
  top: 300px;
  position: absolute;
}


</style>
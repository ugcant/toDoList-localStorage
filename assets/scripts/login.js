const userName = document.querySelector("#username");
const pswd = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userNameValue = userName.value;
  const pswdValue = pswd.value;
  const localUsername = localStorage.getItem("Username");
  const localPswd = localStorage.getItem("Password");

  if (userNameValue == "" && pswdValue == "") {
    swal("Hay Aksi!", "Lütfen boş bıraktığınız alanları doldurunuz.", "error");
  } else {
    if (userNameValue == localUsername && pswdValue == localPswd) {
      swal("Giriş Başarılı!", "Uygulamaya yönlendiriliyorsunuz...", "success");
      setTimeout(() => {
        window.location.replace("app.html");
      }, 2000);
    } else {
      swal("Hay Aksi!", "Bir şeyler ters gitti!", "error");
    }
  }
});

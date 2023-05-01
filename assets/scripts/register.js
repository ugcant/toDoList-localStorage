const registerBtn = document.querySelector("#btn-register");
const userName = document.querySelector("#username");
const fName = document.querySelector("#full-name");
const pswd = document.querySelector("#password");
const cpswd = document.querySelector("#confirm-password");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userNameValue = userName.value;
  const fNameValue = fName.value;
  const pswdValue = pswd.value;
  const cpswdValue = cpswd.value;

  localStorage.setItem("fName", fNameValue);
  localStorage.setItem("Username", userNameValue);
  localStorage.setItem("Password", pswdValue);
  localStorage.setItem("Confirm Password", cpswdValue);
  if (
    userNameValue == "" &&
    fNameValue == "" &&
    pswdValue == "" &&
    cpswdValue == ""
  ) {
    swal("Hay Aksi!", "Lütfen boş bıraktığınız alanları doldurunuz.", "error");
  } else {
    if (pswdValue !== cpswdValue) {
      swal(
        "Hay Aksi!",
        "Girmiş olduğunuz parolalar birbiriyle eşleşmiyor.",
        "error"
      );
    } else {
      swal(
        "Kayıt Başarılı!",
        "Giriş sayfasına yönlendiriliyorsunuz...",
        "success"
      );
      setTimeout(() => {
        window.location.replace("index.html");
      }, 2000);
    }
  }
});

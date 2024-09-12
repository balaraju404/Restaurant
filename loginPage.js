
let userData = JSON.parse(localStorage.getItem("userdata"))
let { mobileno, email, password } = userData;
function loginFun() {
    let userId = document.getElementById("userId").value;
    let userPassword = document.getElementById("userPassword").value;
    if (userId == mobileno || userId == email) {
        if (userPassword == password) {
            alert("Login Successful...:)")
        }
        else {
            document.getElementById("errorMsg").innerHTML = `Incorrect Password`;
            document.getElementById("errorMsg").style.color = "red";
            return false;
        }
    }
    else {
        document.getElementById("errorMsg").innerHTML = `Invalid User id`;
        return false;
    }
}
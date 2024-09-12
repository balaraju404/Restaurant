
function signupFun() {

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let mobileNo = document.getElementById("mobileNo").value;
    let email = document.getElementById("email").value;
    let pass1 = document.getElementById("password").value;
    let pass2 = document.getElementById("passwordDup").value;

    if (pass1=="")
    {
        document.getElementById("errorMsg").innerHTML = `Enter Password`;
        document.getElementById("errorMsg").style.color = "red";
        return false;
    }
    else if (pass1 == pass2) {
        alert("Successfully Account Created...!!!");
        // localStorage.setItem("FirstName", fname)
        // localStorage.setItem("LastName", lname)
        // localStorage.setItem("MobileNo", mobileNo)
        // localStorage.setItem("Email", email)
        // localStorage.setItem("Password", pass1)
        let userData={
            firstname:fname,
            lastname:lname,
            mobileno:mobileNo,
            email:email,
            password:pass1
        }
        localStorage.setItem("userdata",JSON.stringify(userData));
    }
    else {
        document.getElementById("errorMsg").innerHTML = `Password Mismatch`;
        document.getElementById("errorMsg").style.color = "red";
        return false;
    }

}
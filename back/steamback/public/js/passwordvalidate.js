function validate(){
    let a = document.getElementById("password").value;
    let b = document.getElementById("confirmationpassword").value;

    if (a!=b){
        alert("Passwords do no match");
        return false;
    }
}

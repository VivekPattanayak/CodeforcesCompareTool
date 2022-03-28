document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('toggle_head').style.display="none";
    document.getElementById('toggle_btn').style.display="none";
 });

const validate_data = () =>{
    let uid=document.getElementById('user_id');
    let upsd=document.getElementById('user_password');
    let temp_uid = uid.value.toString().trim(); let temp_upsd=upsd.value; 
    console.log('User id:',temp_uid); console.log('Password:',temp_upsd);
    let ok=true;
    if(temp_uid==""){
        setErr(uid)
        ok=false
    }
    else{
        setOk(uid)
    }
    if(temp_upsd==""){
        setErr(upsd)
        ok=false
    }
    else{
        setOk(upsd)
    }
    return ok;
}

const setErr = ( doc_id ) =>{
    const fc = doc_id.parentElement;
    fc.className = "form-control error" 
}

const setOk = ( doc_id ) =>{
    const fc = doc_id.parentElement;
    fc.className = "form-control success"
}

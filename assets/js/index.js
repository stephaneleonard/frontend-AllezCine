(()=>{
    //bouton login et register
    const login = document.getElementById('login');
    const register = document.getElementById('register');
    const cancellog = document.getElementById('cancelLogin');
    const cancelReg = document.getElementById('cancelRegister')

    login.addEventListener('click', ()=>{
        document.getElementById("logreg-forms").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
        
    })
    register.addEventListener('click',()=>{
        document.getElementById("registerForm").style.display = "flex";
        document.getElementById("logreg-forms").style.display = "none";
    })
    cancellog.addEventListener('click',()=>{
        document.getElementById("logreg-forms").style.display = "none";
    })
    cancelReg.addEventListener('click',()=>{
        document.getElementById("registerForm").style.display = "none";
    })

})()
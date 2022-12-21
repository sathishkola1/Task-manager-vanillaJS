let token = localStorage.getItem('auth')
if(token){
    window.location.href='./dashboard.html'
}
async function logIn(){
    let credentials = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value
    }
    try{
        let res = await fetch('https://task-manager-3pi7.onrender.com/api/users/login',{
            method:"POST",
            headers: {
                Accept: "application/json",
                'Content-type': 'application/json'
                },
            body: JSON.stringify(credentials)
        })
        if(res.status!==200){
            throw "Login error"
        }
        res = await res.json()
        const authToken = res.token
        localStorage.setItem("auth",authToken)
        window.location.href='./dashboard.html'
    } catch(error){
        console.log("Invalid login",error)
        alert('Invalid email or password!')
    }
}

async function signUp(){
    let name = document.getElementById("name").value
    let email= document.getElementById("email").value
    let age =document.getElementById("age").value
    let password =document.getElementById("password").value
    let confirmPassword =document.getElementById("confirm-password").value
    if(password != confirmPassword){
        alert('Passwords do not match!')
        return
    }
    let credentials = {
        name,
        age,
        email ,
        password 
    }
    try{
        let res = await fetch('https://task-manager-3pi7.onrender.com/api/users',{
            method:"POST",
            headers: {
                Accept: "application/json",
                'Content-type': 'application/json'
                },
            body: JSON.stringify(credentials)
        })
        res = await res.json()
        alert('Registered successfully! Please login to continue')
        window.location.href = './sign-in.html'
    } catch(error){
        alert('Cannot register! Please try again')
    }
}
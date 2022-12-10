let token = localStorage.getItem('auth')
if(!token){
    window.location.href='./sign-in.html'
}

getProfile()
async function getProfile(){
    try {
        let results = await fetch("http://127.0.0.1:3000/api/users/me",{
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }
            })
        let profile = await results.json()
        document.getElementById("name").value = profile.name
        document.getElementById("email").value = profile.email
        document.getElementById("age").value = profile.age
    } catch (error) {
        alert('Cannot get profile details!')
        console.log(error)
    }
}

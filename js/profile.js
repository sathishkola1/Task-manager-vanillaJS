let token = localStorage.getItem('auth')
if(!token){
    window.location.href='./sign-in.html'
}

getProfile()
async function getProfile(){
    try {
        let results = await fetch("https://task-manager-3pi7.onrender.com/api/users/me",{
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }
            })
        if(results.status!==200){
            throw "Error fetching profile"
        }
        let profile = await results.json()
        document.getElementById("name").value = profile.name
        document.getElementById("email").value = profile.email
        document.getElementById("age").value = profile.age
    } catch (error) {
        alert('Cannot get profile details!')
        console.log(error)
    }
}

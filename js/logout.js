
async function logOut(){
    let token = localStorage.getItem("auth")
    try {
        let res = await fetch('https://task-manager-3pi7.onrender.com/api/users/logout',{
            method : "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
        })
        if(res.status!==200)
        {
            throw "Logout error"
        }
        res = await res.json()
        localStorage.removeItem("auth")
        window.location.href = './sign-in.html'
    } catch (error) {
        alert('Cannot logout! Please try again')
    }
}

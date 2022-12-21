
async function logOut(){
    let token = localStorage.getItem("auth")
    try {
        let res = await fetch('http://localhost:3000/api/users/logout',{
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
        console.log("bye",error)
        alert('Cannot logout! Please try again')
    }
}

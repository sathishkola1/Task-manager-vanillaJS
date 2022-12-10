async function logOut(){
    try {
        await fetch(`http://127.0.0.1:3000/api/users/logout`,{
            method : "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
        })
        localStorage.removeItem("auth")
        window.location.href = './sign-in.html'
    } catch (error) {
        alert('Cannot logout! Please try again')
    }
}

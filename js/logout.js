async function logOut(){
    try {
        await fetch(`https://task-manager-3pi7.onrender.com/api/users/logout`,{
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

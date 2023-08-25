const form = document.getElementById('loginForm')
form.addEventListener('submit', loginUser)

function loginUser(e) {
    e.preventDefault()
    console.log(e.target.name.value);

    const email = e.target.email.value;
    const password = e.target.password.value;


    const obj = {
 
        email,
        password
    }

    login(obj)
}


async function login(order) {
    try {
        const response = await axios.post('http://localhost:3000/user/login', order,{validateStatus: () => true});
        localStorage.setItem('token',response.data.token)
        if (response.data.success) {
            alert(response.data.success)
            window.location.href = "http://localhost:5501/Client/index.html"; 
        }
        if (response.status !== 200) {
            alert(response.data.err)
        }
    } catch (error) {
        console.log(error);
    }

}
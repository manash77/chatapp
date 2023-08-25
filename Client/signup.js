const form = document.getElementById('userForm')
form.addEventListener('submit', createUser)

function createUser(e) {
    e.preventDefault()
    console.log(e.target.name.value);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;

    const obj = {
        name,
        email,
        password,
        phone
    }

    signUp(obj)
}
async function signUp(order) {
    try {
      const response = await axios.post('http://localhost:3000/user/signup', order,{validateStatus: () => true});
      console.log(response);
      if (response.data.userExists) {
        alert('User Already Exits');
        form.className -= "was-validated";
      }
      if (response.status === 201) {
        alert('User Added Successfully!!')
        window.location.href = "http://localhost:5501/Client/login.html"; 
      }
    } catch (error) {  
      console.error("Error While Saving Data", error);
    }
  }
  


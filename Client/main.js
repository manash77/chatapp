window.addEventListener('DOMContentLoaded',isLoggedIn)
window.addEventListener('DOMContentLoaded',getAllChats)

async function getAllChats() {
    try {
        console.log("Called");
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/chat/get-chat', { headers: { 'Authorization': token } });
        renderData(response.data);
    } catch (error) {
        console.error(error);
    }
}

function isLoggedIn() {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.replace('/Client/login.htmlx')
    }
}


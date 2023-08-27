window.addEventListener('DOMContentLoaded', isLoggedIn)
window.addEventListener('DOMContentLoaded', getAllChats)
window.addEventListener('DOMContentLoaded', getAllGroup)
const form = document.getElementById("chatForm");
const groupForm = document.getElementById("groupForm");
const chatsElement = document.getElementById("chats");
const groupsElement = document.getElementById("groups");


groupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const groupName = new String(e.target.groupName.value);
    if (groupName.trim().length === 0) {
        e.target.groupName.focus();
        return;
    }
    sendGroup(groupName);
    e.target.groupName.value = ''
});

async function sendGroup(name) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/group/add-group', { name }, { headers: { 'Authorization': token } });
        console.log(response.data);
        const group = {name}
        addGroup(group);
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = new String(e.target.chat.value);
    if (message.trim().length === 0) {
        e.target.chat.focus();
        return;
    }
    sendChat(message);
    e.target.chat.value = '';
});

async function sendChat(chat) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/chat/send-chat', { chat }, { headers: { 'Authorization': token } });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

function addChat(chat) {
    const token = localStorage.getItem('token');
    const userData = parseJwt(token);
    if (userData.userId === chat.userId) {
        chat.name = 'you';
    }
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    td.innerHTML = `${chat.name}: ${chat.message}`
    tr.appendChild(td)
    chatsElement.appendChild(tr)
}

function addGroup(group) {
    console.log("group",group);
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    td.innerHTML = `${group.name}`
    tr.appendChild(td)
    groupsElement.appendChild(tr)
}

async function getAllChats() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/chat/get-chat', { headers: { 'Authorization': token } });
        if (response.data.success) {
            // renderChat(response.data.chats)
            localStorage.setItem("messages", response.data.chats)
            if (response.data.chats.length !== 0) {
                renderChat(response.data.chats)
            }
        }
        else {
            alert(response.data.error.message)
        }
    } catch (error) {
        console.error(error);
    }
}

async function getAllGroup() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/group/get-group', { headers: { 'Authorization': token } });
        if (response.data.success) {
            // renderChat(response.data.chats)
            if (response.data.groups.length !== 0) {  
                renderGroup(response.data.groups)
            }
        }
        else {
            alert(response.data.error.message)
        }
    } catch (error) {
        console.error(error);
    }
}


function renderChat(chats) {
    chatsElement.innerHTML = '';
    chats = chats.reverse();
    chats.forEach(chat => {
        addChat(chat)
    });
}
function renderGroup(groups) {
    groupsElement.innerHTML = '';
    if(!groups.length){
        const chat = {name:"",message:"Add Group !"}
        addChat(chat) 
        console.log(chat);
    }
    groups.forEach(group => {
        addGroup(group)
    });
}

function isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.replace('/Client/login.htmlx')
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// setInterval( ()=>{
//     getAllChats();
// },1000)
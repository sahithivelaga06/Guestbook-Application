const messageList = document.getElementById("messageList");

// Load all messages
async function loadMessages() {
    const response = await fetch("http://localhost:5000/messages");
    const messages = await response.json();

    messageList.innerHTML = "";

    messages.forEach(msg => {
        messageList.innerHTML += `
            <div class="message-card">
                <h3>👤 ${msg.name}</h3>
                <p>${msg.message}</p>
                <br>
                <small>
                    ${new Date(msg.createdAt).toLocaleString()}
                </small>
            </div>
        `;
    });
}

// Post message
document.getElementById("postBtn")
.addEventListener("click", async () => {

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if(!name || !message){
        alert("Please fill all fields!");
        return;
    }

    await fetch("http://localhost:5000/messages",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            message
        })
    });

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    loadMessages();
});

window.onload = loadMessages;
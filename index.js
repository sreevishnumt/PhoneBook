let users = [];


async function getAllUser() {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();

    users = data.users;   
    displayUsers(users);
}

getAllUser();



function displayUsers(userList) {
    const container = document.getElementById("task-container");
    container.innerHTML = "";

    userList.forEach((user, index) => {
        container.innerHTML += `
        <tr>
            <td>${user.firstName}</td>
            <td>${user.phone}</td>
            <td>
                <button onclick="deleteUser(${index})" class="btn btn-danger btn-sm">Delete</button>
                <button onclick="updateUser(${index})" class="btn btn-warning btn-sm">Edit</button>
            </td>
        </tr>
        `;
    });
}



function addUser() {
    const name = document.getElementById("newName").value;
    const phone = document.getElementById("newPhone").value;

    if (!name || !phone) {
        alert("Enter name and phone");
        return;
    }

    users.push({
        firstName: name,
        phone: phone
    });

    displayUsers(users);
}



function deleteUser(index) {
    users.splice(index, 1);
    displayUsers(users);
}



function updateUser(index) {
    const newName = prompt("Enter new name:", users[index].firstName);
    const newPhone = prompt("Enter new phone:", users[index].phone);

    if (newName && newPhone) {
        users[index].firstName = newName;
        users[index].phone = newPhone;
        displayUsers(users);
    }
}



function searchUser() {
    const value = document.getElementById("searchInput").value.toLowerCase();

    const filtered = users.filter(user =>
        user.firstName.toLowerCase().includes(value) ||
        user.phone.includes(value)
    );

    displayUsers(filtered);
}
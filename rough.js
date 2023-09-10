const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arr = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arr));
    displayPasswords();
};

const copyPassword = (password) => {
    // Create a temporary input element to copy the password
    const tempInput = document.createElement("input");
    tempInput.value = password;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Password copied to clipboard");
};

const updatePassword = (website, username, password) => {
    const newUsername = prompt("Enter new username:", username);
    const newPassword = prompt("Enter new password:", password);

    if (newUsername !== null && newPassword !== null) {
        let data = localStorage.getItem("passwords");
        let arr = JSON.parse(data);

        // Find the password entry by website
        const passwordEntry = arr.find((entry) => entry.website === website);

        if (passwordEntry) {
            // Update the username and password
            passwordEntry.username = newUsername;
            passwordEntry.password = newPassword;

            localStorage.setItem("passwords", JSON.stringify(arr));
            alert("Password Updated");
            displayPasswords();
        }
    }
};

const displayPasswords = () => {
    let tb = document.getElementById("passwordTable");
    let data = localStorage.getItem("passwords");
    if (data == null) {
        tb.innerHTML = "<tr><td colspan='4'>No data to show</td></tr>";
    } else {
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
                <td>${element.website}</td>
                <td>${element.username}</td>
                <td>${element.password}</td>
                <td>
                    <button class="btn" onclick="copyPassword('${element.password}')">Copy</button>
                    <button class="btn" onclick="deletePassword('${element.website}')">Delete</button>
                    <button class="btn" onclick="updatePassword('${element.website}', '${element.username}', '${element.password}')">Update</button>
                </td>
            </tr>`;
        }
        tb.innerHTML = str;
    }
};

document.querySelector("#passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const websiteInput = document.getElementById("website");

    let passwords = localStorage.getItem("passwords");
    if (passwords === null) {
        let json = [];
        json.push({ website: websiteInput.value, username: usernameInput.value, password: passwordInput.value });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(passwords);
        json.push({ website: websiteInput.value, username: usernameInput.value, password: passwordInput.value });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }

    usernameInput.value = "";
    passwordInput.value = "";
    websiteInput.value = "";

    displayPasswords();
});

// Initial display of passwords
displayPasswords();
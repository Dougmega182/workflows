async function submitForm(action) {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const company = document.getElementById("company").value;
    const siteId = document.getElementById("siteId").value;

    const data = { firstName, lastName, company, siteId };

    // 🔹 Ensure the API endpoint is correctly formatted
    const apiUrl = `https://autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net/${action}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Error submitting form. Please try again.");
    }
}

// Attach event listeners for buttons
document.getElementById("signInButton").addEventListener("click", () => submitForm('signin'));
document.getElementById("signOutButton").addEventListener("click", () => submitForm('signout'));

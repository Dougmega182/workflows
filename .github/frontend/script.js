function submitForm(action) {
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        company: document.getElementById('company').value,
        siteId: document.getElementById('siteId').value
    };

    fetch(`https://autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('signForm').reset();
    })
    .catch(error => console.error('Error:', error));
}

// script.js

async function submitForm(action) {
    const form = document.getElementById('signForm');
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        company: document.getElementById('company').value.trim(),
        siteId: document.getElementById('siteId').value
    };

    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.company) {
        alert('Please fill in all fields');
        return;
    }

    // Visual feedback during submission
    form.classList.add('loading');
    // Number of retry attempts
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await fetch(`https://autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                let errorMessage = `Server Error: ${response.status} - ${response.statusText}`; // Default message

                if (errorData.error) {
                    errorMessage = `Server Error: ${response.status} - ${errorData.error}`;
                }

                if (response.status === 500) {
                    errorMessage = 'Database connection error - please try again';
                }

                throw new Error(errorMessage);
            }
    
            const data = await response.json();
            alert(`Successfully ${action === 'signin' ? 'signed in' : 'signed out'}: ${data.message}`);
            form.reset();
            break; // Success - exit the retry loop

        } catch (error) {
            console.error('Attempt failed:', error);
            retries--;

            if (retries === 0) {
                alert(`Failed to submit after multiple attempts. Please try again later or contact support if the problem persists.  Details: ${error.message}`); // Include error message
            } else {
                // Wait 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
        } finally {
            // Remove loading state
            form.classList.remove('loading');
        }
    }
}

// Add form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signForm');

    // Prevent default form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }

        .loading button {
            cursor: wait;
        }
    `;
    document.head.appendChild(style);
});
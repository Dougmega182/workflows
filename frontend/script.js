<!-- In your HTML file -->
<script>
    async function submitForm(action) {
        const form = document.getElementById('signForm');
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            company: document.getElementById('company').value.trim(),
            siteId: document.getElementById('siteId').value
        };

        // Visual feedback during submission
        form.classList.add('loading');
        
        try {
            const response = await fetch(`https://autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net/${action}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Server Error: ${response.status} - ${errorData.error || response.statusText}`);
            }

            const data = await response.json();
            alert(data.message);
            form.reset();
        } catch (error) {
            console.error('Detailed error:', error);
            alert(`Failed to submit: ${error.message}`);
        } finally {
            form.classList.remove('loading');
        }
    }
</script>

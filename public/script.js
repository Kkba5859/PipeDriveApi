document.addEventListener('DOMContentLoaded', function() {
    const createJobButton = document.getElementById('create-job');
    const saveInfoButton = document.getElementById('save-info');
    
    createJobButton.addEventListener('click', function() {
        submitForm('createJob');
    });

    saveInfoButton.addEventListener('click', function() {
        submitForm('saveInfo');
    });

    async function submitForm(actionType) {
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            jobType: document.getElementById('job-type').value,
            jobSource: document.getElementById('job-source').value,
            jobDescription: document.getElementById('job-description').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zip-code').value,
            area: document.getElementById('area').value,
            startDate: document.getElementById('start-date').value,
            startTime: document.getElementById('start-time').value,
            endTime: document.getElementById('end-time').value,
            testSelect: document.getElementById('test-select').value
        };

        const endpoint = actionType === 'createJob' ? '/api/create-job' : '/api/save-info';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const result = await response.json();
                alert(`Success: ${result.message}`);
            } else {
                alert('Error: Unable to process the request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Unable to process the request');
        }
    }
});

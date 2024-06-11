class PipedriveIntegration {
    constructor() {
        window.addEventListener('message', this.handleMessage.bind(this));
    }

    handleMessage(event) {
        const { clientData, jobData, serviceLocationData, scheduledData } = event.data;

        // Create an object with data to be sent to Pipedrive
        const pipedriveData = {
            title: `${clientData.firstName} ${clientData.lastName}`, // Deal title
            // Populate other data fields using clientData, jobData, serviceLocationData, and scheduledData
        };

        // Send a request to the Pipedrive API
        fetch('https://api.pipedrive.com/v1/deals?api_token=ac8d0d5a9ea12738839c06a4ecb7fbedf9936be9', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pipedriveData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Deal created:', data);
            // Additional actions after successful deal creation
        })
        .catch(error => {
            console.error('Error creating deal:', error);
            // Error handling
        });
    }
}

const pipedriveIntegration = new PipedriveIntegration();
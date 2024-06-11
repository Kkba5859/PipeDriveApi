function saveData() {
    const clientData = {
        firstName: document.getElementById('firstName').value,
        // Get values from other client data fields
    };

    const jobData = {
        jobType: document.getElementById('jobType').value,
        // Get values from other job data fields
    };

    const serviceLocationData = {
        // Get values from service location fields
    };

    const scheduledData = {
        // Get values from scheduled fields
    };

    // Send data to the parent window
    window.parent.postMessage({
        clientData,
        jobData,
        serviceLocationData,
        scheduledData
    }, '*');
}  
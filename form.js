function saveData() {
    const clientData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
    };

    const jobData = {
        jobType: document.getElementById('jobType').value,
        jobSource: document.getElementById('jobSource').value,
        jobDescription: document.getElementById('jobDescription').value,
    };

    const serviceLocationData = {
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        area: document.getElementById('area').value,
    };

    const scheduledData = {
        startDate: document.getElementById('startDate').value,
        startTime: document.getElementById('startTime').value,
        endTime: document.getElementById('endTime').value,
        testSelect: document.getElementById('testSelect').value,
    };

    // Send data to the parent window
    window.parent.postMessage({
        clientData,
        jobData,
        serviceLocationData,
        scheduledData
    }, '*');
}

// Address autofill functionality
const addressInput = document.getElementById('address');
addressInput.addEventListener('input', () => {
    document.getElementById('city').value = 'New York';
    document.getElementById('state').value = 'NY';
    document.getElementById('zipCode').value = '10001';
    document.getElementById('area').value = 'Manhattan';
});

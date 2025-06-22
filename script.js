function setCurrentDate() {
    const dateField = document.getElementById('date_field');
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    dateField.value = `${year}-${month}-${day}`;
}

function setCurrentTime() {
    const timeField = document.getElementById('time_field');
    const timePicker = document.getElementById('time_picker');
    const now = new Date();
    const hours24 = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timePicker.value = `${hours24}:${minutes}`;
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    timeField.value = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

function setCurrentDateTime() {
    setCurrentDate();
    setCurrentTime();
}

// When user clicks the text field, show the time picker
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDateTime();
    document.getElementById('setDateNowBtn').onclick = setCurrentDate;
    document.getElementById('setTimeNowBtn').onclick = setCurrentTime;

    const timeField = document.getElementById('time_field');
    const timePicker = document.getElementById('time_picker');

    timeField.addEventListener('focus', function() {
        timePicker.style.display = 'inline';
        timePicker.focus();
    });

    // Live update as user selects time
    timePicker.addEventListener('input', function() {
        let [hours, minutes] = timePicker.value.split(':');
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        let hours12 = hours % 12;
        hours12 = hours12 ? hours12 : 12;
        timeField.value = `${String(hours12).padStart(2, '0')}:${minutes} ${ampm}`;
    });

    // Hide picker if it loses focus
    timePicker.addEventListener('blur', function() {
        setTimeout(() => { timePicker.style.display = 'none'; }, 200);
    });
});

document.getElementById('createForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const reading = document.getElementById('current_reading').value;
    const date = document.getElementById('date_field').value;
    const time = document.getElementById('time_field').value;

    // Create new row
    const tableBody = document.getElementById('dataTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td class="readingValue">${reading}</td>
        <td class="dateValue">${date}</td>
        <td class="timeValue">${time}</td>
    `;

    // Add new row to top
    tableBody.insertBefore(newRow, tableBody.firstChild);

    // Remove rows if more than 5
    while (tableBody.rows.length > 5) {
        tableBody.deleteRow(-1); // Remove last row
    }

    // Clear the form and reset date/time to current
    document.getElementById('createForm').reset();
    setCurrentDateTime();
});

window.addEventListener('DOMContentLoaded', function() {
    // Set today's date
    const dateField = document.getElementById('date_field');
    if (dateField) {
        const today = new Date().toISOString().split('T')[0];
        dateField.value = today;
    }

    // Set current time in hh:mm AM/PM format
    const timeField = document.getElementById('time_field');
    if (timeField) {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        minutes = minutes < 10 ? '0' + minutes : minutes;
        timeField.value = hours + ':' + minutes + ' ' + ampm;
    }
});
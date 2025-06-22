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
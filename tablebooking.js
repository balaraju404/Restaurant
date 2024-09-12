document.getElementById("closeIcon").addEventListener("click", toggleSidebar);
document.getElementById("threeBars").addEventListener("click", openSidebar);

function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.width = `0%`;
    sidebar.style.right = `-7vw`;
}

function openSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.width = `40vw`;
    sidebar.style.right = `0`;
}

let date = new Date();
let month = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
let day = date.getDate();
let mm = date.getMonth();
let yy = date.getFullYear();
console.log(date.getDate(), month[date.getMonth()])

let bookingDate = document.getElementById("bookingDate");
let bookingTime = document.getElementById("bookingTime");
let GuestCount = document.getElementById("GuestCount");

for (i = 0; i <= 5; i++) {
    let option = document.createElement("option");
    if (day > 30) {
        mm = mm + 1;
        day = 1;
    }
    option.innerHTML = `${month[mm]} ${day} , ${yy}`;
    option.value = `${month[mm]} ${day} , ${yy}`
    bookingDate.appendChild(option);
    day++;
}

for (i = 1; i <= 10; i++) {
    let option = document.createElement("option");
    option.innerHTML = i;
    option.value = i;
    GuestCount.appendChild(option);
}

function submitBooking() {
    let selectedDate = bookingDate.value;
    let selectedTime = bookingTime.value;
    let SelectedGuestCount = GuestCount.value;
    let name = document.getElementById("name").value;
    let phno = document.getElementById("phno").value;

    let tableBookingDetails = {
        date: selectedDate,
        time: selectedTime,
        count: SelectedGuestCount,
        name: name,
        phno: phno
    }
    localStorage.setItem("tableBookingDetails",JSON.stringify(tableBookingDetails))
    console.log(tableBookingDetails);
    alert(`Thank you, ${name}! Your table for ${SelectedGuestCount} people on ${selectedDate} at ${selectedTime} has been booked successfully`)
}

let tableImages=document.getElementById("tableImages");
let images=["table1.webp","table2.webp","table3.webp","table4.webp"]
let count=0;
function inc() {
    if (count>=0 && count<images.length-1){
        count++;
        tableImages.style.backgroundImage=`url(./Media/Image/${images[count]})`
    }
    else{

    }
    
}
function dec() {
    if (count>0 && count<images.length){
        count--;
        tableImages.style.backgroundImage=`url(./Media/Image/${images[count]})`
    }
    else{

    }
}
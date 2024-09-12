
document.getElementById("closeIcon").addEventListener("click", closeSidebar);
document.getElementById("threeBars").addEventListener("click", openSidebar);

function openSidebar() {
    setSidebarProperties("40vw", "0");
}

function closeSidebar() {
    setSidebarProperties("0%", "-7vw");
}

function setSidebarProperties(width, right) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.width = width;
    sidebar.style.right = right;
}

let cartItems = JSON.parse(localStorage.getItem("cartdata")) ?? [];
let allBtns = document.querySelectorAll("button");
let allItemTitle = document.getElementsByClassName("itemTitle");
let allItemPrice = document.getElementsByClassName("price");
let allItemImg = document.getElementsByClassName("itemImage");

let count = localStorage.getItem("count") ?? 0;
document.getElementById("cartCount").innerHTML = count;

for (let i = 0; i < allBtns.length - 1; i++) {
    allBtns[i].addEventListener("click", function () {
        try {
            handleButtonClick(i);
        } catch (error) {
            console.error("Error handling button click:", error);
        }
    });
}

function handleButtonClick(index) {
    if (index < 0 || index >= allItemTitle.length) {
        throw new Error("Invalid button index");
    }

    const title = allItemTitle[index].textContent;
    const price = allItemPrice[index].textContent;
    const img = allItemImg[index].src;

    const existingItemIndex = cartItems.findIndex(item => item.title === title);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].qty++;
    } else {
        const selectedItem = {
            title: title,
            image: img,
            price: price,
            qty: 1,
        };
        cartItems.push(selectedItem);
        count++;
        localStorage.setItem("count", count);
        document.getElementById("cartCount").innerHTML = count;
    }

    localStorage.setItem("cartdata", JSON.stringify(cartItems));
}


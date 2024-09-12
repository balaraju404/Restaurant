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

const cartItems = JSON.parse(localStorage.getItem("cartdata")) || {};
const startOrderHTML = `<h2>YOUR CART IS EMPTY. LET'S <br>START AN ORDER!</h2><button>Start Order</button>`;
console.log(cartItems);

let count = localStorage.getItem("count") || 0;
document.getElementById("cartCount").innerHTML = count;

let totalSum = 0;

function updateTotalSum() {
    totalSum = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (typeof totalSum === 'number') {
        document.getElementById("totalSum").innerText = `$${totalSum.toFixed(2)}`;
    } else {
        console.error("Error: totalSum is not a number");
    }
}

function updateCartDisplay() {
    document.querySelector("#displayCartItems").innerHTML = "";
    cartItems.forEach((item, index) => {
        const itemsContainer = createCartItemElement(item, index);
        document.querySelector("#displayCartItems").appendChild(itemsContainer);
    });

    document.querySelector("#totalBillContainer").innerHTML = "";
    cartItems.forEach((item) => {
        const totalItemContainer = createTotalItemElement(item);
        document.querySelector("#totalBillContainer").appendChild(totalItemContainer);
    });
}

function createCartItemElement(item, index) {
    const itemsContainer = document.createElement("div");
    itemsContainer.innerHTML = `
        <img src=${item.image}>
        <div class="oc">
            <div id="ic1">
                <h5>${item.title}</h5>
                <h4>$${item.price}</h4>
            </div>
            <div id="quantity">
                <h4>
                    <span id="qtyDec" onclick="qtyDecFun(${index})"> - </span>
                    <span id="qtyValue">${item.qty}</span>
                    <span id="qtyInc" onclick="incQtyFun(${index})"> + </span>
                </h4>
                <div id="removeItem">
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        </div>`;
    return itemsContainer;
}

function removeItem(index){
    cartItems.splice(index,1)
    intializeArray();
    updateCartDisplay();
    updateTotalSum();
    count--;
    localStorage.setItem("cartdata",JSON.stringify(cartItems))
    localStorage.setItem("count",count)
    document.getElementById("cartCount").innerHTML = count;

}

function createTotalItemElement(item) {
    const totalItemContainer = document.createElement("div");
    totalItemContainer.innerHTML = `
        <p id="item">${item.title}</p>
        <p id="qty">${item.qty} X $${item.price}</P>
        <p>$${item.price * item.qty}</p>`;
    return totalItemContainer;
}

function qtyDecFun(index) {
    if (cartItems[index].qty > 1) {
        cartItems[index].qty--;
        updateCartDisplay();
        updateTotalSum();
        localStorage.setItem("cartdata",JSON.stringify(cartItems))
    }
}

function incQtyFun(index) {
    if (cartItems[index].qty < 5) {
        cartItems[index].qty++;
        updateCartDisplay();
        updateTotalSum();
        localStorage.setItem("cartdata",JSON.stringify(cartItems))
    }
}

function intializeArray() {
    cartItems.forEach((item, index) => {
        const itemsContainer = createCartItemElement(item, index);
        document.querySelector("#displayCartItems").appendChild(itemsContainer);
    
        const totalItemContainer = createTotalItemElement(item);
        document.querySelector("#totalBillContainer").appendChild(totalItemContainer);
    
        totalSum = totalSum + item.price;
    });
}
intializeArray();

updateTotalSum();


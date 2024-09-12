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

let cartdata = JSON.parse(localStorage.getItem("cartdata")) ?? [];
let count = localStorage.getItem("count") ?? 0;
document.getElementById("cartCount").innerHTML = count;

async function getData() {
    try {
        let res = await fetch("./items.json")
        let data = await res.json();
        return data;
    }
    catch (error) {
        console.error("fetch error : " + error);
    }
}

async function fetchData() {
    let items = await getData();
    console.log(items);
    items.map((data) => {
        // console.log(data);
        if (data.catogory == "Biryani") {
            let biryaniContainer = document.getElementById("biryaniContainer");
            let div = document.createElement("div");
            div.className = "items";
            div.innerHTML = `
            <img src=${data.image} class="itemImage" >
            <h3 class="itemTitle">${data.title}</h3>
            <h3 class="itemPrice">&#8377 ${data.price}</h3>
            <p class="itemInfo">${data.description}</p>
            <button onclick="addToCart(${data.id},'${data.title}','${data.image}',${data.price})">Add to Cart</button>
            `
            biryaniContainer.appendChild(div)
        }
        else if (data.catogory == "Pizza") {
            let pizzaContainer = document.getElementById("pizzaContainer");
            let div = document.createElement("div");
            div.className = "items";
            div.innerHTML = `
            <img src=${data.image} class="itemImage" >
            <h3 class="itemTitle">${data.title}</h3>
            <h3 class="itemPrice">&#8377 ${data.price}</h3>
            <p class="itemInfo">${data.description}</p>
            <button onclick="addToCart(${data.id},'${data.title}','${data.image}',${data.price})">Add to Cart</button>
            `
            pizzaContainer.appendChild(div)
        }
    })
}
fetchData()

function addToCart(id, title, image, price) {
    let existingItemIndex = cartdata.findIndex(item => item.title === title)
    if (existingItemIndex !== -1) {
        let qty = cartdata[existingItemIndex].qty;
        if (qty<=4) {
            cartdata[existingItemIndex].qty++;
        }
        else{
            alert("Maximum purchase count is 5");
        }
    }
    else {
        count++;
        let item = {
            title: title,
            image: image,
            price: price,
            qty: 1
        }
        cartdata.push(item);
    }

    console.log(cartdata);
    localStorage.setItem("cartdata", JSON.stringify(cartdata));
    localStorage.setItem("count", count)
}
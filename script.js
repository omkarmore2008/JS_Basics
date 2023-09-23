

const products = [
    {
        productID: 1,
        productName: "i Phone 14 Pro",
        productType: "8Gb 128Gb",
        productPrice: 135490,
        productImage: 'images/iphone.jpeg'
    },
    
    {
        productID: 2,
        productName: "Samsung Galaxy s22",
        productType: "12Gb 512Gb",
        productPrice: 118999,
        productImage: 'images/samsung.jpg'
    },

    {
        productID: 3,
        productName: "Redmi 11 Prrime",
        productType: "4Gb 64Gb",
        productPrice: 12999,
        productImage: 'images/redmi.webp'
    },

    {
        productID: 4,
        productName: "One Plus Nord 2T",
        productType: "8Gb 128Gb",
        productPrice: 28590,
        productImage: 'images/oneplus.jpg'
    }
]

// let totalPriceOfCart = 0;
let count = 0;
let Cart = new Object();
let mainList = document.getElementById("products");
let finalList = document.getElementById("finalCart");

document.getElementById("buyBtn").classList.add("disabled");


products.forEach(data => {

    let list = document.createElement("div");
    list.id = "product" + data['productID'];
    list.classList.add('card', 'h-auto', 'w-25', 'm-4', 'p-3');

    let productName = document.createElement("h4");
    let productType = document.createElement("h5");
    let productImage = document.createElement("img");
    let productPrice = document.createElement("p");
    let items = document.createElement("span");
    let removeButton = document.createElement("button");
    let numberOfItems = document.createElement("input");
    let addButton = document.createElement("button");
    let addToCartButton = document.createElement("button");

    addToCartButton.classList.add("btn", "btn-success", "mt-2", "p-2");
    addToCartButton.innerHTML = "Add to cart";
    addToCartButton.disabled = true;

    items.classList.add("d-flex");
    items.appendChild(removeButton);
    items.appendChild(numberOfItems);
    items.appendChild(addButton);

    mainList.appendChild(list);
    list.appendChild(productName);
    list.appendChild(productType);
    list.appendChild(productImage);
    list.appendChild(productPrice);
    list.appendChild(items);
    list.appendChild(addToCartButton)


    productName.innerHTML = data['productName'];
    productType.innerHTML = data['productType'];
    productPrice.innerHTML = "Rs " + data['productPrice'] + "/-";
    productImage.src = data['productImage'];

    removeButton.innerText = "-";
    removeButton.disabled = true;
    removeButton.id = "productRemove" + data['productID']
    numberOfItems.setAttribute('value', 0);
    numberOfItems.id = "item" + data['productID'];
    numberOfItems.disabled = true;
    numberOfItems.style = "width: 50px; text-align: center;"


    addButton.innerText = "+";
    addButton.id = "productAdd" + data['productID'];
    let itemCounter = 0;

    addButton.addEventListener('click', function () {
        addToCartButton.disabled = false;
        itemCounter++;

        document.getElementById(`item${data['productID']}`).setAttribute('value', itemCounter);
        if (itemCounter != 5) {
            addButton.disabled = false;
            removeButton.disabled = false;
        }
        else {
            addButton.disabled = true;
        }

    })

    removeButton.addEventListener('click', function () {
        if (itemCounter == 0) {
            removeButton.disabled = true;
            addButton.disabled = false;
            addToCartButton.disabled = true;

        }
        else {
            itemCounter--;

            document.getElementById(`item${data['productID']}`).setAttribute('value', itemCounter);
            removeButton.disabled = false;
            addButton.disabled = false;
        }
    })
    addToCartButton.addEventListener('click', function () {
        addToCartButton.disabled = true;
        addButton.disabled = true;
        removeButton.disabled = true;
        numberOfItems.setAttribute('value', 0);
        addToCart(itemCounter, data);

        finalList.classList.add("card");
        itemCounter = 0;

    })
})

function addToCart(itemCounterFinalList, data) {
    Cart[data['productID']] = itemCounterFinalList * data['productPrice']
    
    let cartList = document.createElement("div");
    cartList.classList.add('m-2', 'p-1');

    let productName = document.createElement("h4");

    let productPrice = document.createElement("p");
    let totalPriceOfItem = document.createElement("h6");

    let items = document.createElement("span");
    let removeButton = document.createElement("button");
    let numberOfItems = document.createElement("input");
    numberOfItems.disabled = true;
    numberOfItems.style = "width: 50px; text-align: center;"
    let addButton = document.createElement("button");

    items.classList.add("d-flex");
    items.appendChild(removeButton).innerText = "-";
    items.appendChild(numberOfItems).value = itemCounterFinalList;
    items.appendChild(addButton).innerText = "+";

    // finalList.appendChild(cartList)
    let sp2 = document.getElementById('finalTotalAmount');
    let parentDiv = sp2.parentNode;
    parentDiv.insertBefore(cartList, sp2)

    cartList.appendChild(productName);
    cartList.appendChild(productPrice);
    cartList.appendChild(items);
    cartList.appendChild(totalPriceOfItem);

    numberOfItems.id = "finalItem" + data['productID']
    productName.innerHTML = data['productName'];

    productPrice.innerHTML = "Rs. " + data['productPrice'] + "/-";

    let totalPriceOfEach = itemCounterFinalList * data['productPrice'];
    totalPriceOfItem.innerHTML = "Total :Rs. " + totalPriceOfEach + "/- <hr>"


    document.getElementById('finalTotalAmount').innerText = "Total :Rs. " + calculatePriceOfEach() + "/-";
    removeButton.id = "productRemoveFinal" + data['productID']
    addButton.id = "productAddFinal" + data['productID']


    function calculatePriceOfEach() {
        totalPriceOfEach = itemCounterFinalList * data['productPrice'];
        totalPriceOfItem.innerHTML = "Total :Rs. " + totalPriceOfEach + "/- <hr>";
        Cart[data['productID']] = totalPriceOfEach;
        let totalPriceOfCart = 0;
        for (const k in Cart) {
            totalPriceOfCart = totalPriceOfCart + Cart[k];
        }
        document.getElementById("finalTotalAmount").innerText = "Total :Rs. " + totalPriceOfCart + "/-";
        if (totalPriceOfCart == 0) {
            document.getElementById("buyBtn").classList.add("disabled");
        }
        else {
            document.getElementById("buyBtn").classList.remove("disabled");

        }
    }
    addButton.addEventListener('click', function () {

        itemCounterFinalList++;
        document.getElementById(`finalItem${data['productID']}`).value = itemCounterFinalList;

        calculatePriceOfEach()

        if (itemCounterFinalList != 5) {
            addButton.disabled = false;
            removeButton.disabled = false;
        }
        else {
            addButton.disabled = true;
        }

    })

    removeButton.addEventListener('click', function () {
        if (itemCounterFinalList <= 1) {
            removeButton.disabled = true;
            addButton.disabled = false;
            finalList.removeChild(cartList);
            document.getElementById(`productAdd${data['productID']}`).removeAttribute("disabled");
            delete Cart[`${data['productID']}`];
            let totalPriceOfCart = 0;
            for (const k in Cart) {
                totalPriceOfCart = totalPriceOfCart + Cart[k];
            }
            document.getElementById("finalTotalAmount").innerText = "Total :Rs. " + totalPriceOfCart + "/-";
            if (totalPriceOfCart == 0) {
                document.getElementById("buyBtn").classList.add("disabled");
            }
            else {
                document.getElementById("buyBtn").classList.remove("disabled");

            }
        }
        else {

            itemCounterFinalList--;
            document.getElementById(`finalItem${data['productID']}`).value = itemCounterFinalList;

            calculatePriceOfEach()

            addButton.disabled = false;
        }
    })


    let totalPriceOfCart = 0;
    for (const k in Cart) {
        totalPriceOfCart = totalPriceOfCart + Cart[k];
    }
    document.getElementById("finalTotalAmount").innerText = "Total :Rs. " + totalPriceOfCart + "/-";


    if (totalPriceOfCart == 0) {
        document.getElementById("buyBtn").classList.add("disabled");
    }
    else {
        document.getElementById("buyBtn").classList.remove("disabled");

    }
}


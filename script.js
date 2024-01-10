let apiUrl="https://crudcrud.com/api/b981183c55c84aaaba2e2683e8c2f19b/totalAvailableproducts";
let totalItemList = document.getElementById('users');
let btn = document.querySelector("button");

btn.addEventListener("click",(event)=>{
   event.preventDefault();
   let itemName = document.querySelector("#item-name").value;
   let description = document.querySelector("#description").value;
   let price = document.querySelector("#price").value;
   let qty = document.querySelector("#quantity").value;
    
   let obj={
    itemName,
    description,
    price,
    qty
   }

   axios.post(apiUrl,obj)
   .then((response)=>{
    showUserOnScreen(response.data);
    console.log(response)
   })
   .catch((error)=>console.log(error))
})

function addNumber(user,updatedQty){
    let ItemName = user.itemName;
    let Description = user.description;
    let Price =user.price;
    
    let obj={
        ItemName,
        Description,
        Price,
        qty: updatedQty
    }
    axios.put(`${apiUrl}/${user._id}`,obj)
    .then((response)=>{
        console.log(response)
        // Update the quantity on the web page
        let liToUpdate = document.querySelector(`li[data-id="${user._id}"]`);
        liToUpdate.childNodes[0].nodeValue = `${user.itemName} : ${user.description} : ${user.price} : ${updatedQty} `;
    })
    .catch((error)=>console.log(error))
}


function showUserOnScreen(user){
    let li = document.createElement('li');
    li.setAttribute('data-id', user._id); // Add a custom attribute to uniquely identify the li element
    let details = document.createTextNode(`${user.itemName} : ${user.description} : ${user.price} :${user.qty} `);
    
    //For buying the one quantity
    let buyOneItem = document.createElement('input');
    buyOneItem.type = 'button';
    buyOneItem.value = "Buy One Item"
    buyOneItem.style.margin='5px'
    buyOneItem.style.backgroundColor='lightPink'
    
    buyOneItem.onclick=()=>{
        addNumber(user,user.qty-1);
    }

    //For buying the two quantity
    let buyTwoItem = document.createElement('input');
    buyTwoItem.type = 'button';
    buyTwoItem.value = "Buy Two Items"
    buyTwoItem.style.margin= '5px'
    buyTwoItem.style.backgroundColor="blue";

    buyTwoItem.onclick=()=>{
        addNumber(user,user.qty-2);
    }

    // For buying the three quantity
    let buyThreeItem = document.createElement('input');
    buyThreeItem.type = 'button';
    buyThreeItem.value = "Buy Three Items"
    buyThreeItem.style.margin='5px'
    buyThreeItem.style.background="red"

    buyThreeItem.onclick=()=>{
        addNumber(user,user.qty-3)
    }

    // Append elements to the li
    li.appendChild(details);
    li.appendChild(buyOneItem);
    li.appendChild(buyTwoItem);
    li.appendChild(buyThreeItem);

    // Append the li to the ul
    totalItemList.appendChild(li);

}
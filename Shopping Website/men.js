let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name:'Blue Shrit',
        tag:'shirt1',
        price: 350,
        inCart:0
        },
        {
        name:'Purple Shirt',
        tag:'shirt2',
        price: 450,
        inCart:0
        },
        {
        name:'Pink Shirt',
        tag:'shirt3',
        price: 450,
        inCart:0
        },
        {
        name:'Light Blue Shirt',
        tag:'shirt4',
        price: 550,
        inCart:0
        },
        {
        name:'Solid black T-shirt',
        tag:'1tshirt',
        price: 350,
        inCart:0
        },
        {
        name:'White T-shirt',
        tag:'2tshirt',
        price: 400,
        inCart:0
        },
        {
        name:'Tri-color T-shirt',
        tag:'3tshirt',
        price: 150,
        inCart:0
        },
        {
        name:'Black T-shirt',
        tag:'4tshirt',
        price: 250,
        inCart:0
        },
        {
        name:'Shoes',
        tag:'1acc',
        price: 450,
        inCart:0
        },
        {
        name:'Leather Bag',
        tag:'2acc',
        price: 400,
        inCart:0
        },{
        name:'Belt',
        tag:'3acc',
        price: 250,
        inCart:0
        },
        {
        name:'Watch',
        tag:'4acc',
        price:300,
        inCart:0
        },
  
]

for(let i=0;i< carts.length;i++)
{
    carts[i].addEventListener('click',()=>
    {
        cartNumbers(products[i]);
        totalCost(products[i])
    } )
}

function onLoadCartNumber()
{
    let productNumbers =localStorage.getItem('cartNumbers');
    if(productNumbers)
    {
        document.querySelector('.cart span').textContent=  "Cart" + productNumbers;
    }
}

function cartNumbers(product)
{
    
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers= parseInt(productNumbers);
    if(productNumbers)
    {
        localStorage.setItem('cartNumbers', productNumbers +1);
        document.querySelector('.cart span').textContent=  productNumbers +1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent =  1;
    }
    setItems(product);
}

function setItems(product)
{
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    console.log("My cartItems are",cartItems);



    if(cartItems !=null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems={
                ...cartItems,[product.tag]:product
            }
        }
        cartItems[product.tag].inCart +=1;
    }
    else{
        product.inCart=1;
    cartItems={
        [product.tag]: product
    }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product)
{
 let cartCost=localStorage.getItem('totalCost');
 
 console.log("My cartCost is",cartCost);
 console.log(typeof cartCost);


if(cartCost!= null)
{
    cartCost=parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
}

else{
    localStorage.setItem("totalCost",product.price);
}
}

function displayCart()
{
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    let cartCost=localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer) 
    {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
           <i class="fa fa-times"></i>
            <img src="./living/${item.tag}.jpeg">
             <span>${item.name}  </span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity"> <i class="fa fa-plus" ></i><span>${item.inCart}</span><i class="fa fa-minus" ></i> </div>
             <div class="total">
             $${item.inCart *item.price}.00
             </div>
            `
        });
        productContainer.innerHTML +=`
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total= </h4>
        <h4 class="basketTotal">
         $${cartCost}.00
        </h4>

        </div>`

    }
}

onLoadCartNumber();
displayCart();
let carts=document.querySelectorAll('.add-cart');
let products=[
   {
    name: 'Leafy Plant',
    tag:'1plant',
    price:50 ,
    inCart:0
   },
   {
    name: 'Aloevera',
    tag:'2plant',
    price: 40,
    inCart:0
   },
   {
    name: 'Snake Plant',
    tag:'3plant',
    price: 70,
    inCart:0
   },
   {
    name: 'Hanging Plant',
    tag:'4plant',
    price: 100,
    inCart:0
   },
   {
    name: 'Well decor',
    tag:'1well',
    price: 150,
    inCart:0
   },
   {
    name: 'Well Frame',
    tag:'2well',
    price: 30,
    inCart:0
   },
   {
    name: 'Hanging Pot',
    tag:'3well',
    price:80 ,
    inCart:0
   },
   {
    name: 'Mirror',
    tag:'4well',
    price: 200,
    inCart:0
   },
   {
    name: 'Brown Coffee Table',
    tag:'1fur',
    price: 350,
    inCart:0
   },
   {
    name: 'Round Coffee Table',
    tag:'2fur',
    price: 300,
    inCart:0
   },
   {
    name: 'Black Coffee Table',
    tag:'3fur',
    price: 500,
    inCart:0
   },
   {
     name: 'White Coffee Table',
     tag:'4fur',
     price: 250,
    inCart:0
   }, 
   {
    name: 'Blue Dress',
    tag:'1dress',
    price:450 ,
    inCart:0
   },
   {
    name: 'Pink Dress',
    tag:'2dress',
    price: 600,
    inCart:0
   },
   {
    name: 'Red Dress',
    tag:'3dress',
    price: 500,
    inCart:0
   },
   {
    name: 'Jumpsuit',
    tag:'4dress',
    price: 550,
    inCart:0
   },
   {
    name:'White Salwar',
    tag:'1ind',
    price: 450,
    inCart:0
    },
    
    {
    name:'Blue Salwar',
    tag:'2ind',
    price: 500,
    inCart:0
    },
    {
    name:'Red Salwar',
    tag:'3ind',
    price: 600,
    inCart:0
    },
    {
    name:'Maroon Salwar',
    tag:'4ind',
    price: 550,
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
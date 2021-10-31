var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}





















let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name:'Neon Heels',
        tag:'sale1',
        price:350,
        inCart:0
        },
        {
        name:'Formal Shoe',
        tag:'sale2',
        price: 400,
        inCart:0
        },
        {
        name:'Watch',
        tag:'sale3',
        price: 250,
        inCart:0
        },
        {
        name:'Home Decor',
        tag:'sale4',
        price: 150,
        inCart:0
        },
        {
        name:'Orange Dress',
        tag:'women1',
        price: 250,
        inCart:0
        },
        {
        name:'Pink Dress',
        tag:'women5',
        price: 400,
        inCart:0
        },
        {
        name:'Red Dress',
        tag:'women3',
        price: 700,
        inCart:0
        },
        {
        name:'Green Dress',
        tag:'women4',
        price: 450,
        inCart:0
        },
        {
        name:'Black Shirt',
        tag:'men1',
        price: 200,
        inCart:0
        },
        {
        name:'White T-shirt',
        tag:'men2',
        price: 350,
        inCart:0
        },
        {
        name:'Pink Shirt',
        tag:'men3',
        price: 250,
        inCart:0
        },
        {
        name:'Black-White Shirt',
        tag:'men4',
        price: 400,
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
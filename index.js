let left_side_links = [
    { link: '', icon: ' fa-house', name: 'Home' },
    { link: '', icon: ' fa-bag-shopping', name: 'Order' },
    { link: '', icon: ' fa-utensils', name: 'Menu' },
    { link: '', icon: ' fa-wallet', name: 'Wallet' },
    { link: '', icon: ' fa-clock', name: 'History' },
    { link: '', icon: ' fa-house', name: 'Promos' },
    { link: '', icon: ' fa-money-bills', name: 'Bills' },
    { link: '', icon: ' fa-gear', name: 'Settings' }
]
let category_list = [
    { name: 'All Items', img: 'ic-empty-cart.svg' },
    { name: 'Pizaa', img: 'Potato-Wedges-newpwa1-new2.jpg' },
    { name: 'Burger', img: 'BBQ-Spin-Rolls-newpwa1-new2.jpg' },
    { name: 'Rice', img: 'Creamy Ranch 175x175.jpg' },
    { name: 'Dessert', img: 'Chicken-Tenderloins-newpwa1-new2.jpg' }
]
let products = [
    { id: 1, name: 'Farm Villa', img: 'BBQ Chicken Pizza 175x175.png', price: 8 },
    { id: 2, name: 'Tandoori Paneer', img: 'Dynamic Ranch New.png', price: 10},
    { id: 3, name: 'Cheezy-7', img: 'Margherita-p1.png', price: 19 ,count:1},
    { id: 4, name: 'Marghrita', img: 'Super-Supreme-p1.png', price: 12},
    { id: 5, name: 'Sweet Corn', img: 'Classic-Pepperoni-p1.png', price: 13 },
    { id: 6, name: 'Chicken Pizza', img: 'Cheese-Lovers-p1.png', price: 22},
]
let left_side_links_container = document.getElementById('links_container')
let left_side_links_html = ''
let categories_list_container = document.getElementById('categories_list_container')
let category_list_html = ''
let products_container = document.getElementById('products_container')
let products_html = ''
let cartItems = []
let cartitems_container = document.getElementById('cartitems')
let cartitems_html = ''
let sub_total = document.getElementById('sub_total')
let taxid = document.getElementById('tax')
let totalid = document.getElementById('totalid')
// start left sidebar links
function showLeftSideLinks() {
    left_side_links.forEach(item => {
        left_side_links_html += `
    <div class="col-6 mb-3">
        <a class="rounded p-2">
            <i class="fa-solid ${item.icon}"></i>
            <span>${item.name}</span>
        </a>
    </div>
    `
    })
    left_side_links_container.innerHTML = left_side_links_html
}
showLeftSideLinks()
// end left sidebar links
// start category lists
function showCategoryList() {
    category_list.forEach(item => {
        category_list_html += `
        <li>
            <img src="images/${item.img}" alt="">
            <small class="fw-bold">${item.name}</small>
        </li>
    `
    })
    categories_list_container.innerHTML = category_list_html
}
showCategoryList()
// end category lists
// start products
function  showProducts()  {
    products_html=''
    products.forEach((item,index) => {
        products_html += `
        <article class="col-md-4 mb-3">
        <div class="rounded bg-white p-3">
            <div class="text-center mb-3">
                <img src="images/${item.img}" alt="">
                <h3 class="small_h3 text-center">
                    <span class="d-block mb-2">${item.name}</span>
                    <span class="d-block">${item.price}$</span>
                </h3>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <ul class="sizes_list d-flex m-0 list-unstyled p-0">
                    <li>S</li>
                    <li>M</li>
                    <li>L</li>
                </ul>
                <div>
                    <button

                    onclick='addItemToCart(${item.id})'
                    class="add_button ${cartItems.some(cartitm => cartitm.id==item.id)  ? 'active' : ' '}">
                    ${cartItems.some(cartitm => cartitm.id==item.id)  ? 'Added' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    </article>
    `
    })
    products_container.innerHTML = products_html
}
showProducts()
// end products

function addItemToCart(product_id) {
    if(!cartItems.some(i => i.id == product_id)) {
        cartItems.push(products.find(item => item.id==product_id))
        cartItems[cartItems.length-1].count=1
        showProducts()
        showCartItems()
    }
    getTotal()
}
// end add to cart
function  showCartItems()  {
    cartitems_html=''
    if(cartItems.length) {
        cartItems.forEach((item,index) => {
            cartitems_html += `
            <div class="cart-item mb-3 rounded p-2 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center left">
                <img src="images/${item.img}" alt="">
                <h3 class="m-0">
                    <span class="d-block mb-1">${item.name}</span>
                    <span>${item.price*item.count} $</span>
                </h3>
            </div>
            <div class="text-center">
                <div class="bg-white count radius-20 p-1">
                    <i 
                    onclick=(plusOne(${index}))
                    class="fa-solid fa-plus count"></i>
                    <span class='count'>${item.count}</span>
                    <i 
                    onclick='minusOne(${index})'
                    class="fa-solid fa-minus count"></i>
                </div>
                <button 
                onclick='removeItem(${index})'
                class="remove-btn">Remove</button>
            </div>
        </div>
        `
        })
    } else {
        cartitems_html += `
        <div class="text-center">
            <img src="images/ic-empty-cart.svg" alt="" class="img-fluid">
            <p class="fw-bold text-secondary my-2">
            YOUR CART IS EMPTY
            </p>
        </div>
    `
    }

    cartitems_container.innerHTML = cartitems_html
}
showCartItems() 
// end show cart items
// start remove cart item
function removeItem(index) {
    cartItems.splice(index, 1)
    showCartItems()
    showProducts()
    getTotal()
}
// end remove cart item
// start get total
function getTotal() {
    let sub_totall = 0
    if(cartItems.length) cartItems.forEach(item => sub_totall+=(item.price*item.count))
    sub_total.innerHTML=`$${(sub_totall).toFixed(2)}`
    taxid.innerHTML = `$${(sub_totall*.10).toFixed(2)}`
    totalid.innerHTML=`$${sub_totall==0 ? '0.00' : (sub_totall+sub_totall*.10).toFixed(2)}`
}
getTotal()
// end get total
// start plus one
function plusOne(index) {
    cartItems[index].count+=1
    getTotal()
    showCartItems()
}
// end plus one
// start minus one
function minusOne(index) {
    cartItems[index].count-=1
    if(cartItems[index].count==0) {
        cartItems.splice(index,1)
    } 
    getTotal()
    showCartItems()
    showProducts()
}
// end minus one

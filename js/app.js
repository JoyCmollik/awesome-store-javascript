const loadProducts = () => {
	// load spinner
	document.getElementById('spinner-container').style.display = 'flex';

	// fetching data
	const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => showProducts(data));
};

const loadSingleProduct = (productId) => {
	fetch(`https://fakestoreapi.com/products/${productId}`)
		.then((res) => res.json())
		.then((json) => console.log(json));
};

// show all product in UI
const showProducts = (products) => {
	// stopping spinner
	document.getElementById('spinner-container').style.display = 'none';

	TODO: if (!products) {
		console.log('nothing');
	}
	const allProducts = products.map((pd) => pd);
	for (const product of allProducts) {
		const image = product.images;
		const div = document.createElement('div');
		div.classList.add('product');
		div.innerHTML = `
      		<article class="single-product">

				<!-- img -->
				<div class="product-img">
					<img
						src="${product.image}"
						alt="product image"
					/>
				</div>

				<p class="product-category">${product.category}</p>

				<h4 class="product-title">
					${product.title} </h4>

				<!-- info -->
				<div class="product-info">
					<h2 class="product-price">$${product.price}</h2>
					<!-- rating -->
					<div class="rating flex-center">
						<div class="rating-item rating-point">
							<img
								src="images/rating-star.svg"
								alt="start"
								width="25px"
							/>
							<h5>${product.rating.rate}</h5>
						</div>
						<div class="rating-item rating-count">
							<img
								src="images/rating-person.svg"
								alt="persons"
								width="25px"
							/>
							<h5>${product.rating.count}</h5>
						</div>
					</div>
					<!-- buttons -->
					<button type="button" onclick="loadSingleProduct('${product.id}')" class="details-btn" data-toggle="modal" data-target="#product-detail-modal">Know More Details</button>
					<button onclick="addToCart(${product.id},${product.price})" class="add-cart-btn">
						add to cart
					</button>
				</div>
			</article>
    `;
		document.getElementById('all-products').appendChild(div);
	}
};
let count = 0;
const addToCart = (id, price) => {
	count = count + 1;
	updatePrice('price', price);

	updateTaxAndCharge();
	document.getElementById('total-Products').innerText = count;
	updateTotal();
};

const getInputValue = (id) => {
	const element = document.getElementById(id).innerText;
	const converted = parseFloat(element);
	return converted;
};

// main price update function
const updatePrice = (id, value) => {
	const convertedOldPrice = parseFloat(getInputValue(id));
	const convertPrice = parseFloat(value);
	const total = convertedOldPrice + convertPrice;
	document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
	document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
	const priceConverted = getInputValue('price');
	if (priceConverted > 200) {
		setInnerText('delivery-charge', 30);
		setInnerText('total-tax', priceConverted * 0.2);
	}
	if (priceConverted > 400) {
		setInnerText('delivery-charge', 50);
		setInnerText('total-tax', priceConverted * 0.3);
	}
	if (priceConverted > 500) {
		setInnerText('delivery-charge', 60);
		setInnerText('total-tax', priceConverted * 0.4);
	}
};

//grandTotal update function
const updateTotal = () => {
	const grandTotal =
		getInputValue('price') +
		getInputValue('delivery-charge') +
		getInputValue('total-tax');
	document.getElementById('total').innerText = grandTotal.toFixed(2);
};

loadProducts();

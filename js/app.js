const loadProducts = () => {
	// load spinner
	document.getElementById('spinner-container').style.display = 'flex';

	// fetching data
	const url = `https://fakestoreapi.com/products`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => showProducts(data));
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
										src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
										alt="product image"
									/>
								</div>
								<h4 class="product-header"> ${product.title.slice(0, 40)} </h4>
								<!-- body -->
								<div class="product-body">
									<h2>$99</h2>
									<p>Category: Men's Cloth</p>
								</div>
								<div class="product-footer">
									<!-- rating -->
									<div class="rating flex-center">
										<div class="rating-item rating-point">
											<img
												src="images/rarting-star.svg"
												alt="start"
												width="25px"
											/>
											<h4 class="m-0">4.5</h4>
										</div>
										<div class="rating-item rating-count">
											<img
												src="images/rating-person.svg"
												alt="persons"
												width="25px"
											/>
											<h4 class="m-0">100</h4>
										</div>
									</div>
									<!-- buttons -->
									<button class="add-cart-btn">
										Add to Cart
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

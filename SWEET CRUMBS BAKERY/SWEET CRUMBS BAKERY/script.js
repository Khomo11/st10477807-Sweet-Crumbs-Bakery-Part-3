
// =====================================
// CONTACT FORM VALIDATION
// =====================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const contactName = document.getElementById("contact-name");
    const contactPhone = document.getElementById("contact-phone");
    const contactEmail = document.getElementById("contact-email");
    const contactMessage = document.getElementById("contact-message");
    const formMessage = document.getElementById("formMessage");

    function validateContactName() {
        const error = document.getElementById("nameError");

        if (!contactName || !error) return false;

        if (contactName.value.trim() === "") {
            error.textContent = "Full name is required.";
            return false;
        }

        if (!/^[a-zA-Z\s'-]+$/.test(contactName.value.trim())) {
            error.textContent = "Letters only. Numbers are not allowed.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateContactPhone() {
        const error = document.getElementById("phoneError");

        if (!contactPhone || !error) return false;

        if (contactPhone.value === "") {
            error.textContent = "Phone number is required.";
            return false;
        }

        if (!/^0\d{9}$/.test(contactPhone.value)) {
            error.textContent = "Enter a valid 10-digit phone number starting with 0.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateContactEmail() {
        const error = document.getElementById("emailError");

        if (!contactEmail || !error) return false;

        if (contactEmail.value.trim() === "") {
            error.textContent = "Email address is required.";
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value.trim())) {
            error.textContent = "Enter a valid email address.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateContactMessage() {
        const error = document.getElementById("messageError");

        if (!contactMessage || !error) return false;

        if (contactMessage.value.trim() === "") {
            error.textContent = "Please enter your message.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    contactPhone.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
        validateContactPhone();
    });

    contactName.addEventListener("input", validateContactName);
    contactEmail.addEventListener("input", validateContactEmail);
    contactMessage.addEventListener("input", validateContactMessage);

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const valid =
            validateContactName() &&
            validateContactPhone() &&
            validateContactEmail() &&
            validateContactMessage();

        if (valid) {
            formMessage.style.color = "green";
            formMessage.textContent =
                "Thank you! Your message has been submitted successfully.";

            contactForm.reset();

        } else {
            formMessage.style.color = "red";
            formMessage.textContent = "Please correct the errors above.";
        }
    });
}


// =====================================
// ENQUIRY FORM VALIDATION
// =====================================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    const enquiryName = document.getElementById("name");
    const enquiryEmail = document.getElementById("email");
    const enquiryPhone = document.getElementById("phone");
    const enquiryProduct = document.getElementById("product");
    const enquiryMessage = document.getElementById("message");
    const successMessage = document.getElementById("successMessage");

    function validateEnquiryName() {
        const error = document.getElementById("nameError");

        if (!/^[a-zA-Z\s'-]+$/.test(enquiryName.value.trim())) {
            error.textContent = "Enter your full name using letters only.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateEnquiryEmail() {
        const error = document.getElementById("emailError");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryEmail.value.trim())) {
            error.textContent = "Enter a valid email address.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateEnquiryPhone() {
        const error = document.getElementById("phoneError");

        if (!/^0\d{9}$/.test(enquiryPhone.value)) {
            error.textContent = "Enter a valid 10-digit phone number starting with 0.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateEnquiryProduct() {
        const error = document.getElementById("productError");

        if (enquiryProduct.value === "") {
            error.textContent = "Please select a product.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateEnquiryMessage() {
        const error = document.getElementById("messageError");

        if (enquiryMessage.value.trim() === "") {
            error.textContent = "Please enter your enquiry.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    enquiryPhone.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
        validateEnquiryPhone();
    });

    enquiryName.addEventListener("input", validateEnquiryName);
    enquiryEmail.addEventListener("input", validateEnquiryEmail);
    enquiryProduct.addEventListener("change", validateEnquiryProduct);
    enquiryMessage.addEventListener("input", validateEnquiryMessage);

    enquiryForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const valid =
            validateEnquiryName() &&
            validateEnquiryEmail() &&
            validateEnquiryPhone() &&
            validateEnquiryProduct() &&
            validateEnquiryMessage();

        if (valid) {
            successMessage.style.color = "green";
            successMessage.textContent =
                "Thank you! Your enquiry has been submitted successfully.";

            enquiryForm.reset();

        } else {
            successMessage.style.color = "red";
            successMessage.textContent =
                "Please correct all errors before submitting.";
        }
    });
}


// =====================================
// SHOPPING CART
// =====================================

let cart = JSON.parse(localStorage.getItem("bakeryCart")) || [];

function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is currently empty.</p>";
    }

    cart.forEach(function(item, index) {

        const subtotal = item.price * item.quantity;
        total += subtotal;

        cartItems.innerHTML += `
            <div class="cart-product">
                <h3>${item.name}</h3>
                <p>Price: R${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: R${subtotal.toFixed(2)}</p>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

                <hr>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);

    localStorage.setItem("bakeryCart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", updateCart);


function showWelcomeMessage() {
    document.getElementById("welcomeMessage").textContent =
        "Welcome to Sweet Crumbs Bakery! Thank you for visiting us. " +
        "We hope you enjoy our freshly baked treats. Have a lovely day!";
}

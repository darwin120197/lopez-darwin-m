/*========= TOGGLE ICON NAVBAR ==========*/
const menuIcon = document.getElementById("menu__icon"),
  navBar = document.getElementById("navbar"),
  navClose = document.getElementById("nav__close");

if (menuIcon) {
  //When we click on the menu icon, the navbar will show
  menuIcon.addEventListener("click", () => {
    navBar.classList.add("show");
  });
}

if (navClose) {
  //When we click on the nav__close icon, the number will remove
  navClose.addEventListener("click", () => {
    navBar.classList.remove("show");
  });
}

//Select all the elements with the class "nav__item"
const navLink = document.querySelectorAll(".nav__item");
navLink.forEach((navItem) => {
  //When we click on each nav__item then the navBar will remove
  navItem.addEventListener("click", () => {
    navBar.classList.remove("show");
  });
});

/*========= SCROLL SECTION ACTIVE LINK ==========*/
const section = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  section.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 150,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        "header nav a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active");
    } else {
      sectionClass.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", scrollActive);

/*========= SCROLL REVEAL ANIMATION ==========*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: "2500",
  delay: 300,
});

sr.reveal(".home__content, .heading", { oirigin: "top" });
sr.reveal(".home__img, .services__container, .portfolio__box, .contact form", {
  origin: "bottom",
});
sr.reveal(".home__content h1, .about__img", { origin: "left" });
sr.reveal(".home__content p, .about__content", {
  origin: "right",
});

/*========= SHOW SCROLL UP ==========*/
const scrollUp = () => {
  const scrollUp = document.querySelector("#scroll__up i");
  //When the scroll is higher than 350 viewport height, add the show-scroll class to the 'a' tag with the scrollup
  window.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};

window.addEventListener("scroll", scrollUp);

/*========= SmtpJS Mail =========*/
const form = document.getElementById("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phoneNum = document.getElementById("number");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phoneNum.value}<br> Message: ${mess.value}`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "darwinzky01@gmail.com",
    Password: "BBEC89D2BA2924C943B588BF8535A48D77DE",
    To: "darwinzky01@gmail.com",
    From: "darwinzky01@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success",
        text: "Your message sent successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");
  let hasEmptyfield = false;

  for (const item of items) {
    const errorMessage = item.parentElement.querySelector(".error-text");

    //Check inputs value
    if (item.value === "") {
      //Construct error message with placeholder's name
      const placeholderName = item.getAttribute("placeholder");

      //Show error message only for empty fields
      errorMessage.textContent = `${placeholderName} is required.`;

      hasEmptyfield = true;

      //Remove the error message after three seconds
      setTimeout(() => {
        errorMessage.textContent = "";
      }, 3000);
    } else {
      setTimeout(() => {
        item.value = "";
      }, 3000);
    }
  }

  //If no empty fields found, then send the email
  if (!hasEmptyfield) {
    sendEmail();
  }
}

//Delete the whitespace in text-area
window.addEventListener("load", () => {
  const textarea = document.getElementById("message");
  textarea.value = textarea.value.trim();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

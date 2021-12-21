document.addEventListener('DOMContentLoaded', () => init(), false);

const init = () => {
    showMenuHome();
    cargarMenu();

    let taplinks = document.querySelectorAll(".tablinks");
    taplinks.forEach(function (element) {
        element.addEventListener('click', openMenu);
    });
};

//NAV
const menuNav = document.getElementById('menuNav');
const menu = document.getElementById('menu');
const home = document.getElementById('home');
const specials = document.getElementById('specials');
const header = document.getElementById('main-header');
const footer = document.getElementById('footer');

const appetizers = document.getElementById('appetizers')
const meals = document.getElementById('meals')
const desserts = document.getElementById('desserts')
const beverages = document.getElementById('beverages')

const topSpecialsMenu = header.clientHeight + menuNav.clientHeight;

specials.style.top = topSpecialsMenu + "px";
menu.style.top = topSpecialsMenu + "px";
footer.style.top = topSpecialsMenu + specials.clientHeight + "px";

const showMenuHome = () => {

    menuNav.addEventListener('click', () => {
        specials.classList.add('none')
        menu.classList.add('show')
        menuNav.classList.add('sub')
        home.classList.remove('sub')
        topFooter();

    });
    home.addEventListener('click', () => {
        menu.classList.remove('show')
        specials.classList.remove('none')
        menuNav.classList.remove('sub')
        home.classList.add('sub')
        footer.style.top = topSpecialsMenu + specials.clientHeight + "px";
    });

}

//TABS
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

const topFooter = () => {
    footer.style.top = topSpecialsMenu + menu.clientHeight + "px";
}

function openMenu(evt) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    category = evt.currentTarget.dataset.category;
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(category).style.display = "block";
    evt.currentTarget.className += " active";
    fixHeight();
    topFooter();
}

const cardTemplate = '<div class="cards "> \
<a href="{imgUrl}" class="cards-link"> \
    <div class="cards-img"><img src="{imgUrl}" alt=""></div> \
    <div class="cards-body"> \
        <p class="cards-description"></p>#{nombre}</p> \
        <p class="cards-price">{precio}</p> \
    </div> \
</a> \
</div>'
const cargarMenu = () => {
    fetch('/menu.json')
        .then(res => {
            if (!res.ok) {
                throw new Error("No encontrado " + res.status);
            }
            return res.json()

        }).then((data) => {

            for (const card of data) {
                let temp = cardTemplate
                temp = temp.replace("{imgUrl}", "img/menu/" + card.imagen);
                temp = temp.replace("{imgUrl}", "img/menu/" + card.imagen);
                temp = temp.replace("{nombre}", card.id + ": " + card.nombre);
                temp = temp.replace("{precio}", card.precio);

                if (card.categoria === "appetizer") {
                    appetizers.children[0].appendChild($(temp)[0]);
                } else if (card.categoria === "meals") {
                    meals.children[0].appendChild($(temp)[0]);
                } else if (card.categoria === "dessert") {
                    desserts.children[0].appendChild($(temp)[0]);
                } else {
                    beverages.children[0].appendChild($(temp)[0]);
                }
            }
            $('a.cards-link').touchTouch();

            fixHeight();
        })
        .catch(res => {
            console.log(res);
        })

}

const fixHeight = () => {
    const cardImage = document.getElementsByClassName('cards-img');
    for (const card of cardImage) {
        card.style.height = card.clientWidth + "px";
    }
};
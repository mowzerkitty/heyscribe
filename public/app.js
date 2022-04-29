//Declaring ALL of our elements
//Page Declarations
let mainpage = document.querySelector("#main-page"); //this is our "home page"
let signup = document.querySelector("#sign-up");
let aboutus = document.querySelector("#about-us");
let myaccountclient = document.querySelector("#client-my-account");
let myaccountscribe = document.querySelector("#scribe-my-account");
let searchpage = document.querySelector("#discover");
let login = document.querySelector("#loginFc");
//Navbar
let logo = document.querySelector("#logo");
let linkwork = document.querySelector("#link-work");
let linkaboutus = document.querySelector("#link-about-us");
let useremail = document.querySelector("#user_email");
let btnlogin = document.querySelector("#btn-log-in");
let btnsignup = document.querySelector("#btn-sign-up");
let linksignup = document.querySelector("#link-sign-up");
//Search Page
let searchbar = document.querySelector("#search_bar"); //Search page will need more elements, still has some restaurant template IDs
let searchbutton = document.querySelector("#search_button");
let filterform = document.querySelector("#filter_form");
let letsgo = document.querySelector("#lets-go");
//Signup
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmpassword = document.querySelector("#confirmpassword");
let btnsignupsubmit = document.querySelector("#btn-sign-up-submit");
let linkogin = document.querySelector("#link-log-in");
let signupform = document.querySelector("#signup_form");
//login
let loginmodal = document.querySelector("#login-modal")
let loginmodalbg = document.querySelector("#login-modalbg")
let loginform = document.querySelector("#login_form")
let log_email = document.querySelector("#log_email")
let log_password = document.querySelector("#log_password")
let log_submitbtn = document.querySelector("#log_submitbtn")
let login_error = document.querySelector("#login_error")
//About Us probably needs elements for the Contact Us form still
//Account Type
let accounttypeform = document.querySelector("#accounttype_form");
//My Account (Client)
let modalone = document.querySelector("#modalOne");
let legal = document.querySelector("#legal");
let entertainment = document.querySelector("#entertainment");
let education = document.querySelector("#education");
let medical = document.querySelector("#medical");
let criteria = document.querySelector("#criteria");
let deadline = document.querySelector("#deadline");
let docpicker = document.querySelector("#docpicker");
//My Account (Scribe)

//Navigation Events
//Function for navigating pages
//---> login isn't listed here yet bc i tried adding it and it broke the whole site??
all_pages = [mainpage, signup, aboutus, myaccountclient, myaccountscribe, searchpage]

function navigate(button, destination) {
    button.addEventListener('click', () => {
        if (destination = signup) {
            //close login modal if open
            close_modal("login-modal")
        }
        all_pages.forEach(i => {
            if (i.classList.contains("is-hidden")) {
                return
            } else {
                i.classList.add('is-hidden');
            }
        });
        destination.classList.remove("is-hidden");
    });
}

//Click Logo
navigate(logo, mainpage)

//Click "Let's Go"
navigate(letsgo, searchpage)

//Click "Find Work"
navigate(linkwork, searchpage)

//Click "About Us"
navigate(linkaboutus, aboutus)

//Click "Log In" 
// ---> We still need login page
//navigate(btnlogin, login)

//Click "Sign Up"
navigate(btnsignup, signup)
navigate(linksignup, signup)

//Signup Functionality
signupform.addEventListener('submit', (e) => {
    //prevent auto refresh on the page
    e.preventDefault();

    // grab email and password
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmpassword = document.querySelector("#confirmpassword").value

    if (password == confirmpassword) {
        auth.createUserWithEmailAndPassword(email, password).then(credentials => {
            signup.classList.add("is-hidden");
            mainpage.classList.remove('is-hidden');

            // reset the form
            login_form.reset();
        }).catch(err => {

            // display error message on modal

            const error = document.querySelector('.error');
            error.innerHTML = `<p>${err.message}</p>`;
        })
    } else {
        const error2 = document.querySelector('.error2');
        error2.innerHTML = `<p>Please retry password confirmation.</p>`;

    }

})

// Auth state change functionality
// todo: site visually changes when login state changes
//    - replace login/signup buttons with profile/logout
//    - show either find work or post a job depending on user type
//    - different homepage?
auth.onAuthStateChanged((user) => {
    if (user) { //if signed in
        //alert(`you are logged in as ${user.email}`)
    } else { //if signed out
        //alert('you are logged out')
    }
})

// Login modal visibility
function close_modal(modal_id) {
    //close modal by removing .is_active
    document.querySelector(`#${modal_id}`).classList.remove("is-active")
}

btnlogin.addEventListener('click', () => {
    loginmodal.classList.add('is-active');
});

loginmodalbg.addEventListener('click', () => {
    loginmodal.classList.remove('is-active');
});

//Login Functionality
loginform.addEventListener('submit', (e) => {
    //prevent auto refresh on the page
    e.preventDefault();

    // grab email and password
    const logemail = document.querySelector('#log_email').value;
    const logpass = document.querySelector('#log_password').value;

    auth.signInWithEmailAndPassword(logemail, logpass).then(credentials => {
        close_modal("login-modal")
        alert(`you are logged in as ${credentials.user.email}`)

        // reset the form
        signup_form.reset();
    }).catch(err => {
        // display error message on modal
        login_error.innerHTML = `<p>${err.message}</p>`;
    })

})
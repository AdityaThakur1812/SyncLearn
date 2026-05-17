let themeToggleBtn;

export function initTheme(){
    themeToggleBtn = document.getElementById('themeToggleBtn');
    loadTheme();
    themeToggleBtn.addEventListener('click' , themeToggle);
}

function themeToggle(){
    document.body.classList.toggle("dark-theme");
    updateButtonText();
    saveTheme();
}

function updateButtonText(){
    if(document.body.classList.contains('dark-theme')){
        themeToggleBtn.innerText = "Light Mode";
    }else{
        themeToggleBtn.innerText = "Dark Mode";
    }
}

function saveTheme(){
    const th = document.body.classList.contains('dark-theme');
    localStorage.setItem("theme" , th);
}

function loadTheme(){
    const th = localStorage.getItem("theme");
    if(th){
        document.body.classList.add('dark-theme');
    }
    updateButtonText();
}

//the light theme is written on the top and dark-theme at the bottom because if class named dark-theme is present then the css .dark-theme 
//section will work
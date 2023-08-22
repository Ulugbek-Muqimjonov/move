const new_Movies = movies.slice(0,50);
let  elList = document.querySelector(".hero__list");
const savedList = document.querySelector(".saved__list");

function renderMovies(arr,list,remove) {
    list.innerHTML = "";
    arr.forEach(function(item) {
        let  elItem = document.createElement("li");
        elItem.classList.add("hero__item");
        
        let  elImg = document.createElement("img");
        elImg.setAttribute("src",`https://i3.ytimg.com/vi/${item.ytid}/maxresdefault.jpg`);
        elImg.classList.add("hero__img");
        
        
        let elTitle = document.createElement("strong");
        elTitle.classList.add("hero__film-name");
        elTitle.textContent = item.fulltitle;
        
        // let elDesc = document.createElement("p");
        // elDesc.classList.add("hero__film-description");
        // elDesc.textContent = item.summary;
        
        let elDiv = document.createElement("div");
        elDiv.classList.add("hero__film-links-wraper");
        
        
        let elRating = document.createElement("span");
        elRating.classList.add("hero__film-rating");
        elRating.textContent = `Reyting: ${item.imdb_rating}`;
        
        let elFilmLanguage = document.createElement("span");
        elFilmLanguage.classList.add("hero__film-language");
        elFilmLanguage.textContent = `Language: ${item.language}`;
        
        let elLinkFilm = document.createElement("a");
        elLinkFilm.classList.add("hero__film-link");
        elLinkFilm.setAttribute("href",`https://www.imdb.com/title/${item.imdb_id}/`);
        elLinkFilm.setAttribute("target","blank")
        elLinkFilm.textContent = `watch`;
        
        // bu yerda saqlash tugmasi yartildi
        let elSaved = document.createElement("button");
        elSaved.classList.add("hero__saved-btn");
        elSaved.dataset.id = item.ytid;     
        
        const savedDel = document.createElement("button");
        savedDel.classList.add("saved__delbtn","btn");
        savedDel.textContent = "❌";
        savedDel.dataset.id = item.ytid;
        
        
        const elMoreBtn = document.createElement("button");
        elMoreBtn.classList.add("btn","btn-success");
        elMoreBtn.textContent = "more info";
        elMoreBtn.setAttribute("data-bs-toggle","modal");
        elMoreBtn.setAttribute("data-bs-target","#exampleModal");
        elMoreBtn.dataset.id = item.ytid;
        
        if (remove) {
            // bu yerda kino linki va koproq knopkasi birga qilindi
            elDiv.append(elLinkFilm,elMoreBtn);
            
            // bu yerda saqlash tugmasi reyting qiamiga bola qili quyildi
            elRating.appendChild(elSaved);
            
            
            // bu yerda xamma element listga bola qilindi
            elItem.append(elImg,elTitle,elRating,elFilmLanguage,elDiv);
            list.appendChild(elItem);
        } else {
            elTitle.dataset.id = item.ytid;
            savedDel.classList.add("saved__delbtn--save");
            elTitle.setAttribute("data-bs-toggle","modal");
            elTitle.setAttribute("data-bs-target","#exampleModal")
            elTitle.classList.add("hero__film-name--save");
            elItem.classList.add("hero__item--smth");
            elItem.append(elImg,elTitle,savedDel);
            savedList.appendChild(elItem);
            
        }
    });
    
    
}
renderMovies(new_Movies,elList,true);


let elForm = document.querySelector(".site-header__form");
let  elinpName = elForm.querySelector(".site-header__input--name");
let elinpFrom = elForm.querySelector(".site-header__input--from");
let elinpTo = elForm.querySelector(".site-header__input--to");
let  elBtn = elForm.querySelector(".site-header__btn");
let elrefreshbtn = document.querySelector(".site-header__refreshbtn");


// input

elForm.addEventListener(`keyup`, function(evt) {
    elList.innerHTML = "";
    evt.preventDefault();
    let elinpNameValue = elinpName.value.trim().toLowerCase();
    
    let mySearch = new_Movies.filter(function (item) {
        let title = String(item.fulltitle).toLocaleLowerCase();
        return title.startsWith(elinpNameValue); 
    });
    renderMovies(mySearch)
})

// button 
elBtn.addEventListener("click", function(evt) {
    elList.innerHTML = "";
    evt.preventDefault();
    let elinpFromValue = elinpFrom.value.trim();
    let  elinpToValue  = elinpTo.value.trim();
    
    let mySearch2 = new_Movies.filter(function(item) {
        return item.movie_year >= elinpFromValue &&  elinpToValue >= item.movie_year ;
    })
    
    renderMovies(mySearch2);
    
})

elrefreshbtn.addEventListener("click" , function() {
    renderMovies(new_Movies);
    elinpName.value = "";
    elinpFrom.value = "";
    elinpTo.value = ""; 
})

const modalTitle = document.querySelector(".modal-title");
const modalDesc = document.querySelector(".modal-body");
elList.addEventListener("click", (evt)=> {
    if (evt.target.matches(".btn")) {
        let modal = new_Movies.find(function(item) {
            return item.ytid == evt.target.dataset.id;
        })
        
        modalTitle.textContent = modal.fulltitle;
        modalDesc.textContent = modal.summary;
        
    }
});

// saved listdan chiqish tugmasi
const saveexit = document.querySelector(".saved__exit-btn");
saveexit.addEventListener("click",function() {
    document.body.classList.remove("save-exit");
})

const watchLater = document.querySelector(".hero__later-watchbtn");
watchLater.addEventListener("click", function() {
    document.body.classList.add("save-exit");
})



const saved_Arr = JSON.parse(localStorage.getItem("data") || "[]");
localStorage.setItem("data", JSON.stringify(saved_Arr));
renderMovies(saved_Arr,savedList,false);

elList.addEventListener("click", evt => {   
    if(evt.target.matches(".hero__saved-btn")) {
        const saveitem = new_Movies.find(item => {
            return item.ytid == evt.target.dataset.id;
        })
        
        saved_Arr.push(saveitem);
    }

    localStorage.setItem("data",JSON.stringify(saved_Arr));
    renderMovies(saved_Arr,savedList,false);
})

savedList.addEventListener("click",evt => {
     if (evt.target.matches(".saved__delbtn")) {
        
        const delitemindex = saved_Arr.findIndex(item => {
            return item.ytid == evt.target.dataset.id;
        })

        saved_Arr.splice(delitemindex,1);
        localStorage.setItem("data",JSON.stringify(saved_Arr));
        renderMovies(saved_Arr,savedList,false);
     }
});


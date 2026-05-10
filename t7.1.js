// переменные
let inputSrc = document.getElementById("searchInput")
let buttonSrc = document.getElementById("searchBtn")
let cinemaInf = document.getElementById("inf")
let name = document.getElementById("name")
let yearElement = document.getElementById("year")
let rating = document.getElementById("rating")
let poster = document.getElementById("poster")
let trim = document.getElementById("trim")
let genre = document.getElementById("genre")
let plot = document.getElementById("plot")
let actors = document.getElementById("actors")
let searchResults = document.getElementById("searchResults")
let crews = document.getElementById("crew")
let currentPage = 1
let currentGenreId = null
let genresList = {}
let nameYearOrGenre = document.getElementById("nameYearOrGenre")
let typeEl = document.getElementById("type")
let durationEl = document.getElementById("duration")
let blokLink = document.getElementById("treiler")
let countryEl = document.getElementById("country")
let btnFavorite = document.getElementById("btnFavorite")
let btnWatchLater = document.getElementById("btnWatchLater")
let currentMovieData = null
let tabFavorite = document.getElementById("tabFavorite")
let tabWatchLater = document.getElementById("tabWatchLater")
let originalName = document.getElementById("originalName")

// Кнопки вверх вниз
document.getElementById("scrollUp").addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: "smooth" })
})

document.getElementById("scrollDown").addEventListener('click', function(){
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
})

// проверяем клик был НЕ на бургере и НЕ внутри дропдауна
document.addEventListener('click', function(event) {
    if (!burgerGenres.contains(event.target) && !genreDropdown.contains(event.target)) {
        if (genreDropdown.style.display === "flex") {
            genreDropdown.style.opacity = "0"
            genreDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                genreDropdown.style.display = "none"
            }, 300)
        }
    }
    if (!burgerYears.contains(event.target) && !yearDropdown.contains(event.target)) {
        if (yearDropdown.style.display === "flex") {
            yearDropdown.style.opacity = "0"
            yearDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                yearDropdown.style.display = "none"
            }, 300)
        }
    }
    if (!burgerFilters.contains(event.target) && !filterDropdown.contains(event.target)) {
        if (filterDropdown.style.display === "block") {
            filterDropdown.style.opacity = "0"
            filterDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                filterDropdown.style.display = "none"
            }, 300)
        }
    }
})

// Жанр
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
    .then(response => response.json())
    .then(data => {
        data.genres.forEach(g => {
            genresList[g.id] = g.name
        })

        // жанры внутри бургера
        Object.entries(genresList).forEach(([id, genreName])=> {
            let genreBtn = document.createElement("button")
            genreBtn.textContent = genreName

            genreBtn.addEventListener('click', function(){
                searchResults.innerHTML = ""
                currentPage = 1
                currentGenreId = id
                loadGenreMovies()
                nameYearOrGenre.textContent = genreName
            })

            genreDropdown.appendChild(genreBtn)
        })
    })

// поиск Фильма
buttonSrc.addEventListener('click', function(){
    cinemaInfo()
    nameYearOrGenre.textContent = ""
    if (yearDropdown.style.display === "flex"){
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.display = "none"
        }, 10)
    }
    if (genreDropdown.style.display === "flex") {
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.display = "none"
        }, 10)
    }

})
inputSrc.addEventListener('keydown', function(event){
    if (event.key === "Enter") {
        cinemaInfo()
        nameYearOrGenre.textContent = ""
        if (yearDropdown.style.display === "flex"){
            yearDropdown.style.opacity = "0"
            yearDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                yearDropdown.style.display = "none"
            }, 10)
        }
        if (genreDropdown.style.display === "flex") {
            genreDropdown.style.opacity = "0"
            genreDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                genreDropdown.style.display = "none"
            }, 10)
        }
    }
})

// бургер жанров
let burgerGenres = document.getElementById("burgerGenres")
let genreDropdown = document.getElementById("genreDropdown")

burgerGenres.addEventListener('click', function(){
    if (genreDropdown.style.display === "none") {
        genreDropdown.style.display = "flex"
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.opacity = "1"
            genreDropdown.style.transform = "translateY(0)"
        }, 10)
    } else {
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.display = "none"
        }, 300)
    }
    if (yearDropdown.style.display === "flex"){
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.display = "none"
        }, 10)
    }
})

// бургер годов
let burgerYears = document.getElementById("burgerYears")
let yearDropdown = document.getElementById("yearDropdown")

burgerYears.addEventListener('click', function(){
    if (yearDropdown.style.display === "none") {
        yearDropdown.style.display = "flex"
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.opacity = "1"
            yearDropdown.style.transform = "translateY(0)"
        }, 10)
    } else {
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.display = "none"
        }, 300)
    }

    if (genreDropdown.style.display === "flex") {
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.display = "none"
        }, 10)
    }
})
createYears()

// бургер Фильтра
let burgerFilters = document.getElementById("burgerFilters")
let filterDropdown = document.getElementById("filterDropdown")

burgerFilters.addEventListener('click', function(){
    if (filterDropdown.style.display === "none") {
        filterDropdown.style.display = "block" 
        filterDropdown.style.opacity = "0"
        filterDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            filterDropdown.style.opacity = "1"
            filterDropdown.style.transform = "translateY(0)"
        }, 10)           
    }else{
        filterDropdown.style.opacity = "0"
        filterDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            filterDropdown.style.display = "none"
        }, 300)
    }
})

//кнопки внутри Фильтра
let filterAll = document.getElementById("filterAll")
let filterMovies = document.getElementById("filterMovies")
let filterTV = document.getElementById("filterTV")
//Показать все
filterAll.addEventListener('click', function(){
    document.querySelectorAll("#searchResults .movieCard").forEach(card => {
        card.style.display = "block"
    })
    document.querySelectorAll("#searchResults #loadMoreBtn").forEach(btn => {
        btn.style.display = "block"
    })
})
//Показать только фильмы
filterMovies.addEventListener('click', function(){
    let visible = document.querySelectorAll("#searchResults .movieCard[data-type='movie']")
    
    if (visible.length === 0) {
        trim.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Ничего не найдено</p></em>`   
        return     
    }    
    
    trim.innerHTML = ""
    document.querySelectorAll("#searchResults .movieCard").forEach(card => {
        if (card.dataset.type === "movie" || card.dataset.type === "loadmore") {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    })
})
//Показать только сериалы
filterTV.addEventListener('click', function(){
    let visible = document.querySelectorAll("#searchResults .movieCard[data-type='tv']")
    
    if (visible.length === 0) {
        trim.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Ничего не найдено</p></em>`   
        return     
    }    
    
    trim.innerHTML = ""
    document.querySelectorAll("#searchResults .movieCard").forEach(card => {
        if (card.dataset.type === "tv" || card.dataset.type === "loadmore") {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    })
})

// Вкладка любимые фильмы и сериалы
tabFavorite.addEventListener('click', function(){
    nameYearOrGenre.textContent = "Любимые"
    let favorites = JSON.parse(localStorage.getItem("favorites")) ?? []
    searchResults.innerHTML = ""
    if (favorites.length === 0) {
        searchResults.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Ничего не найдено</p></em>`
        return
    }
    favorites.forEach(movie => {
        let card = document.createElement("div")
        card.classList.add("movieCard")
        card.dataset.type = movie.type
        let img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster}`

        let title = document.createElement("p")
        title.textContent = `${movie.title} (${movie.date})`

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"
        deleteBtn.classList.add("deleteBtn")

        card.appendChild(img)
        card.appendChild(title)
        card.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', function(){
            event.stopPropagation()
            favorites = favorites.filter(m => m.id !== movie.id)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            tabFavorite.click()
        })
        card.addEventListener('click', function(){
            fetch(`https://api.themoviedb.org/3/${movie.type}/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
                .then(response => response.json())
                .then(data => {
                    showDetails(data, movie.type)
                    loadCredits(movie.id, movie.type)
                })
        })
        searchResults.appendChild(card)
    })
}) 
// Вкладка смотреть позже
tabWatchLater.addEventListener('click', function(){
    nameYearOrGenre.textContent = "Смотреть позже"
    let watchLater = JSON.parse(localStorage.getItem("watchLater")) ?? []
    searchResults.innerHTML = ""
    if (watchLater.length === 0) {
        searchResults.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Ничего не найдено</p></em>`
        return
    }    
    watchLater.forEach(movie => {
        let card = document.createElement("div")
        card.classList.add("movieCard")
        card.dataset.type = movie.type

        let img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster}`

        let title = document.createElement("p")
        title.textContent = `${movie.title} (${movie.date})`

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"
        deleteBtn.classList.add("deleteBtn")

        card.appendChild(img)
        card.appendChild(title)
        card.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', function(){
            event.stopPropagation()
            watchLater = watchLater.filter(m => m.id !== movie.id)
            localStorage.setItem("watchLater", JSON.stringify(watchLater))
            tabWatchLater.click()
        })
        card.addEventListener('click', function(){
            fetch(`https://api.themoviedb.org/3/${movie.type}/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
                .then(response => response.json())
                .then(data => {
                    showDetails(data, movie.type)
                    loadCredits(movie.id, movie.type)
                })
        })
        searchResults.appendChild(card)
    })
}) 

// Кнопка любимые фильмы или сериалы
btnFavorite.addEventListener('click', function(){
    let favorites = JSON.parse(localStorage.getItem("favorites")) ?? []
    favorites.push(currentMovieData)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    btnFavorite.textContent = "❤️ Добавлено!"
})
// Кнопка смотреть позже
btnWatchLater.addEventListener('click', function(){
    let watchLater = JSON.parse(localStorage.getItem("watchLater")) ?? []
    watchLater.push(currentMovieData)
    localStorage.setItem("watchLater", JSON.stringify(watchLater))
    btnWatchLater.textContent = "🕐 Добавлено!"
})

// Функции--------------------------------------------------------------------------------------------------------------------------------------

//загрузка деталей фильма
function showDetails(movie, type) {
    cinemaInf.scrollIntoView({ behavior: "smooth"})
    
    let title = type === "tv" ? movie.name : movie.title
    let date = type === "tv" ? movie.first_air_date : movie.release_date
    let originalTitle = type === "tv" ? movie.original_name : movie.original_title
    let safeDate = date ?? "неизвестно"
    let displayDate = safeDate !== "неизвестно" ? safeDate.slice(0, 4) : "неизвестно"

    let movieData = {
        id: movie.id,
        title: title,
        date: displayDate,
        type: type,
        poster: movie.poster_path
    }
    currentMovieData = movieData
   
    btnFavorite.textContent = "❤️Любимые"
    btnWatchLater.textContent = "🕐Смотреть позже"
    btnFavorite.style.display = "block"
    btnWatchLater.style.display = "block"
    name.textContent = title
    originalName.textContent = originalTitle
    yearElement.innerHTML = `<strong>Год выхода:</strong> ${displayDate}`
    let average = movie.vote_average.toFixed(1)
    rating.innerHTML = `<strong>Рэйтинг:</strong> ${average}/10`
    plot.textContent = movie.overview
    poster.innerHTML = movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">` : `<img src="nofoto.webp">`
    let genreNames = movie.genre_ids 
    ? movie.genre_ids.map(id => genresList[id]).filter(g => g).join(", ")
    : movie.genres.map(g => g.name).join(", ")
    genre.innerHTML = `<strong>Жанр: </strong> ${genreNames}`

    if (type === "tv") {
        fetch(`https://api.themoviedb.org/3/tv/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
            .then(response => response.json())
            .then(data => {
                typeEl.innerHTML = `<i style="color: rgb(193, 193, 193);">Ceриал</i>`
                durationEl.textContent = `${data.number_of_seasons} ${declension(data.number_of_seasons, "сезон", "сезона", "сезонов")} ${data.number_of_episodes} серий`
            
                let countries = data.production_countries.map(c => c.name).join(", ")
                countryEl.innerHTML = `<strong>Страна: </strong> ${countries}`               
            })

        fetch(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
            .then(response => response.json())
            .then(data => {
                blokLink.innerHTML = ""
                data.results.forEach(video => {
                    let link = document.createElement("a")
                    link.textContent = "Трейлер "
                    link.href = `https://www.youtube.com/watch?v=${video.key}`
                    link.target = "_blank"
                    blokLink.appendChild(link) 
                })
            })            
    } else {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
            .then(response => response.json())
            .then(data => {
                let hours = Math.floor(data.runtime / 60)
                let minutes = data.runtime % 60

                typeEl.innerHTML = `<i style="color: rgb(193, 193, 193);">Фильм</i>`
                durationEl.textContent = `${hours} ${declension(hours, "час", "часа", "часов")} ${minutes} ${declension(minutes, "минута", "минуты", "минут")}`

                let countries = data.production_countries.map(c => c.name).join(", ")
                countryEl.innerHTML = `<strong>Страна: </strong> ${countries}`
            })

        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
            .then(response => response.json())
            .then(data => {
                blokLink.innerHTML = ""
                data.results.forEach(video => {
                    let link = document.createElement("a")
                    link.textContent = "Трейлер "
                    link.href = `https://www.youtube.com/watch?v=${video.key}`
                    link.target = "_blank"
                    blokLink.appendChild(link) 
                })
            })
    }


}

// Показ фильмов 
function createCard(movie, type) {
    let title = type === "tv" ? movie.name : movie.title
    let date = type === "tv" ? movie.first_air_date : movie.release_date

    let safeDate = date ? date.slice(0, 4) : "?"

    let card = document.createElement("div")
    card.classList.add("movieCard")

    card.dataset.type = type

    let img = document.createElement("img")
    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "nofoto.webp"

    let titleEl = document.createElement("p")
    titleEl.textContent = `${title} (${safeDate})`

    card.appendChild(img)
    card.appendChild(titleEl)

    card.addEventListener('click', function(){
        showDetails(movie, type)
        loadCredits(movie.id, type)
    })

    return card
}

// правильные формы слов
function declension(number, one, two, five) {
    // one  = "час"
    // two  = "часа"  
    // five = "часов"
    
    let n = Math.abs(number) % 100
    let n1 = n % 10
    
    if (n > 10 && n < 20) return five    // 11-19 → "часов"
    if (n1 === 1) return one             // 1 → "час"
    if (n1 >= 2 && n1 <= 4) return two  // 2,3,4 → "часа"
    return five                          // 5+ → "часов"
}

//загрузка актеров 
function loadCredits(id, type) {
    let endpoint = type === "tv" ? `https://api.themoviedb.org/3/tv/${id}/credits?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru` : `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`

    fetch(endpoint)
        .then(response => response.json())
        .then(credits => {
                                
            let actorsNames = credits.cast.map(actor => actor.name).slice(0, 5).join(", ")
            actors.innerHTML = `<strong>В ролях:</strong> ${actorsNames}`
            console.log(credits.crew)
        })
}

//информация фильма после поиска
function cinemaInfo() {
    let inputText = inputSrc.value

    nameYearOrGenre.textContent = ""
    if (inputSrc.value.trim() === "") {
        trim.textContent = "Впишите текст"
        setTimeout(() => trim.textContent = "", 2000)
    } else {
        trim.textContent = ""
        searchResults.innerHTML = ""
        // фильмы
        fetch(`https://api.themoviedb.org/3/search/movie?query=${inputText}&api_key=8210631f276e7f9626a0176b1e2c786b&language=ru`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(movie => {
                    let card = createCard(movie, "movie")
                    searchResults.appendChild(card)
                })
            })
            // сериалы
            fetch(`https://api.themoviedb.org/3/search/tv?query=${inputText}&api_key=8210631f276e7f9626a0176b1e2c786b&language=ru&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(movie => {
                    let card = createCard(movie, "tv")
                    searchResults.appendChild(card)
                })
            })
    }
    inputSrc.value = ""
}

//появление всех годов после нажатие на бургер года
function createYears() {
    for (let year = 1990; year <= 2026; year++) {
        let yearBtn = document.createElement("button")
        yearBtn.textContent = year
        yearDropdown.appendChild(yearBtn)
        yearBtn.addEventListener('click', function(){
            searchResults.innerHTML = ""
            currentPage = 1
            loadMoviesByYear(year)
            nameYearOrGenre.textContent = year
        })
    }
}

//загрузка фильма по году
function loadMoviesByYear(year) {
    //фильмы
    fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&api_key=8210631f276e7f9626a0176b1e2c786b&language=ru&page=${currentPage}`)
    .then (response => response.json())
    .then (data => {
          data.results.forEach(movie => {
                    let card = createCard(movie, "movie")
                    searchResults.appendChild(card)
                })
    })
    // сериалы
    fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date_year=${year}&api_key=8210631f276e7f9626a0176b1e2c786b&language=ru&page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(movie => {
            let card = createCard(movie, "tv")
            searchResults.appendChild(card)
        })
        setTimeout(() => {
        let loadMoreBtn = document.createElement("button")
        loadMoreBtn.id = "loadMoreBtn"
        loadMoreBtn.dataset.type = "loadmore"
        loadMoreBtn.textContent = "Загрузить ещё"
        loadMoreBtn.addEventListener('click', function(){
            currentPage++
            loadMoviesByYear(year)
        })
        let oldBtn = document.getElementById("loadMoreBtn")
        if (oldBtn) oldBtn.remove()
        searchResults.appendChild(loadMoreBtn)}, 100)        
    })
} 

//загрузка фильмов по жанру
function loadGenreMovies() {
    // фильмы
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenreId}&api_key=8210631f276e7f9626a0176b1e2c786b&language=ru&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                let card = createCard(movie, "movie")
                searchResults.appendChild(card)
            })
        })
    //сериалы
    fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${currentGenreId}&api_key=8210631f276e7f9626a0176b1e2c786b&language=ru&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                let card = createCard(movie, "tv")
                searchResults.appendChild(card)
            })
            setTimeout(() => {
                let loadMoreBtn = document.createElement("button")
                loadMoreBtn.id = "loadMoreBtn"
                loadMoreBtn.dataset.type = "loadmore"
                loadMoreBtn.textContent = "Загрузить ещё"
                loadMoreBtn.addEventListener('click', function(){
                    currentPage++
                    loadGenreMovies()
                })
                let oldBtn = document.getElementById("loadMoreBtn")
                if (oldBtn) oldBtn.remove()
                    searchResults.appendChild(loadMoreBtn)}, 100)
        })
}
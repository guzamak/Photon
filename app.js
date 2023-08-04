const auth = "KNZBLyi46ZesVZJokjYNdbJsoXtkumf5kJ5PwoOLljor0B7zMq3K2gY9"
const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input") // ข้อความ
const searchBth = document.querySelector(".submit-bth")
const searchform = document.querySelector(".search-form")
let searchvalue ; // api
const more = document.querySelector(".more")
let page = 1 //สร้างไว้ เก็บหน้า ล่าสุด

const curetedPhoto = async() => {
    const fetchdata = await fetch("https://api.pexels.com/v1/curated?page=1&per_page=15",{
        method: "GET",
        headers:{
            Accept:"application/json",
            Authorization: auth,
        }
        //body
    })
    const data = await fetchdata.json()
    createPhoto(data)
}

const searchPhotos = async(query) => {
    
    const fetchdata = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`,{
        method: "GET",
        headers:{
            Accept:"application/json",
            Authorization: auth,
        }
        //body
    })

    const data = await fetchdata.json()
    clearimg()
    createPhoto(data)

}
const morepic = async() =>{
    const fetchdata = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=15`,{
        method: "GET",
        headers:{
            Accept:"application/json",
            Authorization: auth,
        }
        //body
    })
    const data = await fetchdata.json()
    createPhoto(data)
}



const createPhoto = (data) =>{
    page++ //สร้างหน้าใหม่ +1
    data.photos.forEach((photo) => {
        const photodiv = document.createElement("div")
        photodiv.classList.add("gallery-image")

        const photoname = document.createElement("p")
        photoname.classList.add("test")
        photoname.innerText = photo.photographer

        const photoimg = document.createElement("img")
        photoimg.classList.add("test")
        photoimg.src = photo.src.original

        const link = document.createElement("a")
        link.href = photo.src.original
        link.innerText = "Download"


        photodiv.appendChild(photoname)
        photodiv.appendChild(photoimg)
        photodiv.appendChild(link)  
        gallery.appendChild(photodiv)

    })
}
const clearimg = () => {
    gallery.innerHTML = ""
    searchInput.value = ""
    page = 1
}

curetedPhoto()


searchInput.addEventListener("input", (e) => {
    searchvalue = e.target.value
})    

searchform.addEventListener("submit", (e) => {
    e.preventDefault()
    searchPhotos(searchvalue)
})
more.addEventListener("click",()=>{
    morepic()
})
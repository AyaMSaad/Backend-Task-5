
let form = document.getElementById('form1')
let address1=document.getElementById("address")
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(address1.value)
    weatherFunction()
    form.reset()
})

const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const longitude=document.getElementById("longitude")
const latitude=document.getElementById("latitude")

let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/aya?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText=""
            forecastF.innerText=""
            latitude.innerText=""
            longitude.innerText=""
        }
        else {
            setTimeout(()=>{
                locationF.innerText= data.location
                }, 500)
                setTimeout(()=>{
                forecastF.innerText=data.forecast            }, 1000)
                setTimeout(()=>{
                latitude.innerText=data.latitude           }, 1500)
                setTimeout(()=>{
                longitude.innerText=data.longitude         },2000)
                errorF.innerText=""
            }
        }
    catch(e){
        console.log(e)
    }
}
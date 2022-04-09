//get qoutes from api
const add = document.querySelector('.add')
const quoteText = document.getElementById('quote')
const author = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const loader = document.getElementById('loader')
let quoteContainer = document.getElementById('quote-container')

let data;

function loading(){
  loader.hidden = false
  quoteContainer.hidden = true
}

function complete(){
  loader.hidden= true
  quoteContainer.hidden = false
}

async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  const response = await fetch(apiUrl)
  data = await response.json()
  complete()
  //console.log(randomQuote)

}


function newQuote(){
  loading()
  const randomNumber = Math.floor(Math.random() * 1643) + 1
  const randomQuote = data[randomNumber]

  if(!randomQuote.author){
    author.textContent = 'Unknown'
  }else{
    author.textContent = randomQuote.author
  }

  if(quoteText.length>50){
    quoteText.classList.add('long-quote')
  }else{
    quoteText.classList.remove('long-quote')
  }
  quoteText.textContent = randomQuote.text
  

  console.log(randomQuote)
  complete()
  
}


add.addEventListener('click', newQuote)

// tweet quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`

  window.open(twitterUrl, '_blank')
}

//event listener
twitterBtn.addEventListener('click',tweetQuote)

getQuotes()

document.getElementsByClassName('btn-checkout')[0].addEventListener('click', checkoutClicked)
console.log(stripePublicKey)
var stripeHandler = StripeCheckout.configure({
    key : stripePublicKey,
    locale : 'fr', 
    token : function(token){
        console.log(token)
        var items = []
        /*var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        for (var i = 0; i<cartRows.length; i++){
            var cartRow = cartRows[i]
            var quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
            var quantity = quantityElement.value
            var id = cartRow.id
            items.push({
                id : id,
                quantity: quantity
            })
        }*/
        items.push({
            id : 956,
            quantity: 99
        })
        fetch('/purchase', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                stripeTokenId : token.id, 
                items : items
            })
        }).then(function(res){
            return res.json()
        }).then(function(data){
            alert(data.message)
        }).catch(function(error){
            console.error(error)
        })
    }
})

/*var priceElement = document.getElementsByClassName('cart-total-price')[0]
var price = parseFloat(priceElement.innerText.replace('€', '')) *100*/
var price = 1200
function checkoutClicked(){
    stripeHandler.open({
        amount : price
    })
}
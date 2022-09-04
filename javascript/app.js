const loadProducts = (produtos, IdDivParent ) => {
    const parentDiv = document.querySelector(IdDivParent)
    produtos.forEach(produto => {

        const html = `
        <article class="prato">
                    <img src="${produto.image}" alt="${produto.title}">
                    <h4>${produto.title}</h4>
                    <h4>${produto.value}</h4>
                    <p>${produto.description}</p>
                    <button type="button" onclick='modalTrigger(${produto.id})'>Quero este Prato</button>
                </article>
        `
         
        parentDiv.insertAdjacentHTML('beforeend', html)
    })
}

const modalTrigger = (productId) => {
    const modal = document.querySelector('.modal')

    if (productId != null) {
        const produto = produtos.filter( produto => produto.id == productId)[0]

        if (produto != null) {
            modal.querySelector('#title').value = produto.title
        }
    }

    modal.classList.contains('hide') == true ? modal.classList.remove('hide') :  modal.classList.add('hide')
}

const whatsappLinkGenerator = (phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment) => `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá eu quero: ${productQuantity} ${productTitle} - Entregar para ${buyerName} no endereço: 
${buyerAddress} - A forma de pagamento será: ${buyerPayment}`

const checKout = phoneNumber => {
    const form = document.querySelector('#form-product')

    form.addEventListener('submit', e => {
        e.preventDefault()

        const productTitle = form.querySelector('input#title').value
        const productQuantity = form.querySelector('input#quantity').value
        const buyerName = form.querySelector('input#name').value
        const productAddress = form.querySelector('input#address').value
        const productPayment = form.querySelector('select#payment').value
        const whatsappUrl = whatsappLinkGenerator(phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment)
        
        window.location.href = whatsappUrl
    })    
}

const search = (products, searchTerm) => products.filter( product => product.title.includes(`${searchTerm}`) || 
product.description.includes(`${searchTerm}`) )

const LoadSearch = (form, productsDivId) => {
    const productsDiv = document.querySelector(productsDivId)
    const inputSearch = form.querySelector('#inputSearch')

   
    form.addEventListener9('submit',(e) => {
        e.preventDefault()
        if (inputSearch.value != '') {
          productsDiv.querySelectorAll('.prato').forEach(prato => {
            prato.remove()
          })

          const results = search(produtos, inputSearch.value)

          results.forEach( produto => {

            const html = `
            <article class="prato">
                        <img src="${produto.image}" alt="${produto.title}">
                        <h4>${produto.title}</h4>
                        <h4>${produto.value}</h4>
                        <p>${produto.description}</p>
                        <button type="button" onclick="modalTrigger(${produto.id})">Quero este Prato</button>
                    </article>
            `
             
            parentDiv.insertAdjacentHTML('beforeend', html)

          })
        }
    })   
}

loadProducts(produtos,'#product-div')
checKout('5511983501061')
LoadSearch(document.querySelector('#formSearch'), '#product-div')


function getSearch() {  

    const keyword = document.querySelector('#search').value;
    console.log(keyword);
    validLinkParam = keyword.replace(/ /g, '%20');    
    console.log(BASE + 'api/search/' + validLinkParam);

    fetch(BASE + 'api/search/' + validLinkParam, { credentials: 'include' })
        .then(result => result.json())
        .then(data => {           
            displaySearch(data.products);
        });
}

function clearSearch() {
    fetch(BASE + 'api/filter/clear', { credentials: 'include' })
        .then(result => result.json())
        .then(data => {
            if (data.error === 0) {
                getSearch();
            }
        });
}

function displaySearch(products) {
    console.log(products); 

    const productsDiv = document.querySelector('#search-results');
    productsDiv.innerHTML = '';

    if (products.length === 0) {
        const insideDiv = document.createElement('div');
        insideDiv.classList.add("text-center", "col-lg-8", "offset-lg-2");
        insideDiv.style.color = "#f00";
        insideDiv.style.fontSize = "18px";
        insideDiv.style.padding = "40px 0px 0px 0px";        
        insideDiv.innerHTML = "Nisu pronadjeni proizvodi koji ogovaraju datim ključnim rečima.";
        productsDiv.appendChild(insideDiv);
        return;
    }

    for (product of products) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('col-lg-12');

        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');

        const innerRow = document.createElement('div');
        innerRow.classList.add('row');

        const divColLg2 = document.createElement('div');
        divColLg2.classList.add("col-lg-2", "offset-lg-2", "product-search-holder");

        const imgProduct = document.createElement('img');
        imgProduct.classList.add("img-product-search");
        imgProduct.src = BASE + "assets/img/product/" + product.img_path;
        imgProduct.alt = "Proizvod - " + product.name;        

        const divColLg6 = document.createElement('div');
        divColLg6.classList.add("col-lg-6", "product-search-holder");

        const productName = document.createElement('a');
        productName.href = BASE + "product/" + product.product_id;
        
        productName.innerHTML = product.name;

        const productDescription= document.createElement('p');
        productDescription.innerHTML = product.description;

        divColLg2.appendChild(imgProduct);

        divColLg6.appendChild(productName);
        divColLg6.appendChild(productDescription);

        innerRow.appendChild(divColLg2);
        innerRow.appendChild(divColLg6);

        containerDiv.appendChild(innerRow);

        rowDiv.appendChild(containerDiv);
        productsDiv.appendChild(rowDiv);
    }        
}
function getInfo() {

    var myRequest = new XMLHttpRequest();

    myRequest.onload = function () {

        const myObjects = JSON.parse(this.responseText);
        //todo: expect errors


        //populate navbar

        var navbar = document.getElementById("navbar-elems");
        var nodeli = document.createElement("li"); //create <li> element inside navbar

        for (var key in myObjects) {                //navigate through json elements to find the nav
            if (myObjects[key].element == "nav") {

                for (var element in myObjects[key].content) {     //display the nav elements

                    nodeli = document.createElement("li");
                    textli = document.createTextNode(myObjects[key].content[element]);   //grab the element in a string var

                    nodeli.appendChild(textli);
                    navbar.appendChild(nodeli);
                }

            }

        }

        //populate main product data

        var mainImgParent = document.getElementById("product-image");
        var mainTitle = document.getElementById("product-title");
        var mainPrice = document.getElementById("product-price");
        var sizeForm = document.getElementById("size-form");
        var colorForm = document.getElementById("color-form");
        var mainDesc = document.getElementById("product-desc");
        var upsellProducts = document.getElementById("upsell-products");
        var mainImg = mainImgParent.appendChild(document.createElement("img"));  //creating img element in parent

        //retrieving data for this product, assuming the product name is already provided

        for (var key in myObjects) {
            if (myObjects[key].element == "product" && myObjects[key].name == "kenzo-red-shirt") {

                mainImg.src = "../assets/" + myObjects[key].properties.image;

                titleText = document.createTextNode(myObjects[key].properties.title);    //creating title
                mainTitle.appendChild(titleText);

                mainPrice.innerHTML = myObjects[key].properties.price + " AED";  //creating price

                for (var sizeIndex in myObjects[key].sizes) {   //creating size radio form

                    var radioElement = document.createElement("input");
                    radioElement.setAttribute("type", "radio");
                    radioElement.setAttribute("id", myObjects[key].sizes[sizeIndex]);
                    radioElement.setAttribute("value", myObjects[key].sizes[sizeIndex]);
                    radioElement.name = "sizes";

                    if (sizeIndex == 0) {
                        radioElement.checked = true;
                    }

                    sizeForm.appendChild(radioElement);

                    var radioLabel = document.createElement("label");
                    var radioLabelText = document.createTextNode((myObjects[key].sizes[sizeIndex]).toUpperCase());
                    radioLabel.htmlFor = myObjects[key].sizes[sizeIndex];

                    radioLabel.appendChild(radioLabelText);
                    sizeForm.appendChild(radioLabel);
                }

                for (var colorIndex in myObjects[key].variants) {   //creating colors radio form

                    //  console.log(myObjects[key].variants[colorIndex]);

                    //   console.log(colorIndex);

                    var colorLabel = document.createElement("label");
                    var colorElement = document.createElement("input");
                    var colorImg = document.createElement("img");

                    colorElement.setAttribute("type", "radio");
                    colorElement.setAttribute("id", colorIndex);
                    colorElement.name = "colors";
                    colorImg.src = "../assets/" + myObjects[key].variants[colorIndex];

                    colorForm.appendChild(colorLabel);
                    colorLabel.appendChild(colorElement);
                    colorLabel.appendChild(colorImg);

                }

                //console.log(myObjects[key].properties.longDesc);


                var descElement = document.createElement("p");
                descElement.appendChild(document.createTextNode(myObjects[key].properties.longDesc));
                mainDesc.appendChild(descElement);

                descElement = document.createElement("br");
                mainDesc.appendChild(descElement);

                descElement = document.createElement("p");
                descElement.appendChild(document.createTextNode(myObjects[key].properties.type1));
                mainDesc.appendChild(descElement);

                descElement = document.createElement("p");
                descElement.appendChild(document.createTextNode(myObjects[key].properties.type2));
                mainDesc.appendChild(descElement);

                descElement = document.createElement("p");
                descElement.appendChild(document.createTextNode(myObjects[key].properties.shortDesc));
                mainDesc.appendChild(descElement);


            }

            for (var upsellIndex in myObjects[key].upsells) {   //populating "see more products"

                var upsellElement = document.createElement("div");
                var upsellImg = document.createElement("img");
                var upsellBtn = document.createElement("button");

                upsellBtn.appendChild(document.createTextNode("Shop Now"));
                upsellElement.className = "upsell-container";
                upsellImg.src = "../assets/" + myObjects[key].upsells[upsellIndex];

                upsellElement.appendChild(upsellImg);
                upsellElement.appendChild(upsellBtn);

                upsellProducts.appendChild(upsellElement);

            }

            //function to display and hide "see more products" section

            $(".upsell-products").hide(1000);

            /* $(".upsell-section h2").mouseenter(function () {
                $(".upsell-products").show(1500);
            }); */

            $("#more-products-title").click(function (event) {
                
                event.stopImmediatePropagation(); //stop click from triggering twice

                if (this.className == "expand") {
                    $(".upsell-products").show(1500);
                    this.className = "collapse";
                    $('#more-products-title').html('- See less products')

                }

                else if(this.className == "collapse"){
                    $(".upsell-products").hide(1500);
                    $('#more-products-title').html('+ See more products')
                    this.className = "expand";
                }
            });

            /* $(".upsell-section").mouseleave(function () {
                $(".upsell-products").hide(1500);
            });  */

            $(".upsell-container").click(function () {
                $(this).children("button").css("visibility", "visible");   //show this element's buttons

            });

            $(".upsell-container").mouseleave(function () {
                $(".upsell-container button").css("visibility", "hidden");

            });
        }

    };

    myRequest.open('GET', 'http://127.0.0.1:3000/', true);
    myRequest.send();

}
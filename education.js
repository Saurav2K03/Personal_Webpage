const preloadImages = [
    "assets/images/ryan_color.png",
    "assets/images/dtu_color.png",
    "assets/images/others_color.png",
    "assets/images/extra1_color.png",
    "assets/images/extra2_color.png",
    "assets/images/extra3_color.png"
];
preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

const elements = document.getElementsByClassName("elements");

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const circle = element.querySelector(".circle");
    const id = circle.id;
    const img = circle.querySelector("img");

    element.addEventListener("mouseenter", () => {
        if (id === "circle1") {
            img.src = "assets/images/ryan_color.png";
            document.getElementById("ryan-heading").style.color = "#29166e";
        } else if (id === "circle2") {
            img.src = "assets/images/dtu_color.png";
            document.getElementById("dtu-heading").style.color = "#781e19";
        }   
        else if (id === "circle3") {
            img.src = "assets/images/others_color.png";
            document.getElementById("others-heading").style.color = "#aa8d3a";
        }
        else if (id === "circle4") {
            img.src = "assets/images/extra1_color.png";
            document.getElementById("extra1-heading").style.color = "#2c8ecc";
        }
        else if (id === "circle5") {
            img.src = "assets/images/extra2_color.png";
            document.getElementById("extra2-heading").style.color = "#81b64c";
        }
        else if (id === "circle6") {
            img.src = "assets/images/extra3_color.png";
            document.getElementById("extra3-heading").style.color = "#ff4b03";
        }
    });

    element.addEventListener("mouseleave", () => {
        if (id === "circle1") {
            img.src = "assets/images/ryan_logo.png";
            document.getElementById("ryan-heading").style.color = "black";
        } else if (id === "circle2") {
            img.src = "assets/images/dtu_logo.png";
            document.getElementById("dtu-heading").style.color = "black";
        }
        else if (id === "circle3") {
            img.src = "assets/images/others_logo.png";
            document.getElementById("others-heading").style.color = "black";
        }
        else if (id === "circle4") {
            img.src = "assets/images/extra1_logo.png";
            document.getElementById("extra1-heading").style.color = "black";
        }
        else if (id === "circle5") {
            img.src = "assets/images/extra2_logo.png";
            document.getElementById("extra2-heading").style.color = "black";
        }
        else if (id === "circle6") {
            img.src = "assets/images/extra3_logo.png";
            document.getElementById("extra3-heading").style.color = "black";
        }   
    });
}


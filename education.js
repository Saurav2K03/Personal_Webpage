const elements = document.getElementsByClassName("elements");

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const id = element.id;

    element.addEventListener("mouseenter", () => {
        if (id === "element1") {
            document.getElementById("ryan-heading").style.color = "#29166e";
        } else if (id === "element2") {
            document.getElementById("dtu-heading").style.color = "#781e19";
        }   
        else if (id === "element3") {
            document.getElementById("others-heading").style.color = "#aa8d3a";
        }
        else if (id === "element4") {
            document.getElementById("extra1-heading").style.color = "#2c8ecc";
        }
        else if (id === "element5") {
            document.getElementById("extra2-heading").style.color = "#81b64c";
        }
        else if (id === "element6") {
            document.getElementById("extra3-heading").style.color = "#ff4b03";
        }
    });

    element.addEventListener("mouseleave", () => {
        if (id === "element1") {
            document.getElementById("ryan-heading").style.color = "black";
        } else if (id === "element2") {
            document.getElementById("dtu-heading").style.color = "black";
        }
        else if (id === "element3") {
            document.getElementById("others-heading").style.color = "black";
        }
        else if (id === "element4") {
            document.getElementById("extra1-heading").style.color = "black";
        }
        else if (id === "element5") {
            document.getElementById("extra2-heading").style.color = "black";
        }
        else if (id === "element6") {
            document.getElementById("extra3-heading").style.color = "black";
        }   
    });
}


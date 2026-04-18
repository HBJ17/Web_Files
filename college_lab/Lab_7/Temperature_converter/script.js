function getInput() {
        let value = document.getElementById("temp").value;

        // Validation
        if (value === "" || isNaN(value)) {
            document.getElementById("result").innerHTML =
                "<h3>Please enter a valid number!</h3>";
            return null;
        }

        return parseFloat(value);
    }

    function fToOthers() {
        let f = getInput();
        if (f === null) return;

        let c = (f - 32) * 5 / 9;
        let k = c + 273.15;

        document.getElementById("result").innerHTML =
            `<h3>${f} °F = ${c.toFixed(2)} °C and ${k.toFixed(2)} K</h3>`;
    }

    function cToOthers() {
        let c = getInput();
        if (c === null) return;

        let f = (c * 9 / 5) + 32;
        let k = c + 273.15;

        document.getElementById("result").innerHTML =
            `<h3>${c} °C = ${f.toFixed(2)} °F and ${k.toFixed(2)} K</h3>`;
    }

    function kToOthers() {
        let k = getInput();
        if (k === null) return;

        // Kelvin cannot be negative
        if (k < 0) {
            document.getElementById("result").innerHTML =
                "<h3>Kelvin cannot be negative!</h3>";
            return;
        }

        let c = k - 273.15;
        let f = (c * 9 / 5) + 32;

        document.getElementById("result").innerHTML =
            `<h3>${k} K = ${c.toFixed(2)} °C and ${f.toFixed(2)} °F</h3>`;
    }

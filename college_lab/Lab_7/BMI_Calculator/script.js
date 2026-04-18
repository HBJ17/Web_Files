function getInputs() {
    let age = parseInt(document.getElementById("age").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let activity = document.getElementById("activity").value;
    let smoking = document.getElementById("smoking").value;
    let alcohol = document.getElementById("alcohol").value;

    return { age, weight, height, activity, smoking, alcohol };
}

// ✅ Validation
function validateInputs(data) {
    if (
        isNaN(data.age) || data.age <= 0 ||
        isNaN(data.weight) || data.weight <= 0 ||
        isNaN(data.height) || data.height <= 0 ||
        data.activity === "" ||
        data.smoking === "" ||
        data.alcohol === ""
    ) {
        return false;
    }
    return true;
}

// ✅ BMI
function calculateBMI(weight, heightCm) {
    let heightM = heightCm / 100;
    return weight / (heightM * heightM);
}

// ✅ BMI Category
function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 25) return "Normal";
    else if (bmi < 30) return "Overweight";
    else return "Obese";
}

// ✅ Risk Score
function calculateRisk(data, bmiCategory) {
    let score = 0;

    if (data.age > 50) score += 2;
    if (bmiCategory === "Overweight") score += 2;
    if (bmiCategory === "Obese") score += 3;

    if (data.activity === "low") score += 2;
    if (data.activity === "high") score -= 1;

    if (data.smoking === "yes") score += 2;
    if (data.alcohol === "yes") score += 1;

    return score;
}

// ✅ Risk Level
function getRiskLevel(score) {
    if (score <= 2) return "Low Risk";
    else if (score <= 5) return "Moderate Risk";
    else return "High Risk";
}

// ✅ Tips
function getTips(bmiCategory, data) {
    let tips = [];

    if (bmiCategory === "Underweight") tips.push("Eat more nutritious food.");
    if (bmiCategory === "Overweight") tips.push("Exercise regularly.");
    if (bmiCategory === "Obese") tips.push("Consult a doctor.");

    if (data.smoking === "yes") tips.push("Quit smoking.");
    if (data.alcohol === "yes") tips.push("Reduce alcohol intake.");

    if (data.activity === "low") tips.push("Increase physical activity.");

    return tips.join("<br>");
}

// ✅ Main Function
function calculateHealth() {
    let data = getInputs();

    if (!validateInputs(data)) {
        document.getElementById("result").innerHTML =
            "<h3 style='color:red'>Invalid Input!</h3>";
        return;
    }

    let bmi = calculateBMI(data.weight, data.height);
    let category = getBMICategory(bmi);
    let score = calculateRisk(data, category);
    let risk = getRiskLevel(score);
    let tips = getTips(category, data);

    // 🎨 Color badge
    let color = "green";
    if (risk === "Moderate Risk") color = "orange";
    if (risk === "High Risk") color = "red";

    // 📊 Progress %
    let percent = Math.min(score * 15, 100);

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressBar").innerText = percent + "%";
    document.getElementById("progressBar").className = "progress-bar bg-" + (color === "green" ? "success" : color === "orange" ? "warning" : "danger");

    document.getElementById("result").innerHTML = `
        <h3>BMI: ${bmi.toFixed(2)}</h3>
        <h4>${category}</h4>
        <span class="badge bg-${color === "green" ? "success" : color === "orange" ? "warning" : "danger"}">${risk}</span>
        <p><strong>Tips:</strong><br>${tips}</p>
    `;
}

// ✅ Reset
function resetForm() {
    document.getElementById("age").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("activity").value = "";
    document.getElementById("smoking").value = "";
    document.getElementById("alcohol").value = "";

    document.getElementById("result").innerHTML =
        "<h3>Results will appear here...</h3>";

    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("progressBar").innerText = "0%";
}
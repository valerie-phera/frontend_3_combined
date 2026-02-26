export function getInterpretation(phLevel) {
    if (phLevel === "Slightly Low") {
        return "A lower pH can happen for many reasons, including hormonal changes or certain products. On its own, a slightly low pH is usually not harmful, especially if you feel well and have no symptoms.";
    }
    if (phLevel === "Normal") {
        return "This result suggests that your vaginal environment is in its usual balance. Your pH can still shift slightly with your cycle, sex, or products you use, but nothing in this reading looks concerning on its own.";
    }
    if (phLevel === "Slightly Elevated") {
        return "A slightly higher pH is often linked to recent factors such as your period, sex, new products, or mild irritation. On its own, this doesn’t always mean an infection, but it can make it easier for certain bacteria to grow.";
    }
    return "A higher vaginal pH can be associated with bacterial vaginosis and other infections, especially if you notice symptoms like odor, itching, or changes in discharge. This test is not a diagnosis, but it’s a signal worth paying attention to, especially if you have symptoms.";
}
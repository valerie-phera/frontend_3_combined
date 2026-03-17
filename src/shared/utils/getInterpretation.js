// export function getInterpretation(phLevel) {
//     if (phLevel === "Slightly Low") {
//         return "A lower pH can happen for many reasons, including hormonal changes or certain products. On its own, a slightly low pH is usually not harmful, especially if you feel well and have no symptoms.";
//     }
//     if (phLevel === "Normal") {
//         return "This result suggests that your vaginal environment is in its usual balance. Your pH can still shift slightly with your cycle, sex, or products you use, but nothing in this reading looks concerning on its own.";
//     }
//     if (phLevel === "Slightly Elevated") {
//         return "A slightly higher pH is often linked to recent factors such as your period, sex, new products, or mild irritation. On its own, this doesn’t always mean an infection, but it can make it easier for certain bacteria to grow.";
//     }
//     return "A higher vaginal pH can be associated with bacterial vaginosis and other infections, especially if you notice symptoms like odor, itching, or changes in discharge. This test is not a diagnosis, but it’s a signal worth paying attention to, especially if you have symptoms.";
// }

export function getInterpretation(phLevel) {
    if (phLevel === "Normal") {
        return "A vaginal pH of x is within the expected range. Personalized your result and track changes over time.";
    }
    if (phLevel === "Slightly Elevated") {
        return "A vaginal pH of x is slightly elevated and may indicate changes in the vaginal microbiome, especially if you also have symptoms. We recommend adding more details to personalize your result and sharing your results with a doctor.";
    }
    return "A vaginal pH of x is elevated and not considered within the usual range. We recommend adding more details to personalize your result and speaking to a doctor for further assessment.";
}
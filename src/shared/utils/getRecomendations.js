export const recommendationsByLevel = {
    "Slightly Low": [
        "If you feel well and have no symptoms, you can simply monitor and retest in 2–4 weeks.",
        "If you notice irritation, burning, or unusual discharge, consider speaking with a clinician."
    ],
    "Normal": [
        "Keep following your usual routine — no changes are needed based on this result.",
        "If you notice new symptoms (odor, itching, unusual discharge), you can retest or talk to a clinician."
    ],
    "Slightly Elevated": [
        "Retest in 3–5 days, ideally at a similar time of day.",
        "If you also have symptoms like odor, itching, or unusual discharge, consider speaking with a clinician."
    ],
    "Elevated": [
        "If you have symptoms (odor, itching, unusual discharge), we recommend speaking with a clinician for proper testing and treatment.",
        "If you feel well, you can retest within 2–3 days to see if your pH returns to your usual range."
    ]
};

// function for getting level recommendations
export const getRecommendations = (level) => recommendationsByLevel[level] || [];
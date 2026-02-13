export const checkBlur = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert image to grayscale using standard luminance formula
    const gray = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }

    // Apply Laplacian operator to estimate sharpness
    // Higher variance indicates sharper image
    let laplacianSum = 0;
    const width = canvas.width;
    const height = canvas.height;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            const laplacian = Math.abs(
                4 * gray[idx] -             // center pixel * 4
                gray[idx - 1] -             // left
                gray[idx + 1] -             // right
                gray[idx - width] -         // top
                gray[idx + width]           // bottom
            );
            laplacianSum += laplacian * laplacian;
        }
    }

    const variance = laplacianSum / ((width - 2) * (height - 2));

    // Threshold for blurriness
    return {
        variance,
        isBlurry: variance < 100,       // below 100 considered blurry
        quality: variance > 200 ? 'excellent' : variance > 100 ? 'good' : 'poor'
    };
};

// Checking for overexposure (Exposure/Glare)
export const checkExposure = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let overexposedPixels = 0;
    let underexposedPixels = 0;
    const totalPixels = canvas.width * canvas.height;

    for (let i = 0; i < data.length; i += 4) {
        // Average RGB to get brightness
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;

        if (brightness > 240) overexposedPixels++;      // very bright pixels
        if (brightness < 20) underexposedPixels++;      // very dark pixels
    }

    const overexposedPercent = (overexposedPixels / totalPixels) * 100;
    const underexposedPercent = (underexposedPixels / totalPixels) * 100;

    return {
        overexposedPercent,
        underexposedPercent,
        hasGlare: overexposedPercent > 10,      // more than 10% pixels too bright
        tooDark: underexposedPercent > 30,      // more than 30% pixels too dark
        quality: overexposedPercent < 5 && underexposedPercent < 20 ? 'good' : 'poor'
    };
};

// Comprehensive quality control
export const checkImageQuality = (canvas) => {
    const blurCheck = checkBlur(canvas);
    const exposureCheck = checkExposure(canvas);

    // Overall quality: image is good only if not blurry, not too dark, and no glare
    const isGoodQuality =
        !blurCheck.isBlurry &&
        !exposureCheck.hasGlare &&
        !exposureCheck.tooDark;

    return {
        isGoodQuality,
        blur: blurCheck,             // detailed blur info
        exposure: exposureCheck,     // detailed exposure info
        overallQuality: isGoodQuality ? 'excellent' : 'poor',
        issues: [
            blurCheck.isBlurry && 'Image is blurry',
            exposureCheck.hasGlare && 'Too much glare detected',
            exposureCheck.tooDark && 'Image is too dark'
        ].filter(Boolean)       // remove false entries
    };
};
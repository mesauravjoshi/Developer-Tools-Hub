export const validateURL = (getURL) => {

    if (getURL.trim().length === 0) {
        console.log(getURL);
        return false
    }

    try {
        new URL(getURL);
        return true;
    } catch (error) {
        return false;
    }
}
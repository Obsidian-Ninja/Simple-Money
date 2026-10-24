export const validateEmail = (email) => {
    if(email.trim()){
        // Validate the email format / syntax
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    return false;
}
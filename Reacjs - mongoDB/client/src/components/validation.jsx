export const validationPatterns = {
    name: {
        pattern: /^[^\d\s][\p{L}'\s-]{4,49}$/u,
        message: 'Name must start with a letter and be between 5 and 50 characters!',
    },
    phoneNumber: {
        pattern: /^(0|\+84)[1-9]\d{8}$/,
        message: 'Phone number must start with 0 or +84, 10 number, must not have letter!',
    },
    email: {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: 'Invalid email format!',
    },
    number: {
        pattern: /^[1-9]\d{3}^$/,
        message: 'Min is 1 and just have number!',
    },
    password: {
        pattern: /^(?=^.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
        message: "Password must have at least 1 uppercase letter, 6 character, at least 1 number!"
    }
};
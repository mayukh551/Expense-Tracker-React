// create a function that check if an email is valid
// and the password length is min 6 and max 50


//******************************* Login FORM **********************************

export const validateEmailAndPassword = (email: string, password: string) => {

    // create an object to store the errors
    const errors: { email?: string; password?: string } = {};

    if (!email)
        errors.email = "Email is required";

    else if (!/\S+@\S+\.\S+/.test(email))
        errors.email = "Your Email Address is Invalid";


    if (!password)
        errors.password = "Password is required";

    else if (password.length < 6 || password.length > 50)
        errors.password = "Password must be between 6 and 50 characters";


    return errors;
};


//******************************* USER DETAILS FORM **********************************


interface UserDetails {
    salary: string;
    monthly_budget: string;
    yearly_budget: string;
    age: string;
    phone: string;
}

interface UserDetailError {
    field: keyof UserDetails;
    message: string;
}

export const validateUserDetails = (userDetails: any) => {

    // convert all string values to number
    var salary = userDetails.salary ? parseInt(userDetails.salary) : 0;
    var yearly_budget = userDetails.yearly_budget ? parseInt(userDetails.yearly_budget) : 0;
    var monthly_budget = userDetails.monthly_budget ? parseInt(userDetails.monthly_budget) : 0;
    var age = userDetails.age ? parseInt(userDetails.age) : 0;
    var phone = userDetails.phone ? parseInt(userDetails.phone) : 0;

    // const errors: UserDetailError[] = [];
    const errors: any = {};

    console.log(salary, yearly_budget, monthly_budget, age, phone);

    if ((salary < 0 || salary > 10000000))
        errors['salary'] = 'Salary Limit : 0 - 10000000';

    else
        errors['salary'] = '';

    if ((monthly_budget < 0 || monthly_budget > 1000000))
        errors['monthly_budget'] = 'Monthly Limit : 0 - 1000000';

    else errors['monthly_budget'] = '';

    if ((yearly_budget < 0 || yearly_budget > 10000000))
        errors['yearly_budget'] = 'Yearly Limit : 0 - 10000000';

    else errors['yearly_budget'] = '';

    if ((age < 18 || age > 120))
        errors['age'] = 'Age has to be 18 - 120';

    else errors['age'] = '';

    if (!/^\d{10}$/.test((phone).toString().trim()))
        errors['phone'] = 'Must be a 10-digit phone number';

    else errors['phone'] = '';

    return errors;
};


//******************************* ADD EXPENSE FORM **********************************

interface Expense {
    title: string;
    amount: number;
    date: Date;
    category: string;
    quantity: number;
}

interface ExpenseError {
    field: keyof Expense;
    message: string;
}

export const validateExpense = (expense: Expense) => {

    const { title, amount, date, category, quantity } = expense;

    const errors: ExpenseError[] = [];

    if (!title || title.length < 3 || title.length > 50)
        errors.push({ field: 'title', message: 'Between between 3 and 50 characters' });

    if (!amount || amount < 0 || amount > 1000000)
        errors.push({ field: 'amount', message: 'Between between 0 and 1000000' });

    // if (!date)
    //     errors.push({ field: 'date', message: 'Between ' });

    if (!category || category.length < 3 || category.length > 50)
        errors.push({ field: 'category', message: 'Between between 3 and 50 characters' });

    if (!quantity || quantity < 0 || quantity > 1000000)
        errors.push({ field: 'quantity', message: 'Between between 0 and 1000000' });

    return errors;
};
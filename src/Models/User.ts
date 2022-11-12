class User {

    _id: string;
    name: string;
    email: string;
    password: string;

    constructor(id: string, name: string, email: string, password: string) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export default User;
export class User {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;

    constructor(
        accessToken: string,
        refreshToken: string,
        id: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        gender: string,
        image: string
    ) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.image = image;
    }
}

export class User {
    
    constructor(
        public name: string,
        public username: string,
        public email: string,
        // public password: string,
        // public uid: string, // como não precisamos conhecer a senha do usuário, substituimos a senha pelo ID
        public photo: string,
        public $key: string
    ) {};

}
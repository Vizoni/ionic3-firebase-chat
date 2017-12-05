export class User {
    
    public $key: string; // como o firebase utiliza ele automaticamente, não precisa por ele no construtor

    constructor(
        public name: string,
        public username: string,
        public email: string,
        // public password: string,
        // public uid: string, // como não precisamos conhecer a senha do usuário, substituimos a senha pelo ID
        public photo: string,
    ) {};

}
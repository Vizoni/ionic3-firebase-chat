export class Chat {
    
    public $key: string;
    // não passa no construtor pq esse $key é gerado automaticamente no firebase e ia dar conflito na hora de criar o chat

    constructor(
        public lastMessage: string,
        public timeStamp: any,
        public title: string,
        public photo: string,
    ) {}

}
export class Message {
    
    public $key: string; // como o firebase utiliza ele automaticamente, não precisa por ele no construtor
    
    constructor(
        public userId: string,
        public text: string,
        public timeStamp: any,
        public read: boolean
    ) {}
}
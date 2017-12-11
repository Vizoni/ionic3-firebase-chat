import { FormControl } from '@angular/forms';

export class emailValidator {

    static checkEmail(control: FormControl): any {

        return new Promise(resolve => {

            // Simula uma resposta demorada do servidor
            
            setTimeout(() => {
                if (control.value.toLowerCase() === "ravizoni@gmail.com") {
                    // se o username for igual a greg
                    resolve({
                        "username taken": true
                    });

                } else {
                    resolve(null);
                }
            }, 1000);

        });
    }

}
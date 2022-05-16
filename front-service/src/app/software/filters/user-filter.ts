import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../models/user";

@Pipe({
    name:'userFilter' // Nom du filtre qui est dans le component html
})
export class ListUserFilterPipe implements PipeTransform
{
    // Définit les valeurs à filtrer
    transform(users: User[], searchTerm: string): User[]
    {
        if(!users || !searchTerm)
        {
            // Retourne tous les Users si rien est écrit dans l'input
            return users;
        }
        
        /**
         * Retourne tous les utilisateurs ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return users.filter(user => 
            user.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
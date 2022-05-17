import { Pipe, PipeTransform } from "@angular/core";
import { Client } from "../models/client";

@Pipe({
    name:'clientFilter' // Nom du filtre qui est dans le component html
})
export class ListClientFilterPipe implements PipeTransform
{
    // Définit les valeurs à filtrer
    transform(clients: Client[], searchTerm: string): Client[]
    {
        if(!clients || !searchTerm)
        {
            // Retourne tous les Clients si rien est écrit dans l'input
            return clients;
        }
        
        /**
         * Retourne tous les Clients ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return clients.filter(client => 
            client.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
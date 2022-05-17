import { Pipe, PipeTransform } from "@angular/core";
import { Quote } from "../models/quote";

@Pipe({
    name:'quoteFilter' // Nom du filtre qui est dans le component html
})
export class ListQuoteFilterPipe implements PipeTransform
{
    // Définit les valeurs à filtrer
    transform(quotes: Quote[], searchTerm: string): Quote[]
    {
        if(!quotes || !searchTerm)
        {
            // Retourne tous les Quotes si rien est écrit dans l'input
            return quotes;
        }
        
        /**
         * Retourne tous les Quotes ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return quotes.filter(quote => 
            quote.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
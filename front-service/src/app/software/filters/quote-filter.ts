import { Pipe, PipeTransform } from "@angular/core";
import { Quote } from "../models/quote";


@Pipe({
    name:'quoteFilter' //nom du filtre qui est dans le component html
})
export class ListQuoteFilterPipe implements PipeTransform
{
    // definit les valeurs à filtrer
    transform(quotes: Quote[], searchTerm: string): Quote[]
    {
        if(!quotes || !searchTerm)
        {
            //retourne tous les Quotes si rien marqué dans l'input
            return quotes;
        }
        
        /**
         * retourne tous les projets ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return quotes.filter(quote => 
            quote.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
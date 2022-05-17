import { Pipe, PipeTransform } from "@angular/core";
import { Template } from "../models/template";

@Pipe({
    name:'templateFilter' // Nom du filtre qui est dans le component html
})
export class ListTemplateFilterPipe implements PipeTransform
{
    // Définit les valeurs à filtrer
    transform(templates: Template[], searchTerm: string): Template[]
    {
        if(!templates || !searchTerm)
        {
            // Retourne tous les Templates si rien est écrit dans l'input
            return templates;
        }
        
        /**
         * Retourne tous les Templates ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return templates.filter(template => 
            template.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
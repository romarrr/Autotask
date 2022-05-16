import { Pipe, PipeTransform } from "@angular/core";
import { Template } from "../models/template";

@Pipe({
    name:'templateFilter' //nom du filtre qui est dans le component html
})
export class ListTemplateFilterPipe implements PipeTransform
{
    // definit les valeurs à filtrer
    transform(templates: Template[], searchTerm: string): Template[]
    {
        if(!templates || !searchTerm)
        {
            //retourne tous les Templates si rien marqué dans l'input
            return templates;
        }
        
        /**
         * retourne tous les Templates ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return templates.filter(template => 
            template.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
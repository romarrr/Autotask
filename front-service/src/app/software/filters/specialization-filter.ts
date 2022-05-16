import { Pipe, PipeTransform } from "@angular/core";
import { Specialization } from "../models/specialization";

@Pipe({
    name:'specializationFilter' //nom du filtre qui est dans le component html
})
export class ListSpecializationFilterPipe implements PipeTransform
{
    // definit les valeurs à filtrer
    transform(specializations: Specialization[], searchTerm: string): Specialization[]
    {
        if(!specializations || !searchTerm)
        {
            //retourne tous les Specializations si rien marqué dans l'input
            return specializations;
        }
        
        /**
         * retourne tous les Specializations ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return specializations.filter(specialization => 
            specialization.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../models/project";

@Pipe({
    name:'projectFilter' //nom du filtre qui est dans le component html
})
export class ListProjectFilterPipe implements PipeTransform
{
    // definit les valeurs à filtrer
    transform(projects: Project[], searchTerm: string): Project[]
    {
        if(!projects || !searchTerm)
        {
            //retourne tous les Projects si rien marqué dans l'input
            return projects;
        }
        
        /**
         * retourne tous les projets ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return projects.filter(project => 
            project.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../models/project";

@Pipe({
    name:'projectFilter' // Nom du filtre qui est dans le component html
})
export class ListProjectFilterPipe implements PipeTransform
{
    // Définit les valeurs à filtrer
    transform(projects: Project[], searchTerm: string): Project[]
    {
        if(!projects || !searchTerm)
        {
            // Retourne tous les Projects si rien est écrit dans l'input
            return projects;
        }
        
        /**
         * Retourne tous les Projects ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return projects.filter(project => 
            project.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
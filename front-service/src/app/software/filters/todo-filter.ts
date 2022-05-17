import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../models/todo";

@Pipe({
    name:'todoFilter' // Nom du filtre qui est dans le component html
})
export class ListTodoFilterPipe implements PipeTransform
{
    // Définit les valeurs à filtrer
    transform(todos: Todo[], searchTerm: string): Todo[]
    {
        if(!todos || !searchTerm)
        {
            // Retourne tous les Todos si rien est écrit dans l'input
            return todos;
        }
        
        /**
         * Retourne tous les Todos ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return todos.filter(todo => 
            todo.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
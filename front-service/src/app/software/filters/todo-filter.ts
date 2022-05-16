import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../models/todo";

@Pipe({
    name:'todoFilter' //nom du filtre qui est dans le component html
})
export class ListTodoFilterPipe implements PipeTransform
{
    // definit les valeurs à filtrer
    transform(todos: Todo[], searchTerm: string): Todo[]
    {
        if(!todos || !searchTerm)
        {
            //retourne tous les Todos si rien marqué dans l'input
            return todos;
        }
        
        /**
         * retourne tous les Todos ayant des caractères
         * identiques à ceux dans l'input, lettres comparées en minuscule et
         * à chaques lettres rentrées
         */
        return todos.filter(todo => 
            todo.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
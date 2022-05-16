import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class paginationFr extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Lignes par page';
  override nextPageLabel = 'Page suivante';
  override previousPageLabel = 'Page précédente';
  override firstPageLabel = 'La première page';
  override lastPageLabel = 'Dernière page';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 sur ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // Si l'index de début dépasse la longueur de la liste, n'essayez pas de fixer l'index de fin à la fin.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' sur ' + length;
  };

}
import { Pipe, PipeTransform } from '@angular/core';
import { min } from 'moment';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], ...args: string[]): any[] {
    if (!items) {
      return items;
    }

    if (!args.length || !args[0]) {
      return items;
    }
    
    const filterText: string = args[0].toLowerCase();
    
    return items.filter(it => {
      let item: any = null;
      //Filter items accordingly
      //if there is username poperty - then apply to users, else apply to events
      //search names/usernames/address
      if (it.username) {
        if (it.name.toLocaleLowerCase().includes(filterText) || it.username.toLocaleLowerCase().includes(filterText))
        item = it;
      } else {
        if (it.name.toLocaleLowerCase().includes(filterText) || it.address.toLocaleLowerCase().includes(filterText))
        item = it;
      }
      return item;
    });
  }
}

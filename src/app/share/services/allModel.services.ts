import {Injectable} from '@angular/core';
import {BaseRepository} from './base.repository';

@Injectable({
  providedIn: 'root'
})
export class AllModelServices {
  constructor(protected baseRepository: BaseRepository<any>) {
  }

  arr = () => {
    return new Promise((resolve, reject) => {
      this.baseRepository.getAllModel().subscribe(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
}

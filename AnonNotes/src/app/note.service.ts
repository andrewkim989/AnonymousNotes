import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _http: HttpClient) { }

  getAllNotes () {
    return this._http.get("/notes");
  }

  addNote(newnote) {
    return this._http.post("/notes", newnote);
  }
}

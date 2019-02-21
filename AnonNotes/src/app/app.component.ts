import { Component } from '@angular/core';
import { NoteService } from "./note.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AnonNotes';

  notes: any;
  data: any;
  newNote: any;
  error: boolean = false;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.newNote = {note: ""};
    this.getNotes();
  }

  getNotes() {
    let t = this.noteService.getAllNotes();
    t.subscribe(data => {
      this.notes = data;
    });
  }

  createNote() {
    let n = this.noteService.addNote({note: this.newNote.note});
    n.subscribe(data => {
      this.data = data;
      if (this.data.error) {
        this.error = true;
        this.data = this.data.error[0];
        this.newNote = {note: ""};
      }
      else {
        this.error = false;
        this.data = "";
        this.newNote = {note: ""};
      }
    });
    this.getNotes();
  }
}

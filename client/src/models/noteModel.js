export class Note{
    constructor({id, title, noteText, noteColor}={}){
        this.id = id;
        this.title = title;
        this.noteText = noteText;
        this.noteColor = noteColor;
    }
}

export default {Note};
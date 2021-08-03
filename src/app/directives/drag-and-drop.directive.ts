import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragAndDropDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  // dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  // dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  // drop listener
  @HostListener('drop', ['$event']) public ondrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
      console.log('você arrastou ' + files.length + ' files.');
    }
  }
}

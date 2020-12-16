import { DragDropUploadDirective } from "./drap-drop-upload.directive";
import { NoWhitespaceDirective } from './no-white-space.directive';
import { MustMatchDirective } from './must-match.directive';
import { UpcValidateDirective } from './upc.directive';
import { ImageNoAvailableDirective } from './image-no-available.directive';

export const SHARED_DIRECTIVES = [
  DragDropUploadDirective,
  NoWhitespaceDirective,
  UpcValidateDirective,
  MustMatchDirective,
  ImageNoAvailableDirective,
];

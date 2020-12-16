

import { IncludesPipe } from './array.pipe';
import { SafePipe } from './safe.pipe';
import { ValuesPipe, ToArrayPipe, SearchPipe } from './object.pipe';
import { MoneyPipe, PhonePipe, NumberFormatPipe } from './number.pipe';
import { FullDateTimePipe, ShortDateTimePipe } from './datetime.pipe';

export const SHARED_PIPES = [
  IncludesPipe,
  ValuesPipe, ToArrayPipe, SearchPipe,
  MoneyPipe, PhonePipe, NumberFormatPipe,
  FullDateTimePipe, ShortDateTimePipe,
  SafePipe,
];

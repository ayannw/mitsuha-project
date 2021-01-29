import {
	red,
    green,
    yellow,
    blue,
    magenta 
} from 'colorette';
import { info } from '@ayanthedev/colorlogs';

const str: string = green('┌──────')
    + blue('─────────')
    + yellow('─────────┐\n')

    + blue('│   ┏┳')
    + red('┓╻╺┳╸┏━┓')
    + green('╻ ╻╻ ╻')
    + magenta('┏━┓  │\n')

    + green('│   ┃┃┃')
    + blue('┃ ┃ ┗━┓┃ ┃')
    + red('┣━┫┣━┫  │\n')

    + magenta('│   ╹')
    + blue('╹╹╹ ')
    + green('╹ ┗━┛┗━┛╹')
    + yellow(' ╹╹ ╹  │\n')

    + yellow('└────')
    + blue('──────────────')
    + red('──────┘');

export function draw(): void {
	str.split('\n').forEach((line) => { info(line) });
};

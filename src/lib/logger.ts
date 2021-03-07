import * as c from 'colorette';
import dayjs from 'dayjs';

const logTypes = {
    info: c.blue(' INFO     '),
    success: c.green(' SUCCESS  '),
    warn: c.yellow(' WARNING  '),
    error: c.red(' ERROR    '),
};

const format = (text: string, logType: string, _color?: string): void => {
    const time = dayjs().format('HH:mm:ss:SSS');
    const color = _color || 'white';
    const out = eval('c.dim(time) + c.bold(logTypes.' + logType + ') + text');

    return console.log(out);
};

export const info = (text: string) => {
    return format(text, 'info');
};
export const success = (text: string) => {
    return format(text, 'success');
};
export const warn = (text: string) => {
    return format(text, 'warn');
};
export const error = (text: string) => {
    return format(text, 'error');
};

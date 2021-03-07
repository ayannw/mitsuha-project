export const twemojify = (text: string) => {
    return ':regional_indicator_' + text.split('')[0] + ':';
};

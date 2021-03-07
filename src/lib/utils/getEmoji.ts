export const getEmoji = (text: string) => {
    const res = text.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/);

    if (res == null) return false;
    return {
        name: res[2],
        id: res[3],
    };
};

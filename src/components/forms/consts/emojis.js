// export const POPULAR_EMOJIS = [
//     128512,
//     128513,
//     128514,
//     128515,
//     128518,
//     128525,
//     128536,
//     128545,
//     128561,
//     128549,
//     128557,
//     129324
// ]

export const OriginalSmileys = () => {
    let emoji = 128511
    const emojis = []
    for (let countFrom = 12; countFrom < 67; countFrom ++) {
       emojis.push(emoji += 1)
    }
    return emojis
} 


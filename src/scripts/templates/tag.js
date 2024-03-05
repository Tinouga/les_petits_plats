export function tagTemplate(tag) {

    function getTagDOM(type, onClickCb) {
        const li = Object.assign(document.createElement('li'), {
        });
        const button = Object.assign(document.createElement('button'), {
            type: 'button',
            textContent: tag,
            className: 'h-full w-full px-4 py-[0.563rem] text-start hover:bg-primary',
            onclick: function() {
                onClickCb(tag, type);
            }
        });
        li.appendChild(button);

        return li;
    }

    function getSelectedTagDOM() {
        const li = Object.assign(document.createElement('li'), {
            className: 'flex justify-between items-center px-4 py-[0.563rem] bg-primary group'
        });
        const span = Object.assign(document.createElement('span'), {
            textContent: tag,
            className: 'group-hover:font-bold'
        });
        const button = Object.assign(document.createElement('button'), {
            type: 'button',
            className: 'opacity-0 group-hover:opacity-100 focus:opacity-100 transition duration-150',
            ariaLabel: `Supprimer le filtre ${tag}`,
            innerHTML: `
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="8.5" fill="black"/>
                    <path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                `
        });
        li.append(span, button);

        return li;
    }

    function getChipTagDOM() {

    }

    return { getTagDOM, getSelectedTagDOM, getChipTagDOM };
}
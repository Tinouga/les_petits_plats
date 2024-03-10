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

    function getSelectedTagDOM(type, onClickCb) {
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
                `,
            onclick: function() {
                onClickCb(tag, type);
            }
        });
        li.append(span, button);

        return li;
    }

    function getChipTagDOM(type, onClickCb) {
        const li = Object.assign(document.createElement('li'), {
            className: 'flex justify-between items-center gap-[3.75rem] px-[1.125rem] py-[1.063rem] rounded-[0.625rem] bg-primary'
        });
        const span = Object.assign(document.createElement('span'), {
            textContent: tag,
        });
        const button = Object.assign(document.createElement('button'), {
            type: 'button',
            ariaLabel: `Supprimer le filtre ${tag}`,
            innerHTML: `
                <svg width="0.625rem" height="0.625rem" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                `,
            onclick: function() {
                onClickCb(tag, type);
            }
        });
        li.append(span, button);

        return li;
    }

    return { getTagDOM, getSelectedTagDOM, getChipTagDOM };
}
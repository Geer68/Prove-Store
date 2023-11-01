import { EVENTS } from '../../api/configs';
import { MouseEvent} from 'react';
function navigate(href: string) {
    window.history.pushState({}, '', href);
    const navigationEvent = new Event(EVENTS.pushtate);
    window.dispatchEvent(navigationEvent)
}
interface LinkProps {
    to: string;
    target?: string;
    [key: string]: any;
}
export function Link({target, to, ...props}: LinkProps){
    const handleClick = (event: MouseEvent) => {
        const isMainEvent = event.button === 0
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'
        
        if(isMainEvent && !isModifiedEvent && isManageableEvent){
            event.preventDefault()
            navigate(to)
        }
    }
    return <a className='max-w-auto' onClick={handleClick} href={to} target={target} {...props}/>
}
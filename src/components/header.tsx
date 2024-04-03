import nlwUniqueIcon from '../assets/nlw-unite-icon.svg';
import { NavLink } from './nav-link';

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">
            <img src={nlwUniqueIcon} alt="" />

            <nav className="flex items-center gap-5">
                <NavLink href="#">
                    <p>Eventos</p>
                </NavLink>
                <NavLink href="#">
                    <p>Participações</p>
                </NavLink>
            </nav>
        </div>
    )
}
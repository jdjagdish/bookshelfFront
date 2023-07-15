import {  useContext } from 'react'

import SectionContext from '../helpers/sectionContext'


function SidebarItem(props) {
  const { setSection} = useContext(SectionContext)
  
  const handleSettingSection = (e) =>{
     setSection(e.target.closest('li').getAttribute('section'));
      
    }
  return (
    <li id={props.id} section={props.name} className="mr-3 flex-1">
      <button section={props.name} onClick={handleSettingSection } className={props.current? "block py-1 md:py-3 pl-1 align-middle text-gray-800 border-pink-500 hover:text-pink-500 border-b-2 hover:border-pink-500":"block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500"}>
        <i className="fas fa-link pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">{props.name}</span>
      </button>
    </li>

  );
}

export default SidebarItem;

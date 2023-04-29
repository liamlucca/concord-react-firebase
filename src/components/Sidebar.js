import React from 'react';
import PropTypes from 'prop-types';
import { FaBeer } from 'react-icons/fa';


// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Sidebar = () => {
    return (
    <div className='fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-primary text-secondary shadow-lg'>
        <SideBarIcon icon={<FaBeer />} />
    </div>
    );
}
Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
// #endregion

const SideBarIcon = ({icon, text = 'tooltip'}) => (
    <div className='sidebar-icon group'>
        {icon}

        <span class="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default Sidebar;
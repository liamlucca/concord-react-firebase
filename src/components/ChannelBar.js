import { useState } from 'react';
import { BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';

const topics = ['tailwind-css', 'react'];
const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
const random = ['variants', 'plugins'];

const ChannelBar = () => {
  return (
    <div className='channel-bar shadow-lg h-screen overflow-auto'>
      <div className='channel-container'>
        <ChannelBlock />
        <Dropdown header='Topics' selections={topics} />
        <Dropdown header='Questions' selections={questions} />
        <Dropdown header='Random' selections={random} />
      </div>
      <UserBlock />
    </div>
  );
};

const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' />
      </div>
      {expanded &&
        selections &&
        selections.map((selection) => <TopicSelection selection={selection} />)}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

const TopicSelection = ({ selection }) => (
  <div className='dropdown-selection'>
    <BsHash size='24' className='text-gray-400' />
    <h5 className='dropdown-selection-text'>{selection}</h5>
  </div>
);

const ChannelBlock = () => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>Channels</h5>
  </div>
);

const UserBlock = () => (
  <div className='user-block'>
  <div className="avatar online">
    <div className="w-24 rounded-full">
      <img src="https://preview.redd.it/ogiglyr165p91.png?auto=webp&s=10efe64832620088452adccd502fc04b3eaac3e4" />
    </div>
  </div>

  <h5 className='channel-block-text'>User</h5>

  </div>
);

export default ChannelBar;

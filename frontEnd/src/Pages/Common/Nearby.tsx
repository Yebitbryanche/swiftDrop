import Profile from '../../assets/icons/user-rounded-svgrepo-com.svg?react'
import SearchIcon from '../../assets/icons/search-normal-svgrepo-com.svg?react'
import AgentCard from '../../Components/UI/Cards/AgentCard';
import { HiMapPin } from 'react-icons/hi2';

const Nearby = () => {
  return (
    <div className='p-3'>
      <div className='flex flex-row gap-x-2 items-center pb-5'>
          <h2 className='font-medium md:text-2xl sm:text-xl text-lg'>
              Near You
          </h2>
          <div className='p-2 rounded-full bg-green-100'>
              <HiMapPin size={25} color="#21b723"/>
          </div>
    </div>
      {/** search container */}
      <div className='flex w-full flex-row justify-center gap-x-5 items-center'>
        <div className='shadow-sm inset-sm rounded-full cursor-pointer'>
          <Profile className='md:w-[50px] md:h-[50px] w-[40px] h-[40px]'/>
        </div>
        <div className='w-[80%] relative'>
          <input 
            className='rounded-full w-full md:h-12 h-10 text-sm md:text-md shadow-sm inset-sm focus:outline-yellow-500 px-3'
            placeholder='Search'
            color=''/>
          <SearchIcon className='md:w-[45px] md:h-[45px] w-[40px] h-[40px] absolute right-1 top-0'/>
        </div>
      </div>

      {/** content */}
      {
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-10'>
          <AgentCard/>
          <AgentCard/>
          <AgentCard/>
          <AgentCard/>
          <AgentCard/>
          <AgentCard/>
        </div>
      }
    </div>
  );
}

export default Nearby;

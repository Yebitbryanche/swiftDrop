import Profile from '../../assets/icons/user-rounded-svgrepo-com.svg?react'
import SearchIcon from '../../assets/icons/search-normal-svgrepo-com.svg?react'
import AgentCard from '../../Components/UI/Cards/AgentCard';
import { HiSearch } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import type { AgentType } from '../../types/userTypes';
import apiClient from '../../apiClient';
import Pagination from '../../Components/Design/pagination';
import Loader from '../../Components/UI/loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const [agents, setAgents] = useState<AgentType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
 // const {agent_id} = useParams()
  const navigate = useNavigate()

const placeOrder = async(agent_id:string) => {
  
  navigate(`/create_delivery/${agent_id}`)
}

const fetchAgents = async (pageNumber: number) => {
  try {
    setLoading(true);

    const skip = (pageNumber - 1) * limit;

    const res = await apiClient.get(
      `/agents?skip=${skip}&limit=${limit}`
    );

    setAgents(res.data.data);
    setTotal(res.data.total);

    console.log(res.data.data)

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAgents(page);
}, [page]);

const totalPages = Math.ceil(total / limit);

  return (
    <div className='p-3 mb-15 xs:mb-none'>
        <div className='flex flex-row gap-x-2 items-center pb-5'>
            <h2 className='font-medium md:text-2xl sm:text-xl text-lg'>
                Discover
            </h2>
            <div className='p-2 rounded-full bg-green-100'>
                <HiSearch size={25} color="#21b723"/>
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
          {agents.map((item) => (

            <AgentCard
              key={item.agent.id}
              name={item.agent.user_name}
              isActive={item.agent.status}
              deliveryTime={item.agent.working_hours}
              vehicle={item.agent.vehicle}
              rating={item.agent.rating}
              location={item.agent.office_location}
              onOrder={() => placeOrder(item.agent.id)}
              />
          ))}
        </div>
      }
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      {loading && <Loader/>}
    </div>
  );
}

export default Home;

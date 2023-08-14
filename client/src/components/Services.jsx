import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className='flex flex-row justify-start items-center purple-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl' style={{ width: '600px' }}>
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className='ml-5 flex flex-col flex-1'>
            <h2 className='mt-2 text-white text-lg font-bold'>{title}</h2>
            <p className='mt-2 text-white text-sm md:w-9/12'>{subtitle}</p>
        </div>
    </div>
)
const Services = () => {
    return (
        <div className='flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
                <div className='flex-1 flex flex-col justify-start items-start'>
                    <h1 className='text-white text 3xl sm:text-5xl py-2 text-gradient'>Our Services Are Designed
                    <br/>
                     With You In Mind
                    </h1>
                </div>

            </div>
            <div className='flex-1 flex flex-col justify-start items-center'>
                <ServiceCard
                color="bg-[#2952e3]"
                title="Security Guaranteed"
                icon={<BsShieldFillCheck fontSize={(21)} className="text-white" />}
                subtitle="Multi-FA, BitLicense Compliance and Self-custody to enhance the safety of your assets."
                />

                <ServiceCard
                color="bg-[#8945f8]"
                title="Find All You Favorite Coins"
                icon={<BiSearchAlt fontSize={(21)} className="text-white" />}
                subtitle="We have over 1000 cryptocurrencies for you to explore."
                />

                <ServiceCard
                color="bg-[#f84550]"
                title="Zero Platform Fees"
                icon={<RiHeart2Fill fontSize={(21)} className="text-white" />}
                subtitle="Pay only the gas fees required for your transactions, and nothing more."
                />
            </div>
        </div>
    );
}

export default Services;
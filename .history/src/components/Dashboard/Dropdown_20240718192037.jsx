import React, {useState} from 'react'

const options = [
    { value: 'ikeja-electric', label: 'IKEDC - Ikeja Electric', img: '../../assets/ikedc.png' },
    { value: 'eko-electric', label: 'EKEDC - Eko Electric', img: '../../assets/ekedc.png' },
    { value: 'kano-electric', label: 'KEDCO - Kano Electric', img: '../../assets/kedco.png' },
    { value: 'portharcourt-electric', label: 'PHEN - Port Harcourt Electric', img: '../../assets/phedc.png' },
    { value: 'jos-electric', label: 'JED - Jos Electric', img: '../../assets/jed.png' },
    { value: 'ibadan-electric', label: 'IBEDC - Ibadan Electric', img: '../../assets/ibedc.png' },
    { value: 'kaduna-electric', label: 'KAEDCO - Kaduna Electric', img: '../../assets/kaedco.png' },
    { value: 'abuja-electric', label: 'AEDC - Abuja Electric', img: '../../assets/aedc.png' },
    { value: 'enugu-electric', label: 'EEDC - Enugu Electric', img: '../../assets/eedc.png' },
    { value: 'benin-electric', label: 'BEDC - Benin Electric', img: '../../assets/bedc.png' },
    { value: 'aba-electric', label: 'ABA - Aba Electric', img: '../../assets/apl.png' },
    { value: 'yola-electric', label: 'YEDC - Yola Electric', img: '../../assets/yedc.png' },
  ];

const Dropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
      onChange(option.value);
      setIsOpen(false);
    };
  
    const selectedOption = options.find(option => option.value === value);
  
    return (
      <div className="relative w-[350px] mt-2">
        <div className="border-2 rounded-xl py-2 pl-5 pr-3 focus:outline-none hover:border-[#7B0323]" onClick={handleToggle} style={{ fontSize: '1rem', height: '70px' }}>
          {selectedOption ? (
            <div className="flex items-center">
              <img src={selectedOption.img} alt={selectedOption.label} className="logo-image w-8 h-8 mr-2" />
              {selectedOption.label}
            </div>
          ) : (
            <span>-- Please Select one --</span>
          )}
        </div>
        {isOpen && (
          <div className="absolute w-full border-2 rounded-xl mt-1 bg-white">
            {options.map(option => (
              <div key={option.value} className="flex items-center py-2 pl-5 pr-3 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionClick(option)}>
                <img src={option.img} alt={option.label} className="logo-image w-8 h-8 mr-2" />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };


export default Dropdown
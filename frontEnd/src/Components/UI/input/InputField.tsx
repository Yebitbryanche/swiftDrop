interface InputProps{
    value?:string
    onChange:(text:string) => void
    placeholder:string
    label?:string
    type:string
}

const InputField = ({value,onChange,type,placeholder,label}:InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input
      type={type} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder} 
      className="w-full p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
/>
    </div>
  )
}

export default InputField

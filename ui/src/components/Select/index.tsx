import { ISelectProps } from "./interfaces"

export default (data : ISelectProps) => {

    return (
        <>  
            <label htmlFor={data.name}>{data.label}</label>
            <select name={data.name} id={data.id}>
                {
                    !data.hasDefault ? 
                        <option value="" selected disabled>{data.label ?? "Select an value"}</option> 
                        : ""
                }
                {
                    data.data.map((item, index) => {
                        return (
                            <>
                                <option 
                                    value={item.value} 
                                    disabled={item.disabled} 
                                    selected={item.selected}
                                >
                                    {item.key}
                                </option>
                            </>
                        )
                    })
                }
            </select>
        </>
    )
}